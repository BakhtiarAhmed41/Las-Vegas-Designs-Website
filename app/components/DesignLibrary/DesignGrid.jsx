"use client";

import React, { useState, useEffect, useRef } from "react";
import DesignCard from "./DesignCard";

export default function DesignGrid({
  designs,
  total,
  page,
  limit,
  search,
  onSearchChange,
  sort,
  onSortChange,
  onPageChange,
  onAddToCart,
}) {
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const [localSearch, setLocalSearch] = useState(search);
  const debounceRef = useRef(null);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const handleSearchChange = (value) => {
    setLocalSearch(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearchChange(value);
    }, 500);
  };

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder="Search designs, themes, formats..."
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-1 min-w-0 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
        />
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-lv-red"
        >
          <option value="newest">Sort: Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {designs.map((design) => (
          <DesignCard key={design.id} design={design} />
        ))}
      </div>

      {designs.length === 0 && (
        <p className="text-center text-gray-500 py-12">No designs match your filters.</p>
      )}

      {total > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {start}-{end} of {total} designs
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
