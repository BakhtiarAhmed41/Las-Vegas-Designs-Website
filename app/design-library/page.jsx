"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TopTicker from "@/app/components/TopPicker/TopPicker";
import Navbar from "@/app/components/Navbar/Navbar3";
import Footer from "@/app/components/Footer/Footer";
import GoUp from "@/app/components/Buttons/GoUp";
import ChatButton from "@/app/components/Buttons/ChatButton";
import DesignLibraryHero from "@/app/components/DesignLibrary/DesignLibraryHero";
import CategoryCards from "@/app/components/DesignLibrary/CategoryCards";
import FilterSidebar from "@/app/components/DesignLibrary/FilterSidebar";
import DesignGrid from "@/app/components/DesignLibrary/DesignGrid";
import DesignCard from "@/app/components/DesignLibrary/DesignCard";
import Link from "next/link";

const LIMIT = 24;

function buildDesignsParams(searchParams) {
  const params = new URLSearchParams();
  const access = searchParams.get("access") || "all";
  if (access !== "all") params.set("access", access);
  const main = searchParams.get("main_category");
  if (main) params.set("main_category", main);
  const theme = searchParams.get("theme_id");
  if (theme) params.set("theme_id", theme.split(",")[0] || theme);
  const sub = searchParams.get("sub_theme_id");
  if (sub) params.set("sub_theme_id", sub);
  const search = searchParams.get("search");
  if (search) params.set("search", search);
  const sort = searchParams.get("sort") || "newest";
  params.set("sort", sort);
  const page = searchParams.get("page") || "1";
  params.set("page", page);
  params.set("limit", String(LIMIT));
  ["placement", "hoop_size", "style", "print_method", "design_style", "file_format", "background", "cut_type", "build_style", "svg_type", "layer_type"].forEach((key) => {
    const v = searchParams.get(key);
    if (v) params.set(key, v);
  });
  return params;
}

export default function DesignLibraryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filtersData, setFiltersData] = useState(null);
  const [filterOptions, setFilterOptions] = useState({});
  const [designs, setDesigns] = useState([]);
  const [total, setTotal] = useState(0);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(true);

  const access = searchParams.get("access") || "all";
  const mainCategory = searchParams.get("main_category") || "";
  const themeId = searchParams.get("theme_id") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "newest";

  const selectedMainCategories = mainCategory ? mainCategory.split(",").filter(Boolean) : [];
  const selectedThemeIds = themeId ? themeId.split(",").filter(Boolean) : [];
  const selectedSubThemeIds = (searchParams.get("sub_theme_id") || "").split(",").filter(Boolean);
  const selectedTechnical = {};
  [
    "placement",
    "hoop_size",
    "style",
    "print_method",
    "design_style",
    "file_format",
    "background",
    "cut_type",
    "build_style",
    "svg_type",
    "layer_type",
  ].forEach((key) => {
    const v = searchParams.get(key);
    if (v) selectedTechnical[`${key}:${v}`] = true;
  });

  const setParam = useCallback(
    (key, value) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value === "" || value == null) next.delete(key);
      else next.set(key, value);
      next.delete("page");
      const q = next.toString();
      router.replace(q ? `/design-library?${q}` : "/design-library", { scroll: false });
    },
    [searchParams, router]
  );

  const onAccessChange = (id) => setParam("access", id === "all" ? "" : id);
  const onSelectCategory = (slug) => {
    setParam("main_category", slug);
    const browseEl = document.getElementById("browse-all-designs");
    if (browseEl) browseEl.scrollIntoView({ behavior: "smooth" });
  };

  const onMainCategoryToggle = (slug) => {
    const next = selectedMainCategories.includes(slug)
      ? selectedMainCategories.filter((s) => s !== slug)
      : [...selectedMainCategories, slug];
    setParam("main_category", next.length ? next.join(",") : "");
  };

  const onThemeToggle = (id) => {
    const idStr = String(id);
    const next = selectedThemeIds.includes(idStr)
      ? selectedThemeIds.filter((s) => s !== idStr)
      : [...selectedThemeIds, idStr];
    setParam("theme_id", next.length ? next.join(",") : "");
  };

  const onSubThemeToggle = () => {}
  const onTechnicalToggle = (filterKey, value) => {
    const key = `${filterKey}:${value}`;
    const next = new URLSearchParams(searchParams.toString());
    if (selectedTechnical[key]) next.delete(filterKey);
    else next.set(filterKey, value);
    next.delete("page");
    const q = next.toString();
    router.replace(q ? `/design-library?${q}` : "/design-library", { scroll: false });
  };

  const onClear = () => router.replace("/design-library", { scroll: false });

  const onSearchChange = (v) => setParam("search", v);
  const onSortChange = (v) => setParam("sort", v);
  const onPageChange = (p) => setParam("page", String(p));

  useEffect(() => {
    const params = new URLSearchParams();
    if (mainCategory) params.set("main_category", mainCategory);
    if (themeId) params.set("theme_id", themeId);
    params.set("access", access);
    setFiltersLoading(true);
    fetch(`/api/designs/filters?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setFiltersData(data);
        setFiltersLoading(false);
      })
      .catch(() => setFiltersLoading(false));
  }, [mainCategory, themeId, access]);

  useEffect(() => {
    if (mainCategory) {
      fetch(`/api/filter-options?main_category=${encodeURIComponent(mainCategory)}`)
        .then((res) => res.json())
        .then(setFilterOptions)
        .catch(() => setFilterOptions({}));
    } else {
      setFilterOptions({});
    }
  }, [mainCategory]);

  useEffect(() => {
    const params = buildDesignsParams(searchParams);
    setLoading(true);
    fetch(`/api/designs?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setDesigns(data.designs || []);
        setTotal(data.total ?? 0);
        setLoading(false);
      })
      .catch(() => {
        setDesigns([]);
        setTotal(0);
        setLoading(false);
      });
  }, [searchParams.toString()]);

  useEffect(() => {
    fetch("/api/designs?limit=8&sort=newest")
      .then((res) => res.json())
      .then((data) => setFeatured((data.designs || []).filter((d) => d.is_featured).slice(0, 8)))
      .catch(() => setFeatured([]));
  }, []);

  const mainCategorySlug = selectedMainCategories[0] || mainCategory || "";

  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      <DesignLibraryHero activeAccess={access} onAccessChange={onAccessChange} />
      <CategoryCards onSelectCategory={onSelectCategory} />

      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured designs</h2>
            <Link
              href="#browse-all-designs"
              className="text-lv-red font-semibold hover:underline"
            >
              View all designs
            </Link>
          </div>
          <div className="overflow-x-auto pb-4 -mx-2">
            <div className="flex gap-4 min-w-max md:min-w-0 md:grid md:grid-cols-2 lg:grid-cols-4">
              {(featured.length ? featured : designs.slice(0, 4)).map((d) => (
                <div key={d.id} className="w-[280px] md:w-auto shrink-0">
                  <DesignCard design={d} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="browse-all-designs" className="py-8 md:py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Browse all designs</h2>
          <p className="text-gray-600 text-sm mb-6">
            General filters on this page. Select a main category to see advanced filters.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-4">
                {filtersLoading ? (
                  <p className="text-sm text-gray-500">Loading filters…</p>
                ) : (
                  <FilterSidebar
                    filtersData={filtersData}
                    filterOptions={filterOptions}
                    mainCategory={mainCategorySlug}
                    themeId={themeId}
                    selectedMainCategories={selectedMainCategories}
                    selectedThemeIds={selectedThemeIds}
                    selectedSubThemeIds={selectedSubThemeIds}
                    selectedTechnical={selectedTechnical}
                    onMainCategoryToggle={onMainCategoryToggle}
                    onThemeToggle={onThemeToggle}
                    onSubThemeToggle={onSubThemeToggle}
                    onTechnicalToggle={onTechnicalToggle}
                    onClear={onClear}
                  />
                )}
              </div>
            </div>
            <div className="lg:col-span-3">
              {loading ? (
                <p className="text-gray-500 py-12">Loading designs…</p>
              ) : (
                <DesignGrid
                  designs={designs}
                  total={total}
                  page={page}
                  limit={LIMIT}
                  search={search}
                  onSearchChange={onSearchChange}
                  sort={sort}
                  onSortChange={onSortChange}
                  onPageChange={onPageChange}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}
