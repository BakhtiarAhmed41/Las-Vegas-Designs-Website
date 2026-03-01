"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import TopTicker from "@/app/components/TopPicker/TopPicker";
import Navbar from "@/app/components/Navbar/Navbar3";
import Footer from "@/app/components/Footer/Footer";
import GoUp from "@/app/components/Buttons/GoUp";
import ChatButton from "@/app/components/Buttons/ChatButton";
import { useCart } from "@/app/context/CartContext";

export default function DesignDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [imageIndex, setImageIndex] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/designs/by-slug/${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setDesign)
      .catch(() => setDesign(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-white min-h-screen">
        <TopTicker />
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-500">Loading…</div>
        <Footer />
        <GoUp />
        <ChatButton />
      </main>
    );
  }

  if (!design) {
    return (
      <main className="bg-white min-h-screen">
        <TopTicker />
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Design not found</h1>
          <Link href="/design-library" className="text-lv-red font-semibold hover:underline">
            Back to Design Library
          </Link>
        </div>
        <Footer />
        <GoUp />
        <ChatButton />
      </main>
    );
  }

  const images = [design.main_preview_url, design.stitchout_url, design.mockup_url].filter(Boolean);
  const currentImage = images[imageIndex] || design.main_preview_url;

  const handleAddToCart = () => {
    addItem({
      id: design.id,
      title: design.title,
      slug: design.slug,
      price: design.price,
    });
  };

  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/design-library" className="inline-block text-gray-600 hover:text-lv-red text-sm font-medium mb-6">
            ← Back to Design Library
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt={design.alt_text || design.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={currentImage.startsWith("http")}
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageIndex(i)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 ${
                        imageIndex === i ? "border-lv-red" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                        unoptimized={url?.startsWith("http")}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <span
                className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2 ${
                  design.is_free ? "bg-green-600 text-white" : "bg-lv-red text-white"
                }`}
              >
                {design.is_free ? "FREE" : "PREMIUM"}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{design.title}</h1>
              <p className="text-xl font-semibold text-lv-red mb-6">
                {design.is_free ? "$0.00" : `$${Number(design.price).toFixed(2)}`}
              </p>

              {design.design_sizes?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Sizes included</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-2">Hoop</th>
                          <th className="text-left p-2">Width (in)</th>
                          <th className="text-left p-2">Height (in)</th>
                          <th className="text-left p-2">Stitches</th>
                        </tr>
                      </thead>
                      <tbody>
                        {design.design_sizes.map((s) => (
                          <tr key={s.id} className="border-t border-gray-200">
                            <td className="p-2">{s.hoop || "—"}</td>
                            <td className="p-2">{s.width_in != null ? s.width_in : "—"}</td>
                            <td className="p-2">{s.height_in != null ? s.height_in : "—"}</td>
                            <td className="p-2">{s.stitches != null ? s.stitches : "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {design.formats?.length > 0 && (
                <p className="text-sm text-gray-600 mb-6">
                  <span className="font-medium">Formats:</span> {design.formats.join(", ")}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {design.is_free ? (
                  <Link
                    href={`/api/download?design_id=${design.id}`}
                    className="inline-flex justify-center px-6 py-3 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg transition-colors"
                  >
                    Download
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex justify-center px-6 py-3 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg transition-colors"
                  >
                    Add to cart
                  </button>
                )}
                <Link
                  href="/design-library/cart"
                  className="inline-flex justify-center px-6 py-3 border border-gray-300 text-gray-800 font-semibold rounded-lg hover:border-gray-400 transition-colors"
                >
                  View cart
                </Link>
              </div>

              <p className="text-sm text-gray-500">
                <Link href="/contact" className="text-lv-red hover:underline">
                  Need custom embroidery digitizing? Contact us.
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex gap-4 border-b border-gray-200 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("description")}
                className={`pb-2 font-medium ${
                  activeTab === "description"
                    ? "text-lv-red border-b-2 border-lv-red"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={`pb-2 font-medium ${
                  activeTab === "reviews"
                    ? "text-lv-red border-b-2 border-lv-red"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Reviews (0)
              </button>
            </div>
            {activeTab === "description" && (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 whitespace-pre-wrap">
                  {design.description || "No description provided."}
                </p>
                <p className="text-sm text-gray-500 mt-2">Category: {design.main_category_name}</p>
              </div>
            )}
            {activeTab === "reviews" && (
              <p className="text-gray-500">Reviews coming soon.</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}
