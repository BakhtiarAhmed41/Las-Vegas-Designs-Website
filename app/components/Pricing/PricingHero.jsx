"use client";

import React from "react";
import Link from "next/link";

export default function PricingHero({
  badge = "Pricing",
  title,
  intro,
  tabs = [],
  activeIndex = 0,
  tip,
  features = [],
}) {
  return (
    <header className="mb-10 md:mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8">
        <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
          {badge}
        </span>

        <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-lv-blue">
          {title}
        </h1>

        {intro && (
          <p className="mt-4 max-w-3xl text-sm md:text-base text-slate-600">
            {intro}
          </p>
        )}

        {/* Tabs (pill container with small inner pills) */}
        {tabs && tabs.length > 0 && (
          <div className="mt-8 inline-flex items-center bg-slate-100 rounded-full p-1 border border-slate-300 gap-2">
            {tabs.map((t, i) => (
              <Link
                key={t.href}
                href={t.href}
                className={`inline-flex items-center flex-none whitespace-nowrap px-4 py-2 text-sm transition-all border rounded-full ${
                  i === activeIndex
                    ? "bg-lv-red text-white font-semibold shadow-sm border-lv-red/40 ring-1 ring-lv-red/10 relative z-10"
                    : "bg-slate-200 text-slate-700 font-medium border-slate-300"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </div>
        )}

        {/* Tip */}
        {tip && (
          <div className="mt-6 inline-flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 shadow-sm">
            <span className="text-2xl flex-shrink-0">💡</span>
            <p className="text-sm text-slate-700">
              <strong className="text-amber-900">Tip:</strong> {tip}
            </p>
          </div>
        )}
      </div>

      {/* Right features box */}
      <div className="lg:col-span-4 flex justify-end">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 w-full max-w-md">
          <div className="space-y-5">
            {features.map((f, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-lv-red rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {f.badge}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lv-blue text-sm mb-1">{f.label}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
