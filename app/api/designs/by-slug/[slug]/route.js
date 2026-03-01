import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    const rows = await query(
      `SELECT d.*, mc.name AS main_category_name, mc.slug AS main_category_slug,
        t.name AS theme_name, t.slug AS theme_slug, st.name AS sub_theme_name, st.slug AS sub_theme_slug
       FROM designs d
       LEFT JOIN main_categories mc ON mc.id = d.main_category_id
       LEFT JOIN themes t ON t.id = d.theme_id
       LEFT JOIN sub_themes st ON st.id = d.sub_theme_id
       WHERE d.slug = ?`,
      [slug]
    );

    const design = rows?.[0];
    if (!design) {
      return NextResponse.json({ error: "Design not found" }, { status: 404 });
    }

    const sizeRows = await query(
      "SELECT id, hoop, width_in, height_in, stitches FROM design_sizes WHERE design_id = ? ORDER BY id",
      [design.id]
    );

    design.technical_attributes =
      design.technical_attributes != null
        ? typeof design.technical_attributes === "string"
          ? JSON.parse(design.technical_attributes)
          : design.technical_attributes
        : {};
    design.formats =
      design.formats != null
        ? typeof design.formats === "string"
          ? JSON.parse(design.formats)
          : design.formats
        : [];
    design.design_sizes = sizeRows || [];

    return NextResponse.json(design);
  } catch (err) {
    console.error("GET /api/designs/by-slug error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch design" },
      { status: 500 }
    );
  }
}
