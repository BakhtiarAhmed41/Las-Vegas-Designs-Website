import { NextResponse } from "next/server";
import { query } from "@/lib/db";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const main_category_param = searchParams.get("main_category");
    const main_categories = main_category_param
      ? main_category_param.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const theme_id = searchParams.get("theme_id");
    const sub_theme_id = searchParams.get("sub_theme_id");
    const access = searchParams.get("access") || "all";
    const new_arrival = searchParams.get("new_arrival");
    const bundle = searchParams.get("bundle");
    const search = searchParams.get("search") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "24", 10)));
    const offset = (page - 1) * limit;
    const sort = searchParams.get("sort") || "newest";
    const manage = searchParams.get("manage") === "1" || searchParams.get("manage") === "true";

    const conditions = manage ? [] : ["d.status = 'published'"];
    const params = [];

    if (main_categories.length > 0) {
      conditions.push(`mc.slug IN (${main_categories.map(() => "?").join(",")})`);
      params.push(...main_categories);
    }
    const theme_ids = theme_id
      ? theme_id.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    if (theme_ids.length > 0) {
      conditions.push(`d.theme_id IN (${theme_ids.map(() => "?").join(",")})`);
      params.push(...theme_ids);
    }
    const sub_theme_ids = sub_theme_id
      ? sub_theme_id.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    if (sub_theme_ids.length > 0) {
      conditions.push(`d.sub_theme_id IN (${sub_theme_ids.map(() => "?").join(",")})`);
      params.push(...sub_theme_ids);
    }
    if (access === "free") {
      conditions.push("d.is_free = true");
    } else if (access === "premium") {
      conditions.push("d.is_free = false");
    }
    if (new_arrival === "1" || new_arrival === "true") {
      conditions.push("d.is_new_arrival = true");
    }
    if (bundle === "1" || bundle === "true") {
      conditions.push("d.is_bundle = true");
    }
    const featured = searchParams.get("featured");
    if (featured === "1" || featured === "true") {
      conditions.push("d.is_featured = true");
    }

    const categorySpecificKeys = [
      "placement",
      "hoop_size",
      "style",
      "print_method",
      "design_style",
      "file_format",
      "background",
      "cut_type",
      "build_style",
      "svg_type",
      "layer_type",
    ];
    const multiValueKeys = ["placement", "hoop_size"];
    for (const key of categorySpecificKeys) {
      const value = searchParams.get(key);
      if (!value) continue;
      const values = value.split(",").map((s) => s.trim()).filter(Boolean);
      if (multiValueKeys.includes(key) && values.length > 0) {
        conditions.push(`(d.technical_attributes->'${key}' ?| ?::text[] OR d.technical_attributes->>'${key}' = ANY(?::text[]))`);
        params.push(values, values);
      } else if (values.length > 0) {
        conditions.push(`d.technical_attributes->>'${key}' = ?`);
        params.push(values[0]);
      }
    }

    if (search.trim()) {
      conditions.push("(d.title ILIKE ? OR d.description ILIKE ? OR d.tags::text ILIKE ?)");
      const like = `%${search.trim()}%`;
      params.push(like, like, like);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const joinClause = main_categories.length > 0
      ? "INNER JOIN main_categories mc ON mc.id = d.main_category_id"
      : "LEFT JOIN main_categories mc ON mc.id = d.main_category_id";

    const orderBy =
      sort === "newest"
        ? "d.created_at DESC"
        : sort === "price_asc"
          ? "d.price ASC"
          : sort === "price_desc"
            ? "d.price DESC"
            : "d.created_at DESC";

    const countSql = `
      SELECT COUNT(d.id) AS total
      FROM designs d
      ${joinClause}
      LEFT JOIN themes t ON t.id = d.theme_id
      LEFT JOIN sub_themes st ON st.id = d.sub_theme_id
      ${whereClause}
    `;
    const [countRow] = await query(countSql, params);
    const total = countRow?.total ?? 0;

    const listSql = `
      SELECT d.id, d.title, d.slug, d.description, d.price, d.is_free, d.main_preview_url,
        d.stitchout_url, d.mockup_url, d.technical_attributes, d.formats, d.is_featured,
        d.is_new_arrival, d.is_bundle, d.created_at,
        mc.id AS main_category_id, mc.name AS main_category_name, mc.slug AS main_category_slug,
        t.id AS theme_id, t.name AS theme_name, t.slug AS theme_slug,
        st.id AS sub_theme_id, st.name AS sub_theme_name, st.slug AS sub_theme_slug
      FROM designs d
      ${joinClause}
      LEFT JOIN themes t ON t.id = d.theme_id
      LEFT JOIN sub_themes st ON st.id = d.sub_theme_id
      ${whereClause}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `;
    const designs = await query(listSql, [...params, limit, offset]);

    const designsWithSizes = await Promise.all(
      designs.map(async (d) => {
        const sizes = await query(
          "SELECT id, hoop, width_in, height_in, stitches FROM design_sizes WHERE design_id = ?",
          [d.id]
        );
        return {
          ...d,
          technical_attributes: d.technical_attributes || null,
          formats: d.formats || null,
          design_sizes: sizes || [],
        };
      })
    );

    return NextResponse.json({
      designs: designsWithSizes,
      total,
      page,
      limit,
    });
  } catch (err) {
    console.error("GET /api/designs error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch designs" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
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

    let baseSlug =
      url_slug && String(url_slug).trim()
        ? slugify(url_slug)
        : slugify(title);
    if (!baseSlug) baseSlug = `design-${Date.now()}`;

    let slug = baseSlug;
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
      const existing = await query("SELECT id FROM designs WHERE slug = ? LIMIT 1", [slug]);
      if (!existing || existing.length === 0) break;
      slug = `${baseSlug}-${Date.now()}${attempts > 0 ? `-${attempts}` : ""}`;
      attempts += 1;
    }

    const tagsJson = JSON.stringify(Array.isArray(tags) ? tags : tags ? String(tags).split(",").map((t) => t.trim()) : []);
    const techJson = JSON.stringify(technical_attributes);
    const formatsJson = JSON.stringify(Array.isArray(formats) ? formats : []);

    const result = await query(
      `INSERT INTO designs (
        title, slug, description, price, is_free, main_category_id, theme_id, sub_theme_id,
        main_preview_url, stitchout_url, mockup_url, seo_title, meta_description, url_slug,
        tags, alt_text, internal_notes, status, is_featured, is_new_arrival, is_bundle,
        technical_attributes, formats
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING id`,
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
        tagsJson,
        alt_text?.trim() || null,
        internal_notes?.trim() || null,
        status === "published" ? "published" : "draft",
        Boolean(is_featured),
        Boolean(is_new_arrival),
        Boolean(is_bundle),
        techJson,
        formatsJson,
      ]
    );

    const designId = result?.[0]?.id;
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
      design.technical_attributes = design.technical_attributes || {};
      design.formats = design.formats || [];
      const sizeRows = await query(
        "SELECT id, hoop, width_in, height_in, stitches FROM design_sizes WHERE design_id = ?",
        [designId]
      );
      design.design_sizes = sizeRows || [];
    }

    return NextResponse.json({ success: true, design });
  } catch (err) {
    console.error("POST /api/designs error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create design" },
      { status: 500 }
    );
  }
}
