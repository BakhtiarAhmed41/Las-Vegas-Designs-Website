"use client";

import React, { useState } from "react";

export default function FilterSidebar({
  filtersData,
  filterOptions,
  mainCategory,
  themeId,
  access,
  selectedMainCategories,
  selectedThemeIds,
  selectedSubThemeIds,
  selectedTechnical,
  onAccessChange,
  onMainCategoryToggle,
  onThemeToggle,
  onSubThemeToggle,
  onTechnicalToggle,
  onClear,
}) {
  const [expandedThemes, setExpandedThemes] = useState({});
  const main_categories = filtersData?.main_categories || [];
  const themes = filtersData?.themes || [];
  const sub_themes = filtersData?.sub_themes || [];
  const filter_options = filterOptions || {};
  const activeAccess = access || "all";

  const toggleTheme = (id) => {
    setExpandedThemes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-800">Filters</span>
        <button
          type="button"
          onClick={onClear}
          className="text-sm text-lv-red hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Free or Premium */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Price</h3>
        <div className="space-y-1.5">
          {[
            { id: "all", label: "All" },
            { id: "free", label: "Free" },
            { id: "premium", label: "Premium" },
          ].map((opt) => (
            <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="access"
                checked={activeAccess === opt.id}
                onChange={() => onAccessChange?.(opt.id)}
                className="border-gray-300 text-lv-red focus:ring-lv-red"
              />
              <span className="text-gray-700 text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Main category */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Main category</h3>
        <div className="space-y-1.5">
          {main_categories.map((mc) => (
            <label key={mc.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedMainCategories.includes(mc.slug)}
                onChange={() => onMainCategoryToggle(mc.slug)}
                className="rounded border-gray-300 text-lv-red focus:ring-lv-red"
              />
              <span className="text-gray-700 text-sm">{mc.name}</span>
              <span className="text-gray-500 text-xs ml-auto">({mc.count ?? 0})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Theme</h3>
        <div className="space-y-1">
          {themes.map((t) => (
            <div key={t.id}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedThemeIds.includes(String(t.id))}
                  onChange={() => onThemeToggle(t.id)}
                  className="rounded border-gray-300 text-lv-red focus:ring-lv-red"
                />
                <span className="text-gray-700 text-sm">{t.name}</span>
                <span className="text-gray-500 text-xs ml-auto">({t.count ?? 0})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Category-specific technical filters */}
      {mainCategory && Object.keys(filter_options).length > 0 && (
        <>
          {Object.entries(filter_options).map(([filterKey, options]) => (
            <div key={filterKey}>
              <h3 className="text-sm font-semibold text-gray-800 mb-2 capitalize">
                {filterKey.replace(/_/g, " ")}
              </h3>
              <div className="space-y-1.5">
                {options.map((opt) => {
                  const key = `${filterKey}:${opt.value}`;
                  const checked = selectedTechnical[key];
                  return (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!checked}
                        onChange={() => onTechnicalToggle(filterKey, opt.value)}
                        className="rounded border-gray-300 text-lv-red focus:ring-lv-red"
                      />
                      <span className="text-gray-700 text-sm">{opt.value}</span>
                      {opt.count != null && (
                        <span className="text-gray-500 text-xs ml-auto">({opt.count})</span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      )}
    </aside>
  );
}
