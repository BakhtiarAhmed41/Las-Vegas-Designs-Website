import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const main_category_param = searchParams.get("main_category");
    if (!main_category_param) {
      return NextResponse.json({});
    }
    const slugs = main_category_param.split(",").map((s) => s.trim()).filter(Boolean);
    const first_slug = slugs[0];
    if (!first_slug) return NextResponse.json({});
    const rows = await query(
      `SELECT fo.filter_key, fo.value, fo.sort_order
       FROM filter_options fo
       INNER JOIN main_categories mc ON mc.id = fo.main_category_id AND mc.slug = ?
       ORDER BY fo.filter_key, fo.sort_order ASC`,
      [first_slug]
    );
    const grouped = {};
    for (const row of rows) {
      if (!grouped[row.filter_key]) {
        grouped[row.filter_key] = [];
      }
      grouped[row.filter_key].push({
        value: row.value,
        sort_order: row.sort_order,
      });
    }
    return NextResponse.json(grouped);
  } catch (err) {
    console.error("GET /api/filter-options error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch filter options" },
      { status: 500 }
    );
  }
}
