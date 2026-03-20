import { NextResponse } from "next/server";
import { query } from "@/lib/db";

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "project";
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const status = searchParams.get("status") || "published";

    let sql = "SELECT * FROM portfolio_items";
    const conditions = [];
    const params = [];

    if (status !== "all") {
      conditions.push("status = ?");
      params.push(status);
    }

    if (category && category !== "all") {
      conditions.push("category_id = ?");
      params.push(category);
    }

    if (search && search.trim()) {
      conditions.push("(title ILIKE ? OR category ILIKE ? OR tags::text ILIKE ?)");
      const q = `%${search.trim()}%`;
      params.push(q, q, q);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY sort_order ASC, created_at DESC";

    const rows = await query(sql, params);

    const items = rows.map((r) => ({
      ...r,
      tags: Array.isArray(r.tags) ? r.tags : typeof r.tags === "string" ? JSON.parse(r.tags) : [],
    }));

    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/portfolio error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, category_id, description, customer_file_url, final_result_url, tags, overview, service, used_for, formats, project_type, sort_order, status } = body;

    if (!title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });
    if (!category?.trim()) return NextResponse.json({ error: "Category is required" }, { status: 400 });

    let slug = slugify(title.trim());
    const existing = await query("SELECT id FROM portfolio_items WHERE slug = ?", [slug]);
    if (existing?.length) slug = `${slug}-${Date.now()}`;

    const tagsJson = JSON.stringify(Array.isArray(tags) ? tags : []);

    const rows = await query(
      `INSERT INTO portfolio_items (title, slug, category, category_id, description, customer_file_url, final_result_url, tags, overview, service, used_for, formats, project_type, sort_order, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?::jsonb, ?, ?, ?, ?, ?, ?, ?)
       RETURNING *`,
      [
        title.trim(),
        slug,
        category.trim(),
        (category_id || slugify(category)).trim(),
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
      ]
    );

    return NextResponse.json({ success: true, item: rows[0] });
  } catch (err) {
    console.error("POST /api/portfolio error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
