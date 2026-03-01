"use client";

import React from "react";
import { FiLayers, FiPrinter, FiStar, FiZap } from "react-icons/fi";

const categories = [
  {
    slug: "embroidery",
    name: "Embroidery designs",
    description: "Hats, left chest, patches, applique, and clean stitch files.",
    icon: FiLayers,
    linkLabel: "Explore embroidery",
  },
  {
    slug: "print",
    name: "Print designs",
    description: "DTF, sublimation, stickers, posters, and high resolution PNG.",
    icon: FiPrinter,
    linkLabel: "Explore print",
  },
  {
    slug: "svg-cricut",
    name: "SVG and Cricut files",
    description: "Vinyl decals, layered crafts, signs, and cut ready SVG.",
    icon: FiStar,
    linkLabel: "Explore SVG files",
  },
  {
    slug: "laser-cnc",
    name: "Laser and CNC cut files",
    description: "Layered cut files, engraving plus cut, and DXF ready files.",
    icon: FiZap,
    linkLabel: "Explore laser files",
  },
];

export default function CategoryCards({ onSelectCategory }) {
  return (
    <section className="bg-gray-50 py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.slug}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-lv-red-pale text-lv-red">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">{cat.name}</h2>
                </div>
                <p className="text-gray-600 text-sm mb-4">{cat.description}</p>
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.slug)}
                  className="text-lv-red font-semibold text-sm hover:underline"
                >
                  {cat.linkLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
