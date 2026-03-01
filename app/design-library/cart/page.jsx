"use client";

import React from "react";
import Link from "next/link";
import TopTicker from "@/app/components/TopPicker/TopPicker";
import Navbar from "@/app/components/Navbar/Navbar3";
import Footer from "@/app/components/Footer/Footer";
import GoUp from "@/app/components/Buttons/GoUp";
import ChatButton from "@/app/components/Buttons/ChatButton";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const { items, removeItem, total, count } = useCart();

  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      <section className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Cart</h1>

          {items.length === 0 ? (
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-600 mb-4">Your cart is empty.</p>
              <Link
                href="/design-library"
                className="inline-block px-6 py-3 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg transition-colors"
              >
                Browse designs
              </Link>
            </div>
          ) : (
            <>
              <ul className="space-y-4 mb-8">
                {items.map((item) => (
                  <li
                    key={item.design_id}
                    className="flex items-center justify-between gap-4 py-4 border-b border-gray-200"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.design_title}</p>
                      <p className="text-lv-red font-semibold">${Number(item.price).toFixed(2)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.design_id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-lg font-semibold text-gray-800">
                  Total: <span className="text-lv-red">${total.toFixed(2)}</span>
                </p>
                <Link
                  href="/design-library/checkout"
                  className="inline-flex justify-center px-6 py-3 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg transition-colors"
                >
                  Proceed to checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}
