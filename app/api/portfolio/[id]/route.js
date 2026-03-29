import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import {
  labelsFromCategoryIds,
  normalizeCategoryIds,
} from "@/lib/portfolioCategories";

function mapRow(r) {
  const tags = Array.isArray(r.tags)
    ? r.tags
    : typeof r.tags === "string"
      ? JSON.parse(r.tags)
      : [];
  const category_ids = normalizeCategoryIds(r.category_ids);
  return {
    ...r,
    tags,
    category_ids,
    category:
      category_ids.length > 0
        ? labelsFromCategoryIds(category_ids)
        : r.category || "",
  };
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const rows = await query("SELECT * FROM portfolio_items WHERE id = ?", [id]);
    if (!rows?.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(mapRow(rows[0]));
  } catch (err) {
    console.error("GET /api/portfolio/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      category_ids: rawIds,
      description,
      customer_file_url,
      final_result_url,
      tags,
      overview,
      service,
      used_for,
      formats,
      project_type,
      sort_order,
      status,
    } = body;

    const category_ids = normalizeCategoryIds(rawIds);
    if (!category_ids.length) {
      return NextResponse.json(
        { error: "At least one category is required" },
        { status: 400 }
      );
    }

    const category = labelsFromCategoryIds(category_ids);
    const primaryCategoryId = category_ids[0];
    const tagsJson = JSON.stringify(Array.isArray(tags) ? tags : []);
    const categoryIdsJson = JSON.stringify(category_ids);

    const rows = await query(
      `UPDATE portfolio_items SET
        title = ?, category = ?, category_id = ?, category_ids = ?::jsonb, description = ?,
        customer_file_url = ?, final_result_url = ?, tags = ?::jsonb,
        overview = ?, service = ?, used_for = ?, formats = ?,
        project_type = ?, sort_order = ?, status = ?
       WHERE id = ? RETURNING *`,
      [
        title?.trim() || "",
        category,
        primaryCategoryId,
        categoryIdsJson,
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
    return NextResponse.json({ success: true, item: mapRow(rows[0]) });
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
