import { query } from "@/lib/db";

export async function getPosts() {
  try {
    await ensureBlogsTable();
    const rows = await query(
      `SELECT
        id, slug, title, excerpt, content, category,
        featured_image AS "featuredImage",
        read_time AS "readTime",
        date,
        intro_heading AS "introHeading",
        intro_text AS "introText",
        intro_side_image AS "introSideImage",
        first_h2_heading AS "firstH2Heading",
        first_h2_text AS "firstH2Text",
        key_points_title AS "keyPointsTitle",
        key_points AS "keyPoints",
        second_h2_heading AS "secondH2Heading",
        second_h2_text AS "secondH2Text",
        second_section_image AS "secondSectionImage",
        third_h2_heading AS "thirdH2Heading",
        third_h2_text AS "thirdH2Text",
        quick_tips_title AS "quickTipsTitle",
        quick_tips AS "quickTips",
        created_at AS "createdAt"
      FROM blog_posts
      ORDER BY created_at DESC`
    );
    return rows.map((r) => ({
      ...r,
      keyPoints: Array.isArray(r.keyPoints) ? r.keyPoints : [],
      quickTips: Array.isArray(r.quickTips) ? r.quickTips : [],
    }));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getCategoriesFromPosts(posts) {
  const counts = {};
  posts.forEach((p) => {
    const cat = p.category || "Uncategorized";
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

async function ensureBlogsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT DEFAULT '',
      content TEXT DEFAULT '',
      category TEXT DEFAULT 'Uncategorized',
      featured_image TEXT DEFAULT '',
      read_time TEXT DEFAULT '5 min read',
      date TEXT DEFAULT '',
      intro_heading TEXT DEFAULT '',
      intro_text TEXT DEFAULT '',
      intro_side_image TEXT DEFAULT '',
      first_h2_heading TEXT DEFAULT '',
      first_h2_text TEXT DEFAULT '',
      key_points_title TEXT DEFAULT 'Key Points',
      key_points JSONB DEFAULT '[]'::jsonb,
      second_h2_heading TEXT DEFAULT '',
      second_h2_text TEXT DEFAULT '',
      second_section_image TEXT DEFAULT '',
      third_h2_heading TEXT DEFAULT '',
      third_h2_text TEXT DEFAULT '',
      quick_tips_title TEXT DEFAULT 'Quick Tip or Quick Points',
      quick_tips JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}
