"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogContent({ initialPosts, categories }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [email, setEmail] = useState("");
  const [bottomEmail, setBottomEmail] = useState("");

  const filterPills = [
    { id: "all", label: "All posts" },
    ...(categories || []).map((c) => ({ id: c.name, label: c.name })),
  ];

  const filteredPosts = useMemo(() => {
    let posts = initialPosts || [];
    if (activeFilter !== "all") {
      posts = posts.filter((p) => p.category === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      posts = posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [initialPosts, activeFilter, search]);

  const featuredPosts = filteredPosts.slice(0, 2);
  const latestPosts = filteredPosts.slice(2, 8);

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-10 md:py-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h1 className="text-gray-800 font-bold text-3xl md:text-4xl lg:text-5xl mb-3">
            Practical guides for digitizing and vector work
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mb-8">
            Short production focused posts about embroidery digitizing. SVG, PNG vector, CNC and laser files.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Search posts, underlay, satin gaps, SVG naming"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
            />
            <button
              type="button"
              className="px-6 py-3 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg transition-colors shrink-0"
            >
              Search
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filterPills.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === f.id ? "bg-lv-blue text-white" : "bg-white text-gray-600 border border-gray-300 hover:border-gray-400"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main + Sidebar */}
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Featured blog - heading + two cards */}
              {featuredPosts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Posts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredPosts.map((post) => (
                      <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-md">
                        <Link href={`/blog/${post.slug}`} className="block">
                          <div className="relative aspect-video bg-gray-200">
                            <Image
                              src={post.featuredImage || "/assets/images/hat/stitch/hat embroidery logo digitizing sewout (12).png"}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        </Link>
                        <div className="p-5 md:p-6">
                          <p className="text-gray-500 text-sm mb-2">
                            {post.category} • {post.date} • {post.readTime}
                          </p>
                          <Link href={`/blog/${post.slug}`}>
                            <h3 className="text-lg md:text-xl font-bold text-gray-800 hover:text-lv-red transition-colors mb-2 line-clamp-2">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-block px-4 py-2.5 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg text-sm transition-colors"
                          >
                            Read article
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* Latest posts */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Latest posts</h2>
                  <p className="text-gray-600 text-sm">Short, clear guides for embroidery, print, SVG, and laser files.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {latestPosts.map((post) => (
                    <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                      <Link href={`/blog/${post.slug}`} className="block relative aspect-video bg-gray-200">
                        <Image
                          src={post.featuredImage || "/assets/images/hat/stitch/hat embroidery logo digitizing sewout (12).png"}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      </Link>
                      <div className="p-4 flex-1 flex flex-col">
                        <p className="text-gray-500 text-xs mb-1">{post.category} • {post.readTime}</p>
                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="font-semibold text-gray-800 hover:text-lv-red transition-colors line-clamp-2 mb-1">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm line-clamp-2 flex-1">{post.excerpt}</p>
                        <Link href={`/blog/${post.slug}`} className="text-lv-red font-medium text-sm mt-2 hover:underline">
                          Read
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              {filteredPosts.length === 0 && (
                <p className="text-center text-gray-500 py-12">No posts match your search or filter.</p>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Need a file today */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-200/80 p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Need a file today</h3>
                <p className="text-gray-600 text-sm mb-4">Send your logo and we will reply fast with a clean quote.</p>
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <Link href="/contact#quote-form" className="inline-flex justify-center px-4 py-2.5 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg text-sm transition-colors">
                    Get Free Quote
                  </Link>
                  <Link href="/contact" className="inline-flex justify-center px-4 py-2.5 bg-white border border-gray-300 text-gray-800 font-semibold rounded-lg text-sm hover:border-gray-400 transition-colors">
                    Contact
                  </Link>
                </div>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Embroidery digitizing</li>
                  <li>• Vector, SVG and PNG</li>
                  <li>• CNC and laser cut files</li>
                </ul>
              </div>

              {/* Get new posts by email */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-200/80 p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Get new posts by email</h3>
                <p className="text-gray-600 text-sm mb-4">One helpful tip at a time, no spam.</p>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-blue focus:border-transparent"
                  />
                  <button type="submit" className="w-full px-4 py-2.5 bg-lv-blue hover:bg-lv-blue/90 text-white font-semibold rounded-lg text-sm transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Browse by topic - categories from all posts (new categories from form appear here) */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-200/80 p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Browse by topic</h3>
                <ul className="space-y-2">
                  {(categories || []).map(({ name, count }) => (
                    <li key={name}>
                      <button
                        type="button"
                        onClick={() => setActiveFilter(activeFilter === name ? "all" : name)}
                        className={`text-left w-full px-3 py-2 rounded-lg text-sm transition-colors ${activeFilter === name ? "bg-lv-blue/10 text-lv-blue font-medium" : "text-gray-600 hover:bg-gray-100"
                          }`}
                      >
                        {name} ({count})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom email subscription - card layout */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200/80 p-8 md:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-lv-blue mb-2">
                  Get new posts and free resources
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Short tips on embroidery digitizing, vector cleanup, SVG prep, and laser file rules. We send updates only when we publish something useful.
                </p>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 shrink-0 sm:w-auto w-full lg:max-w-md">
                <input
                  type="email"
                  placeholder="Your email"
                  value={bottomEmail}
                  onChange={(e) => setBottomEmail(e.target.value)}
                  className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lv-red focus:border-transparent"
                />
                <button type="submit" className="px-6 py-3 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg transition-colors shrink-0">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
