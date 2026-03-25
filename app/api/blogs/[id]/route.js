import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getSupabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import path from "path";

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function uploadImage(file, baseTitle) {
  if (!file || !file.size) return "";
  const ext = path.extname(file.name) || ".png";
  const baseSlug = slugify(baseTitle).slice(0, 40) || "blog";
  const key = `blogs/${baseSlug}-${uuidv4()}${ext}`;
  const bytes = await file.arrayBuffer();
  const supabase = getSupabase();
  const { error } = await supabase.storage.from("designs").upload(key, Buffer.from(bytes), {
    contentType: file.type || "image/png",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("designs").getPublicUrl(key);
  return data?.publicUrl || "";
}

export async function GET(request, { params }) {
  try {
    await ensureBlogsTable();
    const { id } = await params;
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
      FROM blog_posts WHERE id = ? LIMIT 1`,
      [id]
    );
    const post = rows[0];
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      ...post,
      keyPoints: Array.isArray(post.keyPoints) ? post.keyPoints : [],
      quickTips: Array.isArray(post.quickTips) ? post.quickTips : [],
    });
  } catch {
    return NextResponse.json({ error: "Failed to load post" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await ensureBlogsTable();
    const { id } = await params;
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
      FROM blog_posts WHERE id = ? LIMIT 1`,
      [id]
    );
    const old = rows[0];
    if (!old) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const formData = await request.formData();
    const title = formData.get("title")?.toString().trim() || old.title || "";
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const featuredImage = await uploadImage(formData.get("featuredImage"), `${title}-hero`);
    const introSideImage = await uploadImage(formData.get("introSideImage"), `${title}-intro`);
    const secondSectionImage = await uploadImage(formData.get("secondSectionImage"), `${title}-second`);

    const next = {
      ...old,
      title,
      slug: old.slug || slugify(title),
      excerpt: formData.get("excerpt")?.toString() || "",
      content: formData.get("content")?.toString() || "",
      category: formData.get("category")?.toString() || "Uncategorized",
      readTime: formData.get("readTime")?.toString() || "5 min read",
      date: formData.get("date")?.toString() || old.date,
      featuredImage: featuredImage || old.featuredImage || "/assets/images/hat/stitch/hat embroidery logo digitizing sewout (12).png",
      introHeading: formData.get("introHeading")?.toString() || "",
      introText: formData.get("introText")?.toString() || "",
      introSideImage: introSideImage || old.introSideImage || "",
      firstH2Heading: formData.get("firstH2Heading")?.toString() || "",
      firstH2Text: formData.get("firstH2Text")?.toString() || "",
      keyPointsTitle: formData.get("keyPointsTitle")?.toString() || "Key Points",
      keyPoints: (formData.get("keyPoints")?.toString() || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      secondH2Heading: formData.get("secondH2Heading")?.toString() || "",
      secondH2Text: formData.get("secondH2Text")?.toString() || "",
      secondSectionImage: secondSectionImage || old.secondSectionImage || "",
      thirdH2Heading: formData.get("thirdH2Heading")?.toString() || "",
      thirdH2Text: formData.get("thirdH2Text")?.toString() || "",
      quickTipsTitle: formData.get("quickTipsTitle")?.toString() || "Quick Tip or Quick Points",
      quickTips: (formData.get("quickTips")?.toString() || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    await query(
      `UPDATE blog_posts SET
        title = ?,
        excerpt = ?,
        content = ?,
        category = ?,
        read_time = ?,
        date = ?,
        featured_image = ?,
        intro_heading = ?,
        intro_text = ?,
        intro_side_image = ?,
        first_h2_heading = ?,
        first_h2_text = ?,
        key_points_title = ?,
        key_points = ?::jsonb,
        second_h2_heading = ?,
        second_h2_text = ?,
        second_section_image = ?,
        third_h2_heading = ?,
        third_h2_text = ?,
        quick_tips_title = ?,
        quick_tips = ?::jsonb
      WHERE id = ?`,
      [
        next.title,
        next.excerpt,
        next.content,
        next.category,
        next.readTime,
        next.date,
        next.featuredImage,
        next.introHeading,
        next.introText,
        next.introSideImage,
        next.firstH2Heading,
        next.firstH2Text,
        next.keyPointsTitle,
        JSON.stringify(next.keyPoints || []),
        next.secondH2Heading,
        next.secondH2Text,
        next.secondSectionImage,
        next.thirdH2Heading,
        next.thirdH2Text,
        next.quickTipsTitle,
        JSON.stringify(next.quickTips || []),
        id,
      ]
    );
    return NextResponse.json({ success: true, post: next });
  } catch (err) {
    console.error("PUT /api/blogs/[id] error:", err);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await ensureBlogsTable();
    const { id } = await params;
    await query("DELETE FROM blog_posts WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
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
