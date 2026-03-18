import { NextResponse } from "next/server";
import { query } from "@/lib/db";

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "theme";
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const main_category = searchParams.get("main_category");
    let rows;
    if (main_category) {
      rows = await query(
        `SELECT DISTINCT t.id, t.name, t.slug, t.sort_order
         FROM themes t
         INNER JOIN designs d ON d.theme_id = t.id AND d.status = 'published'
         INNER JOIN main_categories mc ON mc.id = d.main_category_id AND mc.slug = ?
         ORDER BY t.sort_order ASC`,
        [main_category]
      );
    } else {
      rows = await query(
        "SELECT id, name, slug, sort_order FROM themes ORDER BY sort_order ASC"
      );
    }
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/themes error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch themes" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await query("DELETE FROM themes WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/themes error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete theme" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name } = body;
    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const slug = slugify(name.trim()) || "theme";
    const existing = await query("SELECT id FROM themes WHERE slug = ? LIMIT 1", [slug]);
    if (existing?.length) {
      return NextResponse.json({ error: "A theme with this name/slug already exists" }, { status: 400 });
    }
    const sortOrder = Number(body.sort_order) || 0;
    const result = await query(
      "INSERT INTO themes (name, slug, sort_order) VALUES (?, ?, ?) RETURNING id, name, slug, sort_order",
      [name.trim(), slug, sortOrder]
    );
    const row = result?.[0];
    if (!row) throw new Error("Insert failed");
    return NextResponse.json({ success: true, theme: row });
  } catch (err) {
    console.error("POST /api/themes error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create theme" },
      { status: 500 }
    );
  }
}
