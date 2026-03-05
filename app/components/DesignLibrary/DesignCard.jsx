"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

export default function DesignCard({ design }) {
  const { addItem } = useCart();
  const imageUrl = design.main_preview_url || null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({
      id: design.id,
      title: design.title,
      slug: design.slug,
      price: design.price,
    });
  };
  const tags = [];
  if (design.technical_attributes?.placement) tags.push(design.technical_attributes.placement);
  if (design.technical_attributes?.hoop_size) tags.push(design.technical_attributes.hoop_size);
  if (design.theme_name) tags.push(design.theme_name);
  const displayTags = tags.slice(0, 3);

  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/design-library/design/${design.slug}`} className="block relative aspect-square bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={design.alt_text || design.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={imageUrl.startsWith("http")}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
        <span
          className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-semibold ${
            design.is_free ? "bg-green-600 text-white" : "bg-lv-red text-white"
          }`}
        >
          {design.is_free ? "FREE" : "PREMIUM"}
        </span>
        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-medium bg-white/90 text-gray-700">
          {design.main_category_name || "Design"}
        </span>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">
          <Link href={`/design-library/design/${design.slug}`} className="hover:text-lv-red transition-colors">
            {design.title}
          </Link>
        </h3>
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {displayTags.map((t) => (
              <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                {t}
              </span>
            ))}
          </div>
        )}
        <p className="text-lv-red font-semibold mb-2">
          {design.is_free ? "$0.00" : `$${Number(design.price).toFixed(2)}`}
        </p>
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/design-library/design/${design.slug}`}
            className="flex-1 text-center px-3 py-2 border border-gray-300 text-gray-800 font-medium rounded-lg text-sm hover:border-gray-400 transition-colors"
          >
            View
          </Link>
          {design.is_free ? (
            <Link
              href={`/design-library/design/${design.slug}`}
              className="flex-1 text-center px-3 py-2 bg-lv-red hover:bg-lv-red-dark text-white font-medium rounded-lg text-sm transition-colors"
            >
              Download
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 px-3 py-2 bg-lv-red hover:bg-lv-red-dark text-white font-medium rounded-lg text-sm transition-colors"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
