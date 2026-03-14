import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const main_category_param = searchParams.get("main_category");
    const main_categories = main_category_param
      ? main_category_param.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const first_main_category = main_categories[0] || null;
    const theme_id_param = searchParams.get("theme_id");
    const theme_ids = theme_id_param
      ? theme_id_param.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const access = searchParams.get("access") || "all";

    const accessFilter =
      access === "free"
        ? "AND d.is_free = true"
        : access === "premium"
          ? "AND d.is_free = false"
          : "";

    const mainCategories = await query(
      `SELECT mc.id, mc.name, mc.slug, COUNT(d.id) AS count
       FROM main_categories mc
       LEFT JOIN designs d ON d.main_category_id = mc.id AND d.status = 'published' ${accessFilter}
       GROUP BY mc.id, mc.name, mc.slug
       ORDER BY mc.sort_order ASC`
    );

    let themes;
    if (main_categories.length > 0) {
      const mcPlaceholders = main_categories.map(() => "?").join(",");
      themes = await query(
        `SELECT t.id, t.name, t.slug,
          (SELECT COUNT(d.id) FROM designs d
           INNER JOIN main_categories mc ON mc.id = d.main_category_id AND mc.slug IN (${mcPlaceholders})
           WHERE d.theme_id = t.id AND d.status = 'published' ${accessFilter}) AS count
         FROM themes t
         ORDER BY t.sort_order ASC`,
        main_categories
      );
    } else {
      themes = await query(
        `SELECT t.id, t.name, t.slug, COUNT(d.id) AS count
         FROM themes t
         LEFT JOIN designs d ON d.theme_id = t.id AND d.status = 'published' ${accessFilter}
         GROUP BY t.id, t.name, t.slug
         ORDER BY t.sort_order ASC`
      );
    }

    let sub_themes = [];
    if (theme_ids.length > 0) {
      const thPlaceholders = theme_ids.map(() => "?").join(",");
      sub_themes = await query(
        `SELECT st.id, st.name, st.slug, st.theme_id, COUNT(d.id) AS count
         FROM sub_themes st
         LEFT JOIN designs d ON d.sub_theme_id = st.id AND d.status = 'published'
         WHERE st.theme_id IN (${thPlaceholders})
         GROUP BY st.id, st.name, st.slug, st.theme_id, st.sort_order
         ORDER BY st.sort_order ASC, st.name ASC`,
        theme_ids
      );
    }

    let filter_options = {};
    if (first_main_category) {
      const mcRows = await query(
        "SELECT id FROM main_categories WHERE slug = ? LIMIT 1",
        [first_main_category]
      );
      const mcId = mcRows?.[0]?.id;
      if (mcId) {
        const options = await query(
          "SELECT filter_key, value, sort_order FROM filter_options WHERE main_category_id = ? ORDER BY filter_key, sort_order",
          [mcId]
        );
        const mcForCount = main_categories.length > 0 ? main_categories : [first_main_category];
        const mcPlaceholders = mcForCount.map(() => "?").join(",");
        const multiValueKeys = ["placement", "hoop_size"];
        const withCounts = await Promise.all(
          options.map(async (opt) => {
            const key = opt.filter_key;
            const isMulti = multiValueKeys.includes(key);
            // For multi-value keys: match JSONB array containing value OR scalar string equals value
            const countSql = isMulti
              ? `SELECT COUNT(d.id) AS count FROM designs d
                 INNER JOIN main_categories mc ON mc.id = d.main_category_id AND mc.slug IN (${mcPlaceholders})
                 WHERE d.status = 'published' AND (d.technical_attributes->? @> ?::jsonb OR d.technical_attributes->>? = ?)`
              : `SELECT COUNT(d.id) AS count FROM designs d
                 INNER JOIN main_categories mc ON mc.id = d.main_category_id AND mc.slug IN (${mcPlaceholders})
                 WHERE d.status = 'published' AND d.technical_attributes->>? = ?`;
            const countParams = isMulti
              ? [...mcForCount, key, JSON.stringify([opt.value]), key, opt.value]
              : [...mcForCount, key, opt.value];
            const countRows = await query(countSql, countParams);
            return {
              ...opt,
              count: countRows?.[0]?.count ?? 0,
            };
          })
        );
        for (const opt of withCounts) {
          if (!filter_options[opt.filter_key]) {
            filter_options[opt.filter_key] = [];
          }
          filter_options[opt.filter_key].push({
            value: opt.value,
            sort_order: opt.sort_order,
            count: opt.count,
          });
        }
      }
    }

    return NextResponse.json({
      main_categories: mainCategories,
      themes,
      sub_themes,
      filter_options: filter_options,
    });
  } catch (err) {
    console.error("GET /api/designs/filters error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch filters" },
      { status: 500 }
    );
  }
}
