"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import TopTicker from "@/app/components/TopPicker/TopPicker";
import Navbar from "@/app/components/Navbar/Navbar3";
import Footer from "@/app/components/Footer/Footer";
import GoUp from "@/app/components/Buttons/GoUp";
import ChatButton from "@/app/components/Buttons/ChatButton";
import {
  PORTFOLIO_CATEGORIES,
  normalizeCategoryIds,
} from "@/lib/portfolioCategories";
import { uploadFileToDesignsBucket } from "@/lib/uploadToDesignsStorage";

const emptyForm = {
  title: "",
  category_ids: [],
  description: "",
  customer_file_url: "",
  final_result_url: "",
  extra_image_url: "",
  tags: [],
  overview: "",
  service: "",
  used_for: "",
  formats: "",
  project_type: "",
  sort_order: 0,
  status: "published",
};

function PortfolioAddPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [form, setForm] = useState(emptyForm);
  const [tagInput, setTagInput] = useState("");
  const [uploading, setUploading] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editId) {
      fetch(`/api/portfolio/${editId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.error) { setError(data.error); return; }
          setForm({
            title: data.title || "",
            category_ids:
              normalizeCategoryIds(data.category_ids).length > 0
                ? normalizeCategoryIds(data.category_ids)
                : data.category_id
                  ? [data.category_id]
                  : [],
            description: data.description || "",
            customer_file_url: data.customer_file_url || "",
            final_result_url: data.final_result_url || "",
            extra_image_url: data.extra_image_url || "",
            tags: Array.isArray(data.tags) ? data.tags : [],
            overview: data.overview || "",
            service: data.service || "",
            used_for: data.used_for || "",
            formats: data.formats || "",
            project_type: data.project_type || "",
            sort_order: data.sort_order || 0,
            status: data.status || "published",
          });
        })
        .catch(() => setError("Failed to load portfolio item"));
    }
  }, [editId]);

  const uploadFile = async (file, field) => {
    if (!file?.size) return;
    setUploading(field);
    try {
      const { url } = await uploadFileToDesignsBucket(file);
      setForm((prev) => ({ ...prev, [field]: url }));
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(null);
    }
  };

  const toggleCategory = (id) => {
    setForm((prev) => {
      const set = new Set(prev.category_ids);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...prev, category_ids: Array.from(set) };
    });
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, t] }));
    }
    setTagInput("");
  };

  const removeTag = (tag) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) { setError("Title is required"); return; }
    if (!form.category_ids?.length) { setError("Select at least one category"); return; }
    setError("");
    setLoading(true);
    try {
      const url = editId ? `/api/portfolio/${editId}` : "/api/portfolio";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      router.push("/portfolio");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen">
      <TopTicker />
      <Navbar />

      <section className="py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {editId ? "Edit Portfolio Item" : "Add Portfolio Item"}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/portfolio/manage" className="text-gray-700 font-semibold hover:text-lv-red hover:underline">
                Manage projects
              </Link>
              <Link href="/portfolio" className="text-lv-red font-semibold hover:underline">
                ← Back to Portfolio
              </Link>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
          )}

          <div className="space-y-8 bg-white rounded-xl border border-gray-200 p-6 md:p-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Customer Logo to Embroidery Result"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Categories * (select one or more)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50/80">
                  {PORTFOLIO_CATEGORIES.map((c) => (
                    <label
                      key={c.id}
                      className="flex items-center gap-2.5 cursor-pointer text-sm text-gray-800 hover:text-lv-red"
                    >
                      <input
                        type="checkbox"
                        checked={form.category_ids.includes(c.id)}
                        onChange={() => toggleCategory(c.id)}
                        className="rounded border-gray-300 text-lv-red focus:ring-lv-red"
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Short Description</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="One line about the project"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
              />
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Customer File Image</label>
                {form.customer_file_url && (
                  <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
                    <Image src={form.customer_file_url} alt="Customer file" fill className="object-cover" unoptimized />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f, "customer_file_url"); }}
                  className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg file:mr-4 file:px-4 file:py-2.5 file:rounded-l-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:font-medium hover:file:bg-gray-200"
                />
                <p className="text-xs text-gray-500 mt-1">Upload JPG, PNG, or WebP image</p>
                {uploading === "customer_file_url" && <p className="text-xs text-lv-red mt-1">Uploading…</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Final Result Image</label>
                {form.final_result_url && (
                  <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
                    <Image src={form.final_result_url} alt="Final result" fill className="object-cover" unoptimized />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f, "final_result_url"); }}
                  className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg file:mr-4 file:px-4 file:py-2.5 file:rounded-l-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:font-medium hover:file:bg-gray-200"
                />
                <p className="text-xs text-gray-500 mt-1">Upload JPG, PNG, or WebP image</p>
                {uploading === "final_result_url" && <p className="text-xs text-lv-red mt-1">Uploading…</p>}
              </div>
            </div>

            <div className="border border-dashed border-gray-300 rounded-xl p-4 md:p-5 bg-gray-50/50">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Additional image (optional)</label>
              <p className="text-xs text-gray-500 mb-3">
                This image is not used on the portfolio card. It appears at the bottom of the project detail view, after all text details.
              </p>
              {form.extra_image_url && (
                <div className="relative w-full max-w-lg aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <Image src={form.extra_image_url} alt="Additional project image" fill className="object-cover" unoptimized />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f, "extra_image_url"); }}
                className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg file:mr-4 file:px-4 file:py-2.5 file:rounded-l-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:font-medium hover:file:bg-gray-200"
              />
              {uploading === "extra_image_url" && <p className="text-xs text-lv-red mt-1">Uploading…</p>}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-700">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700 text-xs ml-1">✕</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                  placeholder="Type a tag and press Enter"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-lv-red"
                />
                <button type="button" onClick={addTag} className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200">
                  Add
                </button>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Project Overview</label>
                  <textarea
                    value={form.overview}
                    onChange={(e) => setForm((p) => ({ ...p, overview: e.target.value }))}
                    rows={4}
                    placeholder="Describe the project, what the customer needed and what was delivered"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red resize-y"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Service</label>
                    <input
                      type="text"
                      value={form.service}
                      onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                      placeholder="e.g. Embroidery Digitizing"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Used For</label>
                    <input
                      type="text"
                      value={form.used_for}
                      onChange={(e) => setForm((p) => ({ ...p, used_for: e.target.value }))}
                      placeholder="e.g. Caps, polos, uniforms"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Formats</label>
                    <input
                      type="text"
                      value={form.formats}
                      onChange={(e) => setForm((p) => ({ ...p, formats: e.target.value }))}
                      placeholder="e.g. DST, PES, EMB"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Project Type</label>
                    <input
                      type="text"
                      value={form.project_type}
                      onChange={(e) => setForm((p) => ({ ...p, project_type: e.target.value }))}
                      placeholder="e.g. Logo cleanup and stitch ready conversion"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Sort */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Sort Order</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm((p) => ({ ...p, sort_order: Number(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg disabled:opacity-60 transition-colors"
              >
                {loading ? "Saving…" : editId ? "Update" : "Publish"}
              </button>
              <Link
                href="/portfolio"
                className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}

export default function AddPortfolioPage() {
  return (
    <Suspense
      fallback={
        <main className="bg-white min-h-screen">
          <TopTicker />
          <Navbar />
          <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-500">
            Loading…
          </div>
          <Footer />
          <GoUp />
          <ChatButton />
        </main>
      }
    >
      <PortfolioAddPageContent />
    </Suspense>
  );
}
