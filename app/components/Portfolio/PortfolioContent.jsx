"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems, PORTFOLIO_FILTERS } from "@/app/data/portfolio/portfolioItems";
import { IoClose } from "react-icons/io5";

export default function PortfolioContent() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setLightboxItem(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const filteredItems = useMemo(() => {
    let items = portfolioItems;

    if (activeFilter !== "all") {
      items = items.filter((item) => item.categoryId === activeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.searchTerms && item.searchTerms.toLowerCase().includes(q))
      );
    }

    return items;
  }, [activeFilter, search]);

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-10 md:py-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h1 className="text-gray-800 font-bold text-3xl md:text-4xl lg:text-5xl mb-3">
            Portfolio
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mb-8">
            Browse real work delivered to clients. Click any tile to open a case view with specs, formats, and the outcome.
          </p>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Search hat logo, left chest, patch, truck, SVG, laser"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
            />
            <button
              type="button"
              className="px-6 py-3 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg transition-colors shrink-0"
            >
              Search
            </button>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {PORTFOLIO_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === f.id
                    ? "bg-lv-blue text-white"
                    : "bg-white text-gray-600 border border-gray-300 hover:border-gray-400"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio grid */}
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div
                  className="relative aspect-square bg-gray-200 group cursor-pointer"
                  onClick={() => setLightboxItem(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Hover overlay - title & category at bottom */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <div className="space-y-1 mb-3">
                      <h3 className="text-white font-semibold text-lg leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-white/90 text-sm">{item.category}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxItem(item);
                      }}
                      className="self-start px-5 py-2.5 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end items-center px-4 py-3 bg-gray-100 border-t border-gray-200">
                  {item.formats.map((fmt) => (
                    <span
                      key={fmt}
                      className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <p className="text-center text-gray-500 py-12">No portfolio items match your search or filter.</p>
          )}
        </div>
      </section>

      {/* CTA section - full width card */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200/80 p-8 md:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-lv-blue font-bold text-2xl md:text-3xl mb-3">
                  Want something similar for your project
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

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label="View portfolio image"
        >
          <button
            type="button"
            onClick={() => setLightboxItem(null)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            aria-label="Close"
          >
            <IoClose size={28} />
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxItem.image}
              alt={lightboxItem.title}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg text-white">
              <h3 className="font-semibold text-lg">{lightboxItem.title}</h3>
              <p className="text-white/90 text-sm">{lightboxItem.category}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {lightboxItem.formats.map((fmt) => (
                  <span key={fmt} className="px-2 py-1 bg-white/20 rounded text-xs">
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
