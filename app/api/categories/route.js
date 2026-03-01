import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const rows = await query(
      "SELECT id, name, slug, sort_order FROM main_categories ORDER BY sort_order ASC"
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/categories error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
