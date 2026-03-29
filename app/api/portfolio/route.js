import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import {
  labelsFromCategoryIds,
  normalizeCategoryIds,
} from "@/lib/portfolioCategories";

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "project";
}

function mapRow(r) {
  const tags = Array.isArray(r.tags)
    ? r.tags
    : typeof r.tags === "string"
      ? JSON.parse(r.tags)
      : [];
  const category_ids = normalizeCategoryIds(r.category_ids);
  return {
    ...r,
    tags,
    category_ids,
    category:
      category_ids.length > 0
        ? labelsFromCategoryIds(category_ids)
        : r.category || "",
  };
}

function buildWhere(category, search, status) {
  const conditions = [];
  const params = [];

  if (status !== "all") {
    conditions.push("status = ?");
    params.push(status);
  }

  if (category && category !== "all") {
    conditions.push(
      "(category_id = ? OR (category_ids IS NOT NULL AND jsonb_array_length(category_ids) > 0 AND category_ids @> jsonb_build_array(?::text)))"
    );
    params.push(category, category);
  }

  if (search && search.trim()) {
    conditions.push("(title ILIKE ? OR category ILIKE ? OR tags::text ILIKE ?)");
    const q = `%${search.trim()}%`;
    params.push(q, q, q);
  }

  return { conditions, params };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const status = searchParams.get("status") || "published";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const forManage = searchParams.get("manage") === "1";
    const maxLimit = forManage ? 500 : 50;
    const defaultLimit = forManage ? "200" : "6";
    const limit = Math.min(
      maxLimit,
      Math.max(1, parseInt(searchParams.get("limit") || defaultLimit, 10) || 6)
    );
    const offset = (page - 1) * limit;

    const { conditions, params } = buildWhere(category, search, status);
    const whereSql =
      conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "";

    const countRows = await query(
      `SELECT COUNT(*)::int AS total FROM portfolio_items${whereSql}`,
      params
    );
    const total = countRows[0]?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const dataParams = [...params, limit, offset];
    const rows = await query(
      `SELECT * FROM portfolio_items${whereSql} ORDER BY sort_order ASC, created_at DESC LIMIT ? OFFSET ?`,
      dataParams
    );

    const items = rows.map(mapRow);

    return NextResponse.json({
      items,
      total,
      page,
      pageSize: limit,
      totalPages,
    });
  } catch (err) {
    console.error("GET /api/portfolio error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      category: _legacyCategory,
      category_id: _legacyId,
      category_ids: rawIds,
      description,
      customer_file_url,
      final_result_url,
      tags,
      overview,
      service,
      used_for,
      formats,
      project_type,
      sort_order,
      status,
    } = body;

    if (!title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const category_ids = normalizeCategoryIds(rawIds);
    if (!category_ids.length) {
      return NextResponse.json(
        { error: "At least one category is required" },
        { status: 400 }
      );
    }

    const category = labelsFromCategoryIds(category_ids);
    const primaryCategoryId = category_ids[0];

    let slug = slugify(title.trim());
    const existing = await query("SELECT id FROM portfolio_items WHERE slug = ?", [slug]);
    if (existing?.length) slug = `${slug}-${Date.now()}`;

    const tagsJson = JSON.stringify(Array.isArray(tags) ? tags : []);
    const categoryIdsJson = JSON.stringify(category_ids);

    const rows = await query(
      `INSERT INTO portfolio_items (title, slug, category, category_id, category_ids, description, customer_file_url, final_result_url, tags, overview, service, used_for, formats, project_type, sort_order, status)
       VALUES (?, ?, ?, ?, ?::jsonb, ?, ?, ?, ?::jsonb, ?, ?, ?, ?, ?, ?, ?)
       RETURNING *`,
      [
        title.trim(),
        slug,
        category,
        primaryCategoryId,
        categoryIdsJson,
        description || "",
        customer_file_url || "",
        final_result_url || "",
        tagsJson,
        overview || "",
        service || "",
        used_for || "",
        formats || "",
        project_type || "",
        Number(sort_order) || 0,
        status || "published",
      ]
    );

    return NextResponse.json({ success: true, item: mapRow(rows[0]) });
  } catch (err) {
    console.error("POST /api/portfolio error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
