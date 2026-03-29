"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TopTicker from "@/app/components/TopPicker/TopPicker";
import Navbar from "@/app/components/Navbar/Navbar3";
import Footer from "@/app/components/Footer/Footer";
import GoUp from "@/app/components/Buttons/GoUp";
import ChatButton from "@/app/components/Buttons/ChatButton";

export default function ManagePortfolioPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchItems = () => {
    setLoading(true);
    setError("");
    fetch("/api/portfolio?status=all&manage=1&limit=200&page=1")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setItems(data.items || []);
      })
      .catch(() => {
        setError("Failed to load portfolio projects");
        setItems([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = search.trim()
    ? items.filter(
        (p) =>
          p.title?.toLowerCase().includes(search.toLowerCase()) ||
          p.slug?.toLowerCase().includes(search.toLowerCase()) ||
          p.category?.toLowerCase().includes(search.toLowerCase())
      )
    : items;

  return (
    <main className="bg-white min-h-screen">
      <TopTicker />
      <Navbar />

      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Portfolio</h1>
              <p className="text-gray-600 mt-1">Edit or delete portfolio projects.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/portfolio/add"
                className="inline-flex items-center px-4 py-2 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg"
              >
                Add project
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-50"
              >
                View portfolio
              </Link>
            </div>
          </div>

          {error && <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}

          <div className="mb-6">
            <input
              type="search"
              placeholder="Search by title, slug, or category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red focus:border-transparent"
            />
          </div>

          {loading ? (
            <p className="text-gray-500">Loading projects…</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500">
              {items.length === 0 ? "No portfolio projects yet." : "No projects match your search."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">Preview</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">Title</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">Categories</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filtered.map((p) => {
                    const thumb = p.final_result_url || p.customer_file_url;
                    return (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 align-middle">
                          <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center relative">
                            {thumb ? (
                              <Image
                                src={thumb}
                                alt=""
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                                unoptimized={thumb.startsWith("http")}
                              />
                            ) : (
                              <span className="text-xs text-gray-400">No image</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 align-middle">
                          <span className="font-medium text-gray-800 line-clamp-2">{p.title}</span>
                          <span className="text-xs text-gray-500 block mt-0.5">/{p.slug}</span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 max-w-[220px]">
                          <span className="line-clamp-2">{p.category || "—"}</span>
                        </td>
                        <td className="py-3 px-4 align-middle">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                              p.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-amber-100 text-amber-900"
                            }`}
                          >
                            {p.status || "—"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right align-middle">
                          <div className="flex items-center justify-end gap-2 flex-wrap">
                            <Link
                              href="/portfolio"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-gray-600 hover:text-lv-red"
                            >
                              View portfolio
                            </Link>
                            <Link
                              href={`/portfolio/add?edit=${p.id}`}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-50"
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(p.id, p.title)}
                              disabled={deletingId === p.id}
                              className="inline-flex items-center px-3 py-1.5 border border-red-300 text-red-700 text-sm font-medium rounded-lg hover:bg-red-50 disabled:opacity-50"
                            >
                              {deletingId === p.id ? "Deleting…" : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}
