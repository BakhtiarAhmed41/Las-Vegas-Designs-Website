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

  const inputBase =
    "border-gray-300 text-lv-red focus:ring-lv-red shrink-0 h-4 w-4 lg:h-[1.125rem] lg:w-[1.125rem] xl:h-5 xl:w-5";

  return (
    <aside className="space-y-6 lg:space-y-8 text-[15px] lg:text-base">
      <div className="flex items-center justify-between gap-3">
        <span className="font-bold text-gray-900 text-lg lg:text-xl tracking-tight">Filters</span>
        <button
          type="button"
          onClick={onClear}
          className="text-sm lg:text-base text-lv-red font-semibold hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Free or Premium */}
      <div>
        <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3">Price</h3>
        <div className="space-y-2.5 lg:space-y-3">
          {[
            { id: "all", label: "All" },
            { id: "free", label: "Free" },
            { id: "premium", label: "Premium" },
          ].map((opt) => (
            <label key={opt.id} className="flex items-center gap-3 min-h-9 cursor-pointer py-0.5">
              <input
                type="radio"
                name="access"
                checked={activeAccess === opt.id}
                onChange={() => onAccessChange?.(opt.id)}
                className={inputBase}
              />
              <span className="text-gray-800 leading-snug">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Main category */}
      <div>
        <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3">Main category</h3>
        <div className="space-y-2 lg:space-y-2.5">
          {main_categories.map((mc) => (
            <label key={mc.id} className="flex items-center gap-3 min-h-9 cursor-pointer py-0.5">
              <input
                type="checkbox"
                checked={selectedMainCategories.includes(mc.slug)}
                onChange={() => onMainCategoryToggle(mc.slug)}
                className={`rounded ${inputBase}`}
              />
              <span className="text-gray-800 leading-snug flex-1 min-w-0">{mc.name}</span>
              <span className="text-gray-500 text-sm lg:text-base tabular-nums shrink-0">({mc.count ?? 0})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div>
        <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3">Theme</h3>
        <div className="space-y-1.5 lg:space-y-2">
          {themes.map((t) => (
            <div key={t.id}>
              <label className="flex items-center gap-3 min-h-9 cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={selectedThemeIds.includes(String(t.id))}
                  onChange={() => onThemeToggle(t.id)}
                  className={`rounded ${inputBase}`}
                />
                <span className="text-gray-800 leading-snug flex-1 min-w-0">{t.name}</span>
                <span className="text-gray-500 text-sm lg:text-base tabular-nums shrink-0">({t.count ?? 0})</span>
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
              <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 capitalize">
                {filterKey.replace(/_/g, " ")}
              </h3>
              <div className="space-y-2 lg:space-y-2.5">
                {options.map((opt) => {
                  const key = `${filterKey}:${opt.value}`;
                  const checked = selectedTechnical[key];
                  return (
                    <label key={key} className="flex items-center gap-3 min-h-9 cursor-pointer py-0.5">
                      <input
                        type="checkbox"
                        checked={!!checked}
                        onChange={() => onTechnicalToggle(filterKey, opt.value)}
                        className={`rounded ${inputBase}`}
                      />
                      <span className="text-gray-800 leading-snug flex-1 min-w-0">{opt.value}</span>
                      {opt.count != null && (
                        <span className="text-gray-500 text-sm lg:text-base tabular-nums shrink-0">({opt.count})</span>
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
