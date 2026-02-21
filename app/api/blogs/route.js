import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

const POSTS_PATH = path.join(process.cwd(), "app/data/blogs/posts.json");
const UPLOAD_DIR = path.join(process.cwd(), "public/assets/blogs");

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title")?.toString() || "";
    const excerpt = formData.get("excerpt")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const category = formData.get("category")?.toString() || "Uncategorized";
    const readTime = formData.get("readTime")?.toString() || "5 min read";
    const date = formData.get("date")?.toString() || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });
    const file = formData.get("featuredImage");

    if (!title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    let featuredImage = "";
    if (file && file.size > 0) {
      await mkdir(UPLOAD_DIR, { recursive: true });
      const ext = path.extname(file.name) || ".png";
      const baseSlug = slugify(title).slice(0, 40);
      const filename = `${baseSlug}-${Date.now()}${ext}`;
      const filePath = path.join(UPLOAD_DIR, filename);
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);
      featuredImage = `/assets/blogs/${filename}`;
    }

    const slug = slugify(title);
    const id = Date.now().toString();
    const createdAt = new Date().toISOString();

    let posts = [];
    try {
      const data = await readFile(POSTS_PATH, "utf8");
      posts = JSON.parse(data);
    } catch {
      posts = [];
    }

    const newPost = {
      id,
      slug: posts.some((p) => p.slug === slug) ? `${slug}-${id}` : slug,
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category.trim(),
      featuredImage: featuredImage || "/assets/images/hat/stitch/hat embroidery logo digitizing sewout (12).png",
      readTime,
      date,
      createdAt,
    };

    posts.unshift(newPost);
    await writeFile(POSTS_PATH, JSON.stringify(posts, null, 2), "utf8");

    return NextResponse.json({ success: true, post: newPost });
  } catch (err) {
    console.error("Blog API error:", err);
    return NextResponse.json({ error: "Failed to add blog post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await readFile(POSTS_PATH, "utf8");
    const posts = JSON.parse(data);
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json([], { status: 200 });
  }
}
