import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import BlogContent from "../components/Blog/BlogContent";
import { getPosts, getCategoriesFromPosts } from "../data/blogs/readPosts";

export const metadata = {
  title: "Blog - Practical guides for digitizing and vector work | Las Vegas Designs USA",
  description:
    "Short production focused posts about embroidery digitizing. SVG, PNG vector, CNC and laser files.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPosts();
  const categories = getCategoriesFromPosts(posts);

  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />
      <BlogContent initialPosts={posts} categories={categories} />
      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}
