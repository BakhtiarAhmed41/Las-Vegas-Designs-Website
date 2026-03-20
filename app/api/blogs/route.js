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
      await mkdir(UPLOAD_DIR, { recursive: true });
      const ext = path.extname(f.name) || ".png";
      const baseSlug = slugify(baseTitle || title).slice(0, 40);
      const filename = `${baseSlug}-${Date.now()}${ext}`;
      const filePath = path.join(UPLOAD_DIR, filename);
      const bytes = await f.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);
      return `/assets/blogs/${filename}`;
    };

    const featuredImage = (await uploadImage(file, `${title}-hero`)) || "/assets/images/hat/stitch/hat embroidery logo digitizing sewout (12).png";
    const introSideImage = await uploadImage(introImageFile, `${title}-intro`);
    const secondSectionImage = await uploadImage(secondSectionImageFile, `${title}-second`);

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
