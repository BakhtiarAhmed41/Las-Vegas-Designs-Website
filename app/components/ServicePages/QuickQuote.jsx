"use client";

import React from "react";
import Link from "next/link";
import ServiceLabel from "../UI/ServiceLabel";
import ScrollAnimation from "../UI/ScrollAnimation";

/**
 * QuickQuote Component
 * Call-to-action section for quick quote requests
 */
export default function QuickQuote({ data }) {
  return (
    <section className="bg-white py-4 md:py-6 lg:py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollAnimation animation="fadeInUp" delay={0.1}>
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 md:px-7 md:py-4 lg:px-8 lg:py-5 shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
              {/* Left Content */}
              <div className="flex-1 flex flex-col gap-1">
                <ServiceLabel text={data.label} />
                <h2 className="text-[17px] sm:text-[20px] md:text-[22px] font-bold text-lv-blue leading-tight">
                  {data.heading}
                </h2>
                <p className="text-[#6b7280] text-xs sm:text-[13px] leading-relaxed font-medium">
                  {data.description}
                </p>
              </div>

              {/* Right Content - Button and Phone */}
              <div className="flex flex-row items-center gap-4 lg:flex-shrink-0">
                <Link
                  href={data.button.href}
                  className="inline-block bg-lv-red hover:bg-lv-red-dark text-white font-bold px-6 py-2.5 rounded-lg transition-all duration-200 text-center text-sm shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  {data.button.text}
                </Link>
                <a
                  href={`tel:${data.phone.replace(/\s/g, '')}`}
                  className="text-[#4b5563] font-semibold text-sm hover:text-lv-blue transition-colors whitespace-nowrap"
                >
                  {data.phone}
                </a>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

