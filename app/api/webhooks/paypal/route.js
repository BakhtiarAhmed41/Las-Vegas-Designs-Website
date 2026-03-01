import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const body = await request.json();
    const eventType = body.event_type;
    const resource = body.resource || body.resource_type ? body : null;

    if (eventType === "PAYMENT.CAPTURE.COMPLETED" || eventType === "CHECKOUT.ORDER.APPROVED") {
      const id = resource?.id || body.id;
      const supplementary = resource?.supplementary_data?.related_ids?.order_id;
      const orderIdFromRef = resource?.purchase_units?.[0]?.reference_id;
      let orderId = orderIdFromRef || supplementary;

      if (!orderId && id) {
        const rows = await query("SELECT id FROM orders WHERE external_id = ? AND status = 'pending' LIMIT 1", [id]);
        if (rows?.[0]) orderId = rows[0].id;
      }

      if (orderId) {
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
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("PayPal webhook error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
