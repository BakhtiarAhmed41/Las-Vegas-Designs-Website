import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

const POSTS_PATH = path.join(process.cwd(), "app/data/blogs/posts.json");
const UPLOAD_DIR = path.join(process.cwd(), "public/assets/blogs");

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function readPosts() {
  try {
    const data = await readFile(POSTS_PATH, "utf8");
    const posts = JSON.parse(data);
    return Array.isArray(posts) ? posts : [];
  } catch {
    return [];
  }
}

async function writePosts(posts) {
  await writeFile(POSTS_PATH, JSON.stringify(posts, null, 2), "utf8");
}

async function uploadImage(file, baseTitle) {
  if (!file || !file.size) return "";
  await mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(file.name) || ".png";
  const baseSlug = slugify(baseTitle).slice(0, 40) || "blog";
  const filename = `${baseSlug}-${Date.now()}${ext}`;
  const filePath = path.join(UPLOAD_DIR, filename);
  const bytes = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(bytes));
  return `/assets/blogs/${filename}`;
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const posts = await readPosts();
    const post = posts.find((p) => p.id === id);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Failed to load post" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const posts = await readPosts();
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const old = posts[idx];
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

    posts[idx] = next;
    await writePosts(posts);
    return NextResponse.json({ success: true, post: next });
  } catch (err) {
    console.error("PUT /api/blogs/[id] error:", err);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const posts = await readPosts();
    const next = posts.filter((p) => p.id !== id);
    await writePosts(next);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
