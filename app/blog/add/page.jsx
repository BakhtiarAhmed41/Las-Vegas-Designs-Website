"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import TopTicker from "../../components/TopPicker/TopPicker";
import Navbar from "../../components/Navbar/Navbar3";
import Footer from "../../components/Footer/Footer";
import GoUp from "../../components/Buttons/GoUp";
import ChatButton from "../../components/Buttons/ChatButton";

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 md:p-6">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-1 mb-4">{subtitle}</p>}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export default function AddBlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
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
    introHeading: "",
    introText: "",
    introSideImage: null,
    firstH2Heading: "",
    firstH2Text: "",
    keyPointsTitle: "Key Points",
    keyPoints: "",
    secondH2Heading: "",
    secondH2Text: "",
    secondSectionImage: null,
    thirdH2Heading: "",
    thirdH2Text: "",
    quickTipsTitle: "Quick Tip or Quick Points",
    quickTips: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    const { name } = e.target;
    setForm((prev) => ({ ...prev, [name]: file || null }));
  };

  useEffect(() => {
    if (!editId) return;
    fetch(`/api/blogs/${editId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setForm((prev) => ({
          ...prev,
          title: data.title || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          category: data.category || "",
          readTime: data.readTime || "5 min read",
          date: data.date || prev.date,
          introHeading: data.introHeading || "",
          introText: data.introText || "",
          firstH2Heading: data.firstH2Heading || "",
          firstH2Text: data.firstH2Text || "",
          keyPointsTitle: data.keyPointsTitle || "Key Points",
          keyPoints: Array.isArray(data.keyPoints) ? data.keyPoints.join("\n") : "",
          secondH2Heading: data.secondH2Heading || "",
          secondH2Text: data.secondH2Text || "",
          thirdH2Heading: data.thirdH2Heading || "",
          thirdH2Text: data.thirdH2Text || "",
          quickTipsTitle: data.quickTipsTitle || "Quick Tip or Quick Points",
          quickTips: Array.isArray(data.quickTips) ? data.quickTips.join("\n") : "",
        }));
      })
      .catch(() => setError("Failed to load blog for editing"));
  }, [editId]);

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
      if (form.introSideImage) {
        formData.append("introSideImage", form.introSideImage);
      }
      if (form.secondSectionImage) {
        formData.append("secondSectionImage", form.secondSectionImage);
      }
      formData.append("introHeading", form.introHeading.trim());
      formData.append("introText", form.introText.trim());
      formData.append("firstH2Heading", form.firstH2Heading.trim());
      formData.append("firstH2Text", form.firstH2Text.trim());
      formData.append("keyPointsTitle", form.keyPointsTitle.trim());
      formData.append("keyPoints", form.keyPoints);
      formData.append("secondH2Heading", form.secondH2Heading.trim());
      formData.append("secondH2Text", form.secondH2Text.trim());
      formData.append("thirdH2Heading", form.thirdH2Heading.trim());
      formData.append("thirdH2Text", form.thirdH2Text.trim());
      formData.append("quickTipsTitle", form.quickTipsTitle.trim());
      formData.append("quickTips", form.quickTips);

      const res = await fetch(editId ? `/api/blogs/${editId}` : "/api/blogs", {
        method: editId ? "PUT" : "POST",
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
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {editId ? "Edit blog post" : "Add new blog post"}
            </h1>
            <Link href="/blog" className="text-lv-red font-semibold hover:underline">
              ← Back to blog
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 bg-gray-50 rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                {error}
              </div>
            )}

            <SectionCard
              title="1) Blog Basics + Hero"
              subtitle="Top-level blog identity and hero media."
            >
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
                <label htmlFor="category" className="block text-sm font-semibold text-gray-800 mb-1">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Embroidery, Vector, SVG and PNG"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Used in blog listing filters.</p>
              </div>

              <div>
                <label htmlFor="featuredImage" className="block text-sm font-semibold text-gray-800 mb-1">
                  Main Hero Image
                </label>
                <input
                  id="featuredImage"
                  name="featuredImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
                <p className="text-xs text-gray-500 mt-1">Shown at the top of the single blog page.</p>
              </div>
            </SectionCard>

            <SectionCard
              title="2) Intro Block (Left text + right image)"
              subtitle="Matches the first content block in your template."
            >
              <div>
                <label htmlFor="introHeading" className="block text-sm font-semibold text-gray-800 mb-1">
                  Intro Heading
                </label>
                <input
                  id="introHeading"
                  name="introHeading"
                  type="text"
                  value={form.introHeading}
                  onChange={handleChange}
                  placeholder="Your Blog Intro Heading Goes Here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="introText" className="block text-sm font-semibold text-gray-800 mb-1">
                  Intro Paragraph
                </label>
                <textarea
                  id="introText"
                  name="introText"
                  rows={3}
                  value={form.introText}
                  onChange={handleChange}
                  placeholder="Your intro paragraph text..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent resize-y"
                />
              </div>
              <div>
                <label htmlFor="introSideImage" className="block text-sm font-semibold text-gray-800 mb-1">
                  Intro Right Side Image
                </label>
                <input
                  id="introSideImage"
                  name="introSideImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
            </SectionCard>

            <SectionCard title="3) First H2 + Key Points Box">
              <div>
                <label htmlFor="firstH2Heading" className="block text-sm font-semibold text-gray-800 mb-1">
                  First H2 Heading
                </label>
                <input
                  id="firstH2Heading"
                  name="firstH2Heading"
                  type="text"
                  value={form.firstH2Heading}
                  onChange={handleChange}
                  placeholder="First H2 Section Heading"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="firstH2Text" className="block text-sm font-semibold text-gray-800 mb-1">
                  First H2 Content
                </label>
                <textarea
                  id="firstH2Text"
                  name="firstH2Text"
                  rows={3}
                  value={form.firstH2Text}
                  onChange={handleChange}
                  placeholder="First section content..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent resize-y"
                />
              </div>
              <div>
                <label htmlFor="keyPointsTitle" className="block text-sm font-semibold text-gray-800 mb-1">
                  Key Points Box Title
                </label>
                <input
                  id="keyPointsTitle"
                  name="keyPointsTitle"
                  type="text"
                  value={form.keyPointsTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="keyPoints" className="block text-sm font-semibold text-gray-800 mb-1">
                  Key Points (one per line)
                </label>
                <textarea
                  id="keyPoints"
                  name="keyPoints"
                  rows={4}
                  value={form.keyPoints}
                  onChange={handleChange}
                  placeholder="Add your first key point here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent resize-y"
                />
              </div>
            </SectionCard>

            <SectionCard title="4) Second H2 + Right Image">
              <div>
                <label htmlFor="secondH2Heading" className="block text-sm font-semibold text-gray-800 mb-1">
                  Second H2 Heading
                </label>
                <input
                  id="secondH2Heading"
                  name="secondH2Heading"
                  type="text"
                  value={form.secondH2Heading}
                  onChange={handleChange}
                  placeholder="Second H2 With Right Side Image"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="secondH2Text" className="block text-sm font-semibold text-gray-800 mb-1">
                  Second H2 Content
                </label>
                <textarea
                  id="secondH2Text"
                  name="secondH2Text"
                  rows={3}
                  value={form.secondH2Text}
                  onChange={handleChange}
                  placeholder="Second section content..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent resize-y"
                />
              </div>
              <div>
                <label htmlFor="secondSectionImage" className="block text-sm font-semibold text-gray-800 mb-1">
                  Second Section Right Side Image
                </label>
                <input
                  id="secondSectionImage"
                  name="secondSectionImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
            </SectionCard>

            <SectionCard title="5) Third H2 + Bottom Quick Tips Box">
              <div>
                <label htmlFor="thirdH2Heading" className="block text-sm font-semibold text-gray-800 mb-1">
                  Third H2 Heading
                </label>
                <input
                  id="thirdH2Heading"
                  name="thirdH2Heading"
                  type="text"
                  value={form.thirdH2Heading}
                  onChange={handleChange}
                  placeholder="Third H2 Section Heading"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="thirdH2Text" className="block text-sm font-semibold text-gray-800 mb-1">
                  Third H2 Content
                </label>
                <textarea
                  id="thirdH2Text"
                  name="thirdH2Text"
                  rows={3}
                  value={form.thirdH2Text}
                  onChange={handleChange}
                  placeholder="Third section content..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent resize-y"
                />
              </div>
              <div>
                <label htmlFor="quickTipsTitle" className="block text-sm font-semibold text-gray-800 mb-1">
                  Bottom Quick Tips Box Title
                </label>
                <input
                  id="quickTipsTitle"
                  name="quickTipsTitle"
                  type="text"
                  value={form.quickTipsTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="quickTips" className="block text-sm font-semibold text-gray-800 mb-1">
                  Bottom Quick Tips (one per line)
                </label>
                <textarea
                  id="quickTips"
                  name="quickTips"
                  rows={4}
                  value={form.quickTips}
                  onChange={handleChange}
                  placeholder="Use this area for tips, warnings, or fast notes"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent resize-y"
                />
              </div>
            </SectionCard>

            <SectionCard
              title="6) Listing / SEO Fields (Optional)"
              subtitle="Used mostly for blog listing cards and backward compatibility."
            >
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
                  Legacy full content (optional)
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={6}
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Optional fallback text for old-style post rendering"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent resize-y"
                />
              </div>
            </SectionCard>

            <SectionCard title="7) Meta">
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
            </SectionCard>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-lv-red hover:bg-lv-red-dark disabled:opacity-60 text-white font-semibold rounded-lg transition-colors"
              >
                {loading ? (editId ? "Updating…" : "Adding…") : (editId ? "Update blog post" : "Add blog post")}
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
