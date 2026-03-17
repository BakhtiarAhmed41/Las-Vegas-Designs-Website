"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import TopTicker from "@/app/components/TopPicker/TopPicker";
import Navbar from "@/app/components/Navbar/Navbar3";
import Footer from "@/app/components/Footer/Footer";
import GoUp from "@/app/components/Buttons/GoUp";
import ChatButton from "@/app/components/Buttons/ChatButton";

export default function ManageDesignsPage() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchDesigns = () => {
    setLoading(true);
    setError("");
    fetch("/api/designs?manage=1&limit=100")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setDesigns([]);
        } else {
          setDesigns(data.designs || []);
        }
      })
      .catch(() => {
        setError("Failed to load designs");
        setDesigns([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/designs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setDesigns((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = search.trim()
    ? designs.filter(
        (d) =>
          d.title?.toLowerCase().includes(search.toLowerCase()) ||
          d.slug?.toLowerCase().includes(search.toLowerCase())
      )
    : designs;

  return (
    <main className="bg-white min-h-screen">
      <TopTicker />
      <Navbar />

      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Manage Designs
              </h1>
              <p className="text-gray-600 mt-1">
                Edit or delete designs from the Design Library.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/design/add"
                className="inline-flex items-center px-4 py-2 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg"
              >
                Add design
              </Link>
              <Link
                href="/design"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-50"
              >
                View library
              </Link>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="mb-6">
            <input
              type="search"
              placeholder="Search by title or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red focus:border-transparent"
            />
          </div>

          {loading ? (
            <p className="text-gray-500">Loading designs…</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500">
              {designs.length === 0
                ? "No designs yet. Add one from the link above."
                : "No designs match your search."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">
                      Preview
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">
                      Title
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">
                      Date
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-800">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filtered.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                          {d.main_preview_url ? (
                            <Image
                              src={d.main_preview_url}
                              alt=""
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-gray-400">
                              No image
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-800 line-clamp-2">
                          {d.title}
                        </span>
                        <span className="text-xs text-gray-500 block mt-0.5">
                          /{d.slug}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                            d.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {d.main_category_name || "—"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {d.created_at
                          ? new Date(d.created_at).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/design/${d.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-600 hover:text-lv-red"
                          >
                            View
                          </Link>
                          <Link
                            href={`/design/edit/${d.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-50"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(d.id, d.title)}
                            disabled={deletingId === d.id}
                            className="inline-flex items-center px-3 py-1.5 border border-red-300 text-red-700 text-sm font-medium rounded-lg hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingId === d.id ? "Deleting…" : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
