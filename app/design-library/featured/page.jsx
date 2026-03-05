"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import TopTicker from "@/app/components/TopPicker/TopPicker";
import Navbar from "@/app/components/Navbar/Navbar3";
import Footer from "@/app/components/Footer/Footer";

export default function FeaturedDesignsPage() {
  const [featuredDesigns, setFeaturedDesigns] = useState([]);
  const [allDesigns, setAllDesigns] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  const fetchFeatured = useCallback(() => {
    setLoadingFeatured(true);
    fetch("/api/designs?featured=1&limit=50&manage=1")
      .then((r) => r.json())
      .then((data) => {
        setFeaturedDesigns(data.designs || []);
        setLoadingFeatured(false);
      })
      .catch(() => setLoadingFeatured(false));
  }, []);

  const fetchAll = useCallback(() => {
    setLoadingAll(true);
    const params = new URLSearchParams({ limit: "50", manage: "1" });
    if (search.trim()) params.set("search", search.trim());
    fetch(`/api/designs?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setAllDesigns(data.designs || []);
        setLoadingAll(false);
      })
      .catch(() => setLoadingAll(false));
  }, [search]);

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const toggleFeatured = async (designId, makeFeatured) => {
    setTogglingId(designId);
    try {
      const res = await fetch(`/api/designs/${designId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_featured: makeFeatured }),
      });
      if (res.ok) {
        fetchFeatured();
        fetchAll();
      }
    } catch {
      // silently fail
    } finally {
      setTogglingId(null);
    }
  };

  const featuredIds = new Set(featuredDesigns.map((d) => d.id));
  const nonFeaturedDesigns = allDesigns.filter((d) => !featuredIds.has(d.id));

  return (
    <main className="bg-white min-h-screen">
      <TopTicker />
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Featured Designs</h1>
            <p className="text-gray-500 mt-1">Add or remove designs from the featured section on the Design Library page.</p>
          </div>
          <Link
            href="/design-library"
            className="text-sm text-lv-red hover:underline font-medium"
          >
            Back to Design Library
          </Link>
        </div>

        {/* Currently Featured */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
            Currently Featured ({featuredDesigns.length})
          </h2>

          {loadingFeatured ? (
            <p className="text-gray-400 py-6">Loading...</p>
          ) : featuredDesigns.length === 0 ? (
            <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
              No featured designs yet. Add designs from the list below.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featuredDesigns.map((d) => (
                <div
                  key={d.id}
                  className="border border-yellow-200 bg-yellow-50 rounded-lg overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-square bg-gray-100">
                    {d.main_preview_url ? (
                      <Image
                        src={d.main_preview_url}
                        alt={d.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="font-medium text-gray-800 text-sm truncate">{d.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {d.main_category_name || "—"} &middot; {d.status}
                    </p>
                    <button
                      onClick={() => toggleFeatured(d.id, false)}
                      disabled={togglingId === d.id}
                      className="mt-auto pt-3 text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50 text-left cursor-pointer"
                    >
                      {togglingId === d.id ? "Removing..." : "Remove from featured"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* All Designs */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            All Designs
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search designs by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lv-red/40"
            />
          </div>

          {loadingAll ? (
            <p className="text-gray-400 py-6">Loading...</p>
          ) : nonFeaturedDesigns.length === 0 ? (
            <p className="text-gray-400 py-6">
              {search.trim() ? "No designs match your search." : "All designs are already featured, or no designs exist."}
            </p>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Category</th>
                    <th className="px-4 py-3 hidden md:table-cell">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {nonFeaturedDesigns.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="relative w-12 h-12 rounded bg-gray-100 overflow-hidden shrink-0">
                          {d.main_preview_url ? (
                            <Image
                              src={d.main_preview_url}
                              alt={d.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px]">
                              —
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800 max-w-[200px] truncate">
                        {d.title}
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                        {d.main_category_name || "—"}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            d.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => toggleFeatured(d.id, true)}
                          disabled={togglingId === d.id}
                          className="px-3 py-1.5 bg-lv-red text-white text-xs font-medium rounded hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                        >
                          {togglingId === d.id ? "Adding..." : "Add to featured"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
