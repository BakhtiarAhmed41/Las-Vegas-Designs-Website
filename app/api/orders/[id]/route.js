import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Order ID required" }, { status: 400 });

    const orderRows = await query(
      "SELECT id, email, total, status, payment_provider, created_at FROM orders WHERE id = ?",
      [id]
    );
    const order = orderRows?.[0];
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const itemRows = await query(
      `SELECT oi.design_id, oi.price, d.title AS design_title
       FROM order_items oi
       LEFT JOIN designs d ON d.id = oi.design_id
       WHERE oi.order_id = ?`,
      [id]
    );

    const downloadRows = await query(
      `SELECT od.token, od.design_id, d.title AS design_title
       FROM order_downloads od
       LEFT JOIN designs d ON d.id = od.design_id
       WHERE od.order_id = ? AND od.expires_at > NOW()`,
      [id]
    );

    return NextResponse.json({
      order: {
        id: order.id,
        email: order.email,
        total: order.total,
        status: order.status,
        payment_provider: order.payment_provider,
        created_at: order.created_at,
      },
      items: itemRows || [],
      downloads: (downloadRows || []).map((r) => ({ token: r.token, design_id: r.design_id, design_title: r.design_title })),
    });
  } catch (err) {
    console.error("GET /api/orders/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
