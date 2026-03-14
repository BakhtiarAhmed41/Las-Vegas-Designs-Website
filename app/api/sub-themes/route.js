import { NextResponse } from "next/server";
import { query } from "@/lib/db";

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "subtheme";
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const theme_id = searchParams.get("theme_id");
    if (!theme_id) {
      return NextResponse.json([]);
    }
    const themeIds = theme_id.split(",").map((s) => s.trim()).filter(Boolean);
    if (themeIds.length === 0) return NextResponse.json([]);
    const placeholders = themeIds.map(() => "?").join(",");
    const rows = await query(
      `SELECT id, theme_id, name, slug, sort_order FROM sub_themes WHERE theme_id IN (${placeholders}) ORDER BY sort_order ASC, name ASC`,
      themeIds
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/sub-themes error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch sub-themes" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { theme_id, name } = body;
    if (theme_id == null || theme_id === "") {
      return NextResponse.json({ error: "Parent theme is required" }, { status: 400 });
    }
    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const themeId = parseInt(theme_id, 10);
    if (Number.isNaN(themeId)) {
      return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
    }
    const themeExists = await query("SELECT id FROM themes WHERE id = ? LIMIT 1", [themeId]);
    if (!themeExists?.length) {
      return NextResponse.json({ error: "Theme not found" }, { status: 404 });
    }
    const slug = slugify(name.trim()) || "subtheme";
    const existing = await query("SELECT id FROM sub_themes WHERE theme_id = ? AND slug = ? LIMIT 1", [themeId, slug]);
    if (existing?.length) {
      return NextResponse.json({ error: "A sub-theme with this name already exists under this theme" }, { status: 400 });
    }
    const sortOrder = Number(body.sort_order) || 0;
    const result = await query(
      "INSERT INTO sub_themes (theme_id, name, slug, sort_order) VALUES (?, ?, ?, ?) RETURNING id, theme_id, name, slug, sort_order",
      [themeId, name.trim(), slug, sortOrder]
    );
    const row = result?.[0];
    if (!row) throw new Error("Insert failed");
    return NextResponse.json({ success: true, sub_theme: row });
  } catch (err) {
    console.error("POST /api/sub-themes error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create sub-theme" },
      { status: 500 }
    );
  }
}
