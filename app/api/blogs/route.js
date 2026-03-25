import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getSupabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import path from "path";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request) {
  try {
    await ensureBlogsTable();
    const formData = await request.formData();
    const title = formData.get("title")?.toString() || "";
    const excerpt = formData.get("excerpt")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const category = formData.get("category")?.toString() || "Uncategorized";
    const readTime = formData.get("readTime")?.toString() || "5 min read";
    const date = formData.get("date")?.toString() || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });
    const file = formData.get("featuredImage");
    const introImageFile = formData.get("introSideImage");
    const secondSectionImageFile = formData.get("secondSectionImage");

    const introHeading = formData.get("introHeading")?.toString() || "";
    const introText = formData.get("introText")?.toString() || "";
    const firstH2Heading = formData.get("firstH2Heading")?.toString() || "";
    const firstH2Text = formData.get("firstH2Text")?.toString() || "";
    const keyPointsTitle = formData.get("keyPointsTitle")?.toString() || "";
    const keyPoints = formData.get("keyPoints")?.toString() || "";
    const secondH2Heading = formData.get("secondH2Heading")?.toString() || "";
    const secondH2Text = formData.get("secondH2Text")?.toString() || "";
    const thirdH2Heading = formData.get("thirdH2Heading")?.toString() || "";
    const thirdH2Text = formData.get("thirdH2Text")?.toString() || "";
    const quickTipsTitle = formData.get("quickTipsTitle")?.toString() || "";
    const quickTips = formData.get("quickTips")?.toString() || "";

    if (!title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const uploadImage = async (f, baseTitle) => {
      if (!f || !f.size) return "";
      const ext = path.extname(f.name) || ".png";
      const baseSlug = slugify(baseTitle || title).slice(0, 40);
      const key = `blogs/${baseSlug || "blog"}-${uuidv4()}${ext}`;
      const bytes = await f.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const supabase = getSupabase();
      const { error } = await supabase.storage.from("designs").upload(key, buffer, {
        contentType: f.type || "image/png",
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("designs").getPublicUrl(key);
      return data?.publicUrl || "";
    };

    const featuredImage = (await uploadImage(file, `${title}-hero`)) || "/assets/images/hat/stitch/hat embroidery logo digitizing sewout (12).png";
    const introSideImage = await uploadImage(introImageFile, `${title}-intro`);
    const secondSectionImage = await uploadImage(secondSectionImageFile, `${title}-second`);

    const slug = slugify(title);
    const id = Date.now().toString();
    const createdAt = new Date().toISOString();

    const existing = await query("SELECT id FROM blog_posts WHERE slug = ? LIMIT 1", [slug]);
    const uniqueSlug = existing.length > 0 ? `${slug}-${id}` : slug;

    const newPost = {
      id,
      slug: uniqueSlug,
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category.trim(),
      featuredImage,
      readTime,
      date,
      introHeading: introHeading.trim(),
      introText: introText.trim(),
      introSideImage,
      firstH2Heading: firstH2Heading.trim(),
      firstH2Text: firstH2Text.trim(),
      keyPointsTitle: keyPointsTitle.trim() || "Key Points",
      keyPoints: keyPoints
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      secondH2Heading: secondH2Heading.trim(),
      secondH2Text: secondH2Text.trim(),
      secondSectionImage,
      thirdH2Heading: thirdH2Heading.trim(),
      thirdH2Text: thirdH2Text.trim(),
      quickTipsTitle: quickTipsTitle.trim() || "Quick Tip or Quick Points",
      quickTips: quickTips
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      createdAt,
    };

    await query(
      `INSERT INTO blog_posts (
        id, slug, title, excerpt, content, category, featured_image, read_time, date,
        intro_heading, intro_text, intro_side_image,
        first_h2_heading, first_h2_text,
        key_points_title, key_points,
        second_h2_heading, second_h2_text, second_section_image,
        third_h2_heading, third_h2_text,
        quick_tips_title, quick_tips, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?::jsonb, ?, ?, ?, ?, ?, ?, ?::jsonb, ?::timestamptz)`,
      [
        newPost.id,
        newPost.slug,
        newPost.title,
        newPost.excerpt,
        newPost.content,
        newPost.category,
        newPost.featuredImage,
        newPost.readTime,
        newPost.date,
        newPost.introHeading,
        newPost.introText,
        newPost.introSideImage,
        newPost.firstH2Heading,
        newPost.firstH2Text,
        newPost.keyPointsTitle,
        JSON.stringify(newPost.keyPoints || []),
        newPost.secondH2Heading,
        newPost.secondH2Text,
        newPost.secondSectionImage,
        newPost.thirdH2Heading,
        newPost.thirdH2Text,
        newPost.quickTipsTitle,
        JSON.stringify(newPost.quickTips || []),
        newPost.createdAt,
      ]
    );

    return NextResponse.json({ success: true, post: newPost });
  } catch (err) {
    console.error("Blog API error:", err);
    return NextResponse.json({ error: err.message || "Failed to add blog post" }, { status: 500 });
  }
}

export async function GET() {
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
    const posts = rows.map((r) => ({
      ...r,
      keyPoints: Array.isArray(r.keyPoints) ? r.keyPoints : [],
      quickTips: Array.isArray(r.quickTips) ? r.quickTips : [],
    }));
    return NextResponse.json(posts);
  } catch (err) {
    console.error("GET /api/blogs error:", err);
    return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 });
  }
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
