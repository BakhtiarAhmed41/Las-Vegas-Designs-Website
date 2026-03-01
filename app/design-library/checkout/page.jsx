"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TopTicker from "@/app/components/TopPicker/TopPicker";
import Navbar from "@/app/components/Navbar/Navbar3";
import Footer from "@/app/components/Footer/Footer";
import GoUp from "@/app/components/Buttons/GoUp";
import ChatButton from "@/app/components/Buttons/ChatButton";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, count } = useCart();
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (items.length === 0 && count === 0) {
      router.replace("/design-library/cart");
    }
  }, [items.length, count, router]);

  const handleCreatePayment = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items: items.map((i) => ({ design_id: i.design_id, price: i.price, quantity: i.quantity || 1 })),
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.paymentMethod === "paypal" && data.approveUrl) {
        window.location.href = data.approveUrl;
        return;
      }
      if (data.paymentMethod === "stripe" && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setError("Invalid checkout response");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="bg-white min-h-screen">
        <TopTicker />
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link href="/design-library" className="text-lv-red font-semibold hover:underline">Browse designs</Link>
        </div>
        <Footer />
        <GoUp />
        <ChatButton />
      </main>
    );
  }

  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      <section className="py-10 md:py-14">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

          <div className="space-y-6 bg-white rounded-xl border border-gray-200 p-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Payment method</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pm"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                    className="text-lv-red"
                  />
                  <span>Card (Stripe)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pm"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    className="text-lv-red"
                  />
                  <span>PayPal</span>
                </label>
              </div>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <p className="text-gray-600 text-sm">Total: <strong className="text-lv-red">${total.toFixed(2)}</strong></p>
            <button
              type="button"
              onClick={handleCreatePayment}
              disabled={loading}
              className="w-full px-6 py-3 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg disabled:opacity-60"
            >
              {loading ? "Loading…" : paymentMethod === "paypal" ? "Continue to PayPal" : "Continue to payment"}
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}
