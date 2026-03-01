import { NextResponse } from "next/server";
import { query } from "@/lib/db";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const designId = parseInt(id, 10);
    if (!id || Number.isNaN(designId)) {
      return NextResponse.json({ error: "Invalid design ID" }, { status: 400 });
    }

    const rows = await query(
      `SELECT d.*, mc.name AS main_category_name, mc.slug AS main_category_slug,
        t.name AS theme_name, t.slug AS theme_slug, st.name AS sub_theme_name, st.slug AS sub_theme_slug
       FROM designs d
       LEFT JOIN main_categories mc ON mc.id = d.main_category_id
       LEFT JOIN themes t ON t.id = d.theme_id
       LEFT JOIN sub_themes st ON st.id = d.sub_theme_id
       WHERE d.id = ?`,
      [designId]
    );
    const design = rows?.[0];
    if (!design) {
      return NextResponse.json({ error: "Design not found" }, { status: 404 });
    }

    const sizeRows = await query(
      "SELECT id, hoop, width_in, height_in, stitches FROM design_sizes WHERE design_id = ? ORDER BY id",
      [designId]
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
    console.error("GET /api/designs/[id] error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch design" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const designId = parseInt(id, 10);
    if (!id || Number.isNaN(designId)) {
      return NextResponse.json({ error: "Invalid design ID" }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      description,
      price = 0,
      is_free = true,
      main_category_id,
      theme_id,
      sub_theme_id,
      main_preview_url,
      stitchout_url,
      mockup_url,
      seo_title,
      meta_description,
      url_slug,
      tags,
      alt_text,
      internal_notes,
      status = "draft",
      is_featured = false,
      is_new_arrival = false,
      is_bundle = false,
      technical_attributes = {},
      formats = [],
      sizes = [],
    } = body;

    if (!title || !main_category_id) {
      return NextResponse.json(
        { error: "Title and main category are required" },
        { status: 400 }
      );
    }

    const existing = await query("SELECT id, slug FROM designs WHERE id = ?", [designId]);
    if (!existing?.length) {
      return NextResponse.json({ error: "Design not found" }, { status: 404 });
    }

    let slug =
      url_slug && String(url_slug).trim()
        ? slugify(url_slug)
        : slugify(title);
    if (!slug) slug = `design-${Date.now()}`;
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
      const conflict = await query("SELECT id FROM designs WHERE slug = ? AND id != ? LIMIT 1", [slug, designId]);
      if (!conflict || conflict.length === 0) break;
      slug = `${slug}-${Date.now()}${attempts > 0 ? `-${attempts}` : ""}`;
      attempts += 1;
    }

    await query(
      `UPDATE designs SET
        title = ?, slug = ?, description = ?, price = ?, is_free = ?, main_category_id = ?, theme_id = ?, sub_theme_id = ?,
        main_preview_url = ?, stitchout_url = ?, mockup_url = ?, seo_title = ?, meta_description = ?, url_slug = ?,
        tags = ?, alt_text = ?, internal_notes = ?, status = ?, is_featured = ?, is_new_arrival = ?, is_bundle = ?,
        technical_attributes = ?, formats = ?
       WHERE id = ?`,
      [
        title.trim(),
        slug,
        description?.trim() || null,
        Number(price) || 0,
        Boolean(is_free),
        main_category_id,
        theme_id || null,
        sub_theme_id || null,
        main_preview_url || null,
        stitchout_url || null,
        mockup_url || null,
        seo_title?.trim() || null,
        meta_description?.trim() || null,
        url_slug?.trim() || null,
        JSON.stringify(Array.isArray(tags) ? tags : tags ? String(tags).split(",").map((t) => t.trim()) : []),
        alt_text?.trim() || null,
        internal_notes?.trim() || null,
        status === "published" ? "published" : "draft",
        Boolean(is_featured),
        Boolean(is_new_arrival),
        Boolean(is_bundle),
        JSON.stringify(technical_attributes),
        JSON.stringify(Array.isArray(formats) ? formats : []),
        designId,
      ]
    );

    await query("DELETE FROM design_sizes WHERE design_id = ?", [designId]);
    if (Array.isArray(sizes) && sizes.length > 0) {
      for (const s of sizes) {
        await query(
          `INSERT INTO design_sizes (design_id, hoop, width_in, height_in, stitches) VALUES (?, ?, ?, ?, ?)`,
          [
            designId,
            s.hoop || null,
            s.width_in != null ? Number(s.width_in) : null,
            s.height_in != null ? Number(s.height_in) : null,
            s.stitches != null ? Number(s.stitches) : null,
          ]
        );
      }
    }

    const rows = await query(
      `SELECT d.*, mc.name AS main_category_name, mc.slug AS main_category_slug,
        t.name AS theme_name, t.slug AS theme_slug, st.name AS sub_theme_name, st.slug AS sub_theme_slug
       FROM designs d
       LEFT JOIN main_categories mc ON mc.id = d.main_category_id
       LEFT JOIN themes t ON t.id = d.theme_id
       LEFT JOIN sub_themes st ON st.id = d.sub_theme_id
       WHERE d.id = ?`,
      [designId]
    );
    const design = rows?.[0];
    if (design) {
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
      const sizeRows = await query(
        "SELECT id, hoop, width_in, height_in, stitches FROM design_sizes WHERE design_id = ?",
        [designId]
      );
      design.design_sizes = sizeRows || [];
    }

    return NextResponse.json({ success: true, design });
  } catch (err) {
    console.error("PUT /api/designs/[id] error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update design" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const designId = parseInt(id, 10);
    if (!id || Number.isNaN(designId)) {
      return NextResponse.json({ error: "Invalid design ID" }, { status: 400 });
    }

    const existing = await query("SELECT id FROM designs WHERE id = ?", [designId]);
    if (!existing?.length) {
      return NextResponse.json({ error: "Design not found" }, { status: 404 });
    }

    await query("DELETE FROM design_sizes WHERE design_id = ?", [designId]);
    await query("DELETE FROM designs WHERE id = ?", [designId]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/designs/[id] error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete design" },
      { status: 500 }
    );
  }
}
