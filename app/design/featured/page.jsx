 "use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import TopTicker from "@/app/components/TopPicker/TopPicker";
import Navbar from "@/app/components/Navbar/Navbar3";
import Footer from "@/app/components/Footer/Footer";
import GoUp from "@/app/components/Buttons/GoUp";
import ChatButton from "@/app/components/Buttons/ChatButton";
import DesignGrid from "@/app/components/DesignLibrary/DesignGrid";

const LIMIT = 20;

function FeaturedDesignsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [designs, setDesigns] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");
  const debounceRef = useRef(null);

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const sort = searchParams.get("sort") || "newest";
  const search = searchParams.get("search") || "";

  const replaceWithParams = (next) => {
    const q = next.toString();
    router.replace(q ? `/design/featured?${q}` : "/design/featured", { scroll: false });
  };

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value === "" || value == null) next.delete(key);
    else next.set(key, value);
    next.delete("page");
    replaceWithParams(next);
  };

  const onSearchChange = (value) => setLocalSearch(value);
  const onSortChange = (value) => setParam("sort", value || "newest");
  const onPageChange = (nextPage) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("page", String(nextPage));
    replaceWithParams(next);
  };

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setParam("search", localSearch || "");
    }, 500);
    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("featured", "1");
    params.set("page", String(page));
    params.set("limit", String(LIMIT));
    params.set("sort", sort);
    if (search) params.set("search", search);
    fetch(`/api/designs?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setDesigns(data.designs || []);
        setTotal(Number(data.total || 0));
      })
      .catch(() => {
        setDesigns([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [page, sort, search]);

  return (
    <main className="bg-white min-h-screen">
      <TopTicker />
      <Navbar />

      <section className="py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Featured designs</h1>
              <p className="text-gray-600 text-sm mt-1">Browse all featured designs in one place.</p>
            </div>
            <Link href="/design" className="text-lv-red font-semibold hover:underline">
              Back to design library
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-500 py-12">Loading featured designs…</p>
          ) : (
            <DesignGrid
              designs={designs}
              total={total}
              page={page}
              limit={LIMIT}
              search={localSearch}
              onSearchChange={onSearchChange}
              sort={sort}
              onSortChange={onSortChange}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}

function FeaturedDesignsPageFallback() {
  return (
    <main className="bg-white min-h-screen">
      <TopTicker />
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-4 py-16 text-center text-gray-500">Loading…</div>
      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}

export default function FeaturedDesignsPage() {
  return (
    <Suspense fallback={<FeaturedDesignsPageFallback />}>
      <FeaturedDesignsPageContent />
    </Suspense>
  );
}
