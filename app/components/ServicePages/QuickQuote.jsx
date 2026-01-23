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
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollAnimation animation="fadeInUp" delay={0.1}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 lg:p-10 shadow-md">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* Left Content */}
              <div className="flex-1">
                {/* Service Label */}
                <div className="mb-4">
                  <ServiceLabel text={data.label} />
                </div>

                {/* Heading */}
                <h2 className="text-[18px] sm:text-[24px] md:text-[30px] font-bold text-lv-blue mb-4 text-shadow-blue">
                  {data.heading}
                </h2>

                {/* Description */}
                <p className="text-[#6b7280] text-sm sm:text-[14px] leading-relaxed font-medium text-shadow-sm">
                  {data.description}
                </p>
              </div>

              {/* Right Content - Button and Phone */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:flex-shrink-0">
                {/* CTA Button */}
                <Link
                  href={data.button.href}
                  className="inline-block bg-lv-red hover:bg-lv-red-dark text-white font-bold px-7 py-3.5 rounded-[10px] transition-all duration-200 text-center text-sm shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  {data.button.text}
                </Link>

                {/* Phone Number */}
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

