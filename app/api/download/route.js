import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const designId = searchParams.get("design_id");

    if (designId && !token) {
      const rows = await query(
        "SELECT id, main_preview_url, title FROM designs WHERE id = ? AND status = 'published' AND is_free = true",
        [designId]
      );
      const design = rows?.[0];
      if (!design) return NextResponse.json({ error: "Not found" }, { status: 404 });
      if (design.main_preview_url) {
        return NextResponse.redirect(design.main_preview_url);
      }
      return NextResponse.json({ message: "No file URL for this design yet." }, { status: 200 });
    }

    if (!token) {
      return NextResponse.json({ error: "Token or design_id required" }, { status: 400 });
    }

    const rows = await query(
      `SELECT od.id, od.design_id, od.expires_at, d.main_preview_url, d.title
       FROM order_downloads od
       INNER JOIN orders o ON o.id = od.order_id AND o.status = 'paid'
       LEFT JOIN designs d ON d.id = od.design_id
       WHERE od.token = ? AND od.expires_at > NOW()`,
      [token]
    );
    const row = rows?.[0];
    if (!row) {
      return NextResponse.json({ error: "Invalid or expired download link" }, { status: 404 });
    }

    if (row.main_preview_url) {
      return NextResponse.redirect(row.main_preview_url);
    }

    return NextResponse.json({
      message: "Download link valid. Design file URL not yet configured.",
      design_title: row.title,
    });
  } catch (err) {
    console.error("GET /api/download error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
