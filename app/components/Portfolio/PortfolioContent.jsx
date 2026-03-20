"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { FiArrowRight } from "react-icons/fi";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "embroidery", label: "Embroidery" },
  { id: "vector", label: "Vector" },
  { id: "svg", label: "SVG and PNG" },
  { id: "cnc", label: "CNC and Laser" },
  { id: "hats", label: "Hats" },
  { id: "leftchest", label: "Left Chest" },
  { id: "jacketback", label: "Jacket Back" },
  { id: "vehicles", label: "Vehicles" },
  { id: "patches", label: "Patches" },
];

export default function PortfolioContent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [detailItem, setDetailItem] = useState(null);

  const fetchItems = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeFilter !== "all") params.set("category", activeFilter);
    if (search.trim()) params.set("search", search.trim());
    fetch(`/api/portfolio?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => setItems(data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [activeFilter, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setDetailItem(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (detailItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [detailItem]);

  const handleSearch = () => fetchItems();

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-50 pt-10 md:pt-14 pb-4 md:pb-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <span className="inline-block px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600 uppercase tracking-wider mb-5">
            Client Work
          </span>
          <h1 className="text-gray-800 font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            Portfolio
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-10">
            Browse real work delivered for embroidery digitizing, vector art, SVG and PNG files, laser cutting, and custom production requests. Click any project to open a case view with specs, formats, and final results.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto mb-8">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search hat logo, left chest, patch, truck, SVG, laser"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="px-8 py-3.5 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-xl transition-colors shrink-0"
            >
              Search
            </button>
          </div>

          <div className="flex gap-2 justify-center overflow-x-auto pb-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${activeFilter === f.id
                  ? "bg-lv-blue text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-300 hover:border-gray-400"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-gray-50 pt-4 md:pt-6 pb-10 md:pb-14">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-center text-gray-500 py-12">Loading portfolio…</p>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No portfolio items match your search or filter.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Side-by-side images */}
                  <div className="grid grid-cols-2 relative p-2.5 pb-0 gap-2">
                    <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
                      {item.customer_file_url ? (
                        <Image
                          src={item.customer_file_url}
                          alt="Customer file"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 18vw"
                          unoptimized={item.customer_file_url?.startsWith("http")}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                      )}
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-lv-red shadow-sm uppercase tracking-wide">
                        Customer File
                      </span>
                    </div>
                    <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
                      {item.final_result_url ? (
                        <Image
                          src={item.final_result_url}
                          alt="Final result"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 18vw"
                          unoptimized={item.final_result_url?.startsWith("http")}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                      )}
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-lv-blue text-white rounded text-[10px] font-bold shadow-sm uppercase tracking-wide">
                        Final Result
                      </span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center z-10">
                      <FiArrowRight className="text-gray-500" size={15} />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-4 pt-3.5 pb-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-lv-red mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-[15px] font-bold text-gray-800 mb-2.5 leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5 min-w-0">
                        {item.tags?.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 border border-gray-200 rounded-full text-xs text-gray-500 whitespace-nowrap">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setDetailItem(item)}
                        className="shrink-0 px-4 py-2 bg-lv-blue hover:bg-lv-blue-dark text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        View Project
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200/80 p-8 md:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-lv-blue font-bold text-2xl md:text-3xl mb-3">
                  Want something similar for your project?
                </h2>
                <p className="text-gray-600 mb-6">
                  Send your artwork, size, and use. We reply fast with a clean quote and a clear delivery plan.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-lv-red shrink-0">•</span>
                    <span>Fast turnaround, clear revision flow</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-lv-red shrink-0">•</span>
                    <span>Production safe files, clean formats delivered</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-lv-red shrink-0">•</span>
                    <span>Support for embroidery, SVG, vector, and laser</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/contact#quote-form"
                  className="inline-flex justify-center px-6 py-3.5 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg transition-colors"
                >
                  Get Free Quote
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex justify-center px-6 py-3.5 bg-white border border-gray-300 text-lv-blue font-semibold rounded-lg hover:border-gray-400 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {detailItem && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 overflow-y-auto"
          onClick={() => setDetailItem(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setDetailItem(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
              aria-label="Close"
            >
              <IoClose size={24} />
            </button>

            <div className="p-6 md:p-8">
              {/* Header */}
              <p className="text-xs font-bold uppercase tracking-wider text-lv-red mb-2">
                {detailItem.category}
              </p>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {detailItem.title}
              </h2>
              {detailItem.description && (
                <p className="text-gray-600 text-sm mb-4">{detailItem.description}</p>
              )}

              {/* Tags */}
              {detailItem.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {detailItem.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Side-by-side images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <p className="text-sm font-semibold text-gray-800 px-4 py-2.5 bg-gray-50 border-b border-gray-200">Customer File</p>
                  <div className="relative aspect-4/3 bg-gray-100">
                    {detailItem.customer_file_url ? (
                      <Image
                        src={detailItem.customer_file_url}
                        alt="Customer file"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        unoptimized={detailItem.customer_file_url?.startsWith("http")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                    )}
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <p className="text-sm font-semibold text-gray-800 px-4 py-2.5 bg-gray-50 border-b border-gray-200">Final Result</p>
                  <div className="relative aspect-4/3 bg-gray-100">
                    {detailItem.final_result_url ? (
                      <Image
                        src={detailItem.final_result_url}
                        alt="Final result"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        unoptimized={detailItem.final_result_url?.startsWith("http")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Overview + Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {detailItem.overview && (
                  <div className="rounded-xl border border-gray-200 p-5">
                    <h3 className="font-bold text-gray-800 mb-2">Project Overview</h3>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{detailItem.overview}</p>
                  </div>
                )}
                {(detailItem.service || detailItem.used_for || detailItem.formats || detailItem.project_type) && (
                  <div className="rounded-xl border border-gray-200 p-5">
                    <h3 className="font-bold text-lv-red mb-3">Project Details</h3>
                    <dl className="space-y-3 text-sm">
                      {detailItem.service && (
                        <div>
                          <dt className="font-semibold text-gray-800">Service</dt>
                          <dd className="text-gray-600">{detailItem.service}</dd>
                        </div>
                      )}
                      {detailItem.used_for && (
                        <div>
                          <dt className="font-semibold text-gray-800">Used For</dt>
                          <dd className="text-gray-600">{detailItem.used_for}</dd>
                        </div>
                      )}
                      {detailItem.formats && (
                        <div>
                          <dt className="font-semibold text-gray-800">Formats</dt>
                          <dd className="text-gray-600">{detailItem.formats}</dd>
                        </div>
                      )}
                      {detailItem.project_type && (
                        <div>
                          <dt className="font-semibold text-gray-800">Project Type</dt>
                          <dd className="text-gray-600">{detailItem.project_type}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
