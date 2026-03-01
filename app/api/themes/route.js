import { NextResponse } from "next/server";
import { query } from "@/lib/db";

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
