"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import TopTicker from "@/app/components/TopPicker/TopPicker";
import Navbar from "@/app/components/Navbar/Navbar3";
import Footer from "@/app/components/Footer/Footer";
import GoUp from "@/app/components/Buttons/GoUp";
import ChatButton from "@/app/components/Buttons/ChatButton";
import { useCart } from "@/app/context/CartContext";

function OrderPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const id = params?.id;
  const paid = searchParams?.get("paid");
  const [order, setOrder] = useState(null);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/orders/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setOrder(data.order || null);
        setDownloads(data.downloads || []);
        if (data.order?.status === "paid") clearCart();
      })
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id, clearCart]);

  if (loading) {
    return (
      <main className="bg-white min-h-screen">
        <TopTicker />
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-16 text-center text-gray-500">Loading order…</div>
        <Footer />
        <GoUp />
        <ChatButton />
      </main>
    );
  }

  if (!order) {
    return (
      <main className="bg-white min-h-screen">
        <TopTicker />
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 mb-4">Order not found.</p>
          <Link href="/design" className="text-lv-red font-semibold hover:underline">Back to Design Library</Link>
        </div>
        <Footer />
        <GoUp />
        <ChatButton />
      </main>
    );
  }

  const isPaid = order.status === "paid";

  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      <section className="py-10 md:py-14">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isPaid ? "Thank you for your order" : "Order #" + order.id}
          </h1>
          <p className="text-gray-600 mb-6">
            {isPaid
              ? "Your payment was successful. Download your designs below."
              : paid === "1"
                ? "Your payment is being processed. This page will update when complete."
                : "Complete your payment to access downloads."}
          </p>

          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-6">
            <p className="font-medium text-gray-800">Order #{order.id}</p>
            <p className="text-sm text-gray-600">{order.email}</p>
            <p className="text-lv-red font-semibold mt-1">${Number(order.total).toFixed(2)}</p>
          </div>

          {isPaid && downloads.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-semibold text-gray-800">Downloads</h2>
              <ul className="space-y-2">
                {downloads.map((d) => (
                  <li key={d.token} className="flex items-center justify-between gap-4 py-2 border-b border-gray-200">
                    <span className="text-gray-800">{d.design_title || "Design"}</span>
                    <a
                      href={`/api/download?token=${d.token}`}
                      className="text-lv-red font-medium hover:underline shrink-0"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href="/design"
            className="inline-block mt-8 px-6 py-3 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg transition-colors"
          >
            Back to Design Library
          </Link>
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <main className="bg-white min-h-screen">
        <TopTicker />
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-16 text-center text-gray-500">Loading…</div>
        <Footer />
        <GoUp />
        <ChatButton />
      </main>
    }>
      <OrderPageContent />
    </Suspense>
  );
}
