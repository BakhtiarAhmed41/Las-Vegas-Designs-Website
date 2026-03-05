"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "design-library-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (_) {}
  }, [items]);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addItem = useCallback((design) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.design_id === design.id);
      if (existing) {
        showToast(`"${design.title}" is already in your cart`);
        return prev;
      }
      showToast(`"${design.title}" added to cart`);
      return [
        ...prev,
        {
          design_id: design.id,
          design_title: design.title,
          design_slug: design.slug,
          price: Number(design.price) || 0,
          quantity: 1,
        },
      ];
    });
  }, [showToast]);

  const removeItem = useCallback((designId) => {
    setItems((prev) => prev.filter((i) => i.design_id !== designId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        total,
        count: items.length,
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-9999 animate-[slideUp_0.3s_ease-out]">
          <div className="bg-gray-900 text-white px-5 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-3 max-w-sm">
            <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {toast}
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
