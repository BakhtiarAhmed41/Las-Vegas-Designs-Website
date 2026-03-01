"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "design-library-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

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

  const addItem = useCallback((design) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.design_id === design.id);
      if (existing) return prev;
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
  }, []);

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
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
