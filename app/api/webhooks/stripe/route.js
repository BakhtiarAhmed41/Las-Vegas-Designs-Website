import { NextResponse } from "next/server";
import Stripe from "stripe";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;
    if (!orderId) return NextResponse.json({ received: true });

    await query("UPDATE orders SET status = 'paid' WHERE id = ?", [orderId]);
    const items = await query("SELECT design_id FROM order_items WHERE order_id = ?", [orderId]);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    for (const row of items || []) {
      const token = uuidv4().replace(/-/g, "");
      await query(
        "INSERT INTO order_downloads (order_id, design_id, token, expires_at) VALUES (?, ?, ?, ?)",
        [orderId, row.design_id, token, expiresAt]
      );
    }
  }

  return NextResponse.json({ received: true });
}
