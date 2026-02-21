import { readFile } from "fs/promises";
import path from "path";

const POSTS_PATH = path.join(process.cwd(), "app/data/blogs/posts.json");

export async function getPosts() {
  try {
    const data = await readFile(POSTS_PATH, "utf8");
    const posts = JSON.parse(data);
    return Array.isArray(posts) ? posts : [];
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
