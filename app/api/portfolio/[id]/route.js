import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const rows = await query("SELECT * FROM portfolio_items WHERE id = ?", [id]);
    if (!rows?.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const item = rows[0];
    item.tags = Array.isArray(item.tags) ? item.tags : typeof item.tags === "string" ? JSON.parse(item.tags) : [];
    return NextResponse.json(item);
  } catch (err) {
    console.error("GET /api/portfolio/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, category, category_id, description, customer_file_url, final_result_url, tags, overview, service, used_for, formats, project_type, sort_order, status } = body;

    const tagsJson = JSON.stringify(Array.isArray(tags) ? tags : []);

    const rows = await query(
      `UPDATE portfolio_items SET
        title = ?, category = ?, category_id = ?, description = ?,
        customer_file_url = ?, final_result_url = ?, tags = ?::jsonb,
        overview = ?, service = ?, used_for = ?, formats = ?,
        project_type = ?, sort_order = ?, status = ?
       WHERE id = ? RETURNING *`,
      [
        title?.trim() || "",
        category?.trim() || "",
        (category_id || "").trim(),
        description || "",
        customer_file_url || "",
        final_result_url || "",
        tagsJson,
        overview || "",
        service || "",
        used_for || "",
        formats || "",
        project_type || "",
        Number(sort_order) || 0,
        status || "published",
        id,
      ]
    );

    if (!rows?.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, item: rows[0] });
  } catch (err) {
    console.error("PUT /api/portfolio/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await query("DELETE FROM portfolio_items WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/portfolio/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
