import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { items = [], email, paymentMethod = "stripe" } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const total = items.reduce((sum, i) => sum + (Number(i.price) || 0) * (i.quantity || 1), 0);
    if (total <= 0) {
      return NextResponse.json({ error: "Invalid total" }, { status: 400 });
    }

    const orderResult = await query(
      `INSERT INTO orders (email, total, status, payment_provider) VALUES (?, ?, 'pending', ?) RETURNING id`,
      [email, total, paymentMethod === "paypal" ? "paypal" : "stripe"]
    );
    const orderId = orderResult?.[0]?.id;

    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, design_id, price, quantity) VALUES (?, ?, ?, ?)`,
        [orderId, item.design_id, Number(item.price) || 0, item.quantity || 1]
      );
    }

    if (paymentMethod === "paypal") {
      const paypalAuth = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID || ""}:${process.env.PAYPAL_CLIENT_SECRET || ""}`
          ).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
      }).then((r) => r.json());

      const accessToken = paypalAuth.access_token;
      if (!accessToken) {
        await query("UPDATE orders SET status = 'failed' WHERE id = ?", [orderId]);
        return NextResponse.json({ error: "PayPal auth failed" }, { status: 500 });
      }

      const paypalBase = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";
      const paypalOrder = await fetch(`${paypalBase}/v2/checkout/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: { currency_code: "USD", value: total.toFixed(2) },
              reference_id: String(orderId),
              description: `Design Library order #${orderId}`,
            },
          ],
          application_context: {
            return_url: `${request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/design-library/orders/${orderId}?paid=1`,
            cancel_url: `${request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/design-library/checkout`,
          },
        }),
      }).then((r) => r.json());

      const paypalId = paypalOrder.id;
      const approveUrl = paypalOrder.links?.find((l) => l.rel === "approve")?.href;
      if (!paypalId || !approveUrl) {
        await query("UPDATE orders SET status = 'failed' WHERE id = ?", [orderId]);
        return NextResponse.json({ error: "PayPal order creation failed" }, { status: 500 });
      }

      await query("UPDATE orders SET external_id = ? WHERE id = ?", [paypalId, orderId]);

      return NextResponse.json({
        orderId,
        paymentMethod: "paypal",
        paypalOrderId: paypalId,
        approveUrl,
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.headers.get("origin") || "http://localhost:3000";
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Design Library",
              description: `Order #${orderId} – ${items.length} design(s)`,
              images: [],
            },
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/design-library/orders/${orderId}?paid=1`,
      cancel_url: `${baseUrl}/design-library/checkout`,
      customer_email: email,
      metadata: { orderId: String(orderId) },
    });

    await query("UPDATE orders SET external_id = ? WHERE id = ?", [session.id, orderId]);

    return NextResponse.json({
      orderId,
      paymentMethod: "stripe",
      checkoutUrl: session.url,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: err.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
