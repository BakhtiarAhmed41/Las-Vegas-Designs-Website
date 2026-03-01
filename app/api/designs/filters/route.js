import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const main_category = searchParams.get("main_category");
    const theme_id = searchParams.get("theme_id");
    const access = searchParams.get("access") || "all";

    const baseConditions = ["d.status = 'published'"];
    const baseParams = [];
    if (access === "free") {
      baseConditions.push("d.is_free = 1");
    } else if (access === "premium") {
      baseConditions.push("d.is_free = 0");
    }
    if (main_category) {
      baseConditions.push("mc.slug = ?");
      baseParams.push(main_category);
    }
    if (theme_id) {
      baseConditions.push("d.theme_id = ?");
      baseParams.push(theme_id);
    }
    const joinClause = main_category
      ? "INNER JOIN main_categories mc ON mc.id = d.main_category_id"
      : "LEFT JOIN main_categories mc ON mc.id = d.main_category_id";
    const whereClause =
      baseConditions.length > 0 ? `WHERE ${baseConditions.join(" AND ")}` : "";
    const accessJoin =
      access === "free" ? "AND d.is_free = 1" : access === "premium" ? "AND d.is_free = 0" : "";

    const mainCategories = await query(
      `SELECT mc.id, mc.name, mc.slug, COUNT(d.id) AS count
       FROM main_categories mc
       LEFT JOIN designs d ON d.main_category_id = mc.id AND d.status = 'published' ${accessJoin}
       GROUP BY mc.id, mc.name, mc.slug
       ORDER BY mc.sort_order ASC`
    );

    const themeAccessJoin =
      access === "free" ? "AND d.is_free = 1" : access === "premium" ? "AND d.is_free = 0" : "";
    let themes;
    if (main_category) {
      themes = await query(
        `SELECT t.id, t.name, t.slug,
          (SELECT COUNT(d.id) FROM designs d
           INNER JOIN main_categories mc ON mc.id = d.main_category_id AND mc.slug = ?
           WHERE d.theme_id = t.id AND d.status = 'published' ${themeAccessJoin}) AS count
         FROM themes t
         ORDER BY t.sort_order ASC`,
        [main_category]
      );
    } else {
      themes = await query(
        `SELECT t.id, t.name, t.slug, COUNT(d.id) AS count
         FROM themes t
         LEFT JOIN designs d ON d.theme_id = t.id AND d.status = 'published' ${themeAccessJoin}
         GROUP BY t.id, t.name, t.slug
         ORDER BY t.sort_order ASC`
      );
    }

    let sub_themes = [];
    if (theme_id) {
      sub_themes = await query(
        `SELECT st.id, st.name, st.slug, COUNT(d.id) AS count
         FROM sub_themes st
         LEFT JOIN designs d ON d.sub_theme_id = st.id AND d.status = 'published'
         WHERE st.theme_id = ?
         GROUP BY st.id, st.name, st.slug
         ORDER BY st.sort_order ASC`,
        [theme_id]
      );
    }

    let filter_options = {};
    if (main_category) {
      const mcRows = await query(
        "SELECT id FROM main_categories WHERE slug = ? LIMIT 1",
        [main_category]
      );
      const mcId = mcRows?.[0]?.id;
      if (mcId) {
        const options = await query(
          "SELECT filter_key, value, sort_order FROM filter_options WHERE main_category_id = ? ORDER BY filter_key, sort_order",
          [mcId]
        );
        const withCounts = await Promise.all(
          options.map(async (opt) => {
            const key = opt.filter_key;
            const countRows = await query(
              `SELECT COUNT(d.id) AS count FROM designs d
               INNER JOIN main_categories mc ON mc.id = d.main_category_id AND mc.slug = ?
               WHERE d.status = 'published' AND JSON_UNQUOTE(JSON_EXTRACT(d.technical_attributes, ?)) = ?`,
              [main_category, `$.${key}`, opt.value]
            );
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
