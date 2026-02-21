"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TopTicker from "../../components/TopPicker/TopPicker";
import Navbar from "../../components/Navbar/Navbar3";
import Footer from "../../components/Footer/Footer";
import GoUp from "../../components/Buttons/GoUp";
import ChatButton from "../../components/Buttons/ChatButton";

export default function AddBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    readTime: "5 min read",
    date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    featuredImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setForm((prev) => ({ ...prev, featuredImage: file || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("excerpt", form.excerpt.trim());
      formData.append("content", form.content.trim());
      formData.append("category", form.category.trim() || "Uncategorized");
      formData.append("readTime", form.readTime.trim());
      formData.append("date", form.date.trim());
      if (form.featuredImage) {
        formData.append("featuredImage", form.featuredImage);
      }

      const res = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to add blog post");
      }
      router.push("/blog");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      <section className="py-10 md:py-14">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Add new blog post</h1>
            <Link href="/blog" className="text-lv-red font-semibold hover:underline">
              ← Back to blog
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-1">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Left chest sizing guide for logos"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-800 mb-1">
                Short description / excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={2}
                value={form.excerpt}
                onChange={handleChange}
                placeholder="Brief summary for cards and SEO"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-800 mb-1">
                Full content
              </label>
              <textarea
                id="content"
                name="content"
                rows={12}
                value={form.content}
                onChange={handleChange}
                placeholder="Main article text (plain text or line breaks)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent resize-y"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-800 mb-1">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Embroidery, Vector, SVG and PNG (appears in sidebar when added)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">This category will appear in the blog page sidebar filter.</p>
            </div>

            <div>
              <label htmlFor="featuredImage" className="block text-sm font-semibold text-gray-800 mb-1">
                Featured image
              </label>
              <input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
              />
              <p className="text-xs text-gray-500 mt-1">Used on the blog card and as the hero image on the post page.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="readTime" className="block text-sm font-semibold text-gray-800 mb-1">
                  Read time
                </label>
                <input
                  id="readTime"
                  name="readTime"
                  type="text"
                  value={form.readTime}
                  onChange={handleChange}
                  placeholder="e.g. 5 min read"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-gray-800 mb-1">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="text"
                  value={form.date}
                  onChange={handleChange}
                  placeholder="e.g. Feb 2026"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-lv-red hover:bg-lv-red-dark disabled:opacity-60 text-white font-semibold rounded-lg transition-colors"
              >
                {loading ? "Adding…" : "Add blog post"}
              </button>
              <Link
                href="/blog"
                className="px-6 py-3 bg-white border border-gray-300 text-gray-800 font-semibold rounded-lg hover:border-gray-400 transition-colors inline-flex items-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}
