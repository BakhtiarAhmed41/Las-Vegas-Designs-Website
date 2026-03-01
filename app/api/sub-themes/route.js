import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const theme_id = searchParams.get("theme_id");
    if (!theme_id) {
      return NextResponse.json([]);
    }
    const rows = await query(
      "SELECT id, theme_id, name, slug, sort_order FROM sub_themes WHERE theme_id = ? ORDER BY sort_order ASC, name ASC",
      [theme_id]
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
