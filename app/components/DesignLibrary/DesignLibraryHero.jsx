"use client";

import React from "react";

export default function DesignLibraryHero({ activeAccess, onAccessChange }) {
  const tabs = [
    { id: "all", label: "Browse all designs" },
    { id: "free", label: "Free designs" },
    { id: "premium", label: "Premium designs" },
  ];

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <h1 className="text-lv-blue font-bold text-3xl md:text-4xl lg:text-5xl mb-3">
          Design Library
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mb-6">
          Browse ready to use files for embroidery, printing, SVG, and laser projects. Use the filters on the left to narrow results in seconds.
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onAccessChange(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activeAccess === tab.id
                  ? "bg-lv-blue text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="font-medium">1,300+ Designs</span>
          <span>Instant Download</span>
          <span>Production Ready</span>
        </div>
      </div>
    </section>
  );
}
