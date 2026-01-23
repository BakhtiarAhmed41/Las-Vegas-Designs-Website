"use client";

import Script from "next/script";
import ServiceLabel from "../UI/ServiceLabel";

/**
 * EtsyReviews Component
 * Elfsight Etsy Reviews | Etsy Reviews
 */
export default function EtsyReviews() {
  return (
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          {/* REAL REVIEWS Label */}
          <div className="flex justify-center mb-4">
            <ServiceLabel text="REAL REVIEWS" />
          </div>

          {/* Main Heading */}
          <h2 className="text-[24px] sm:text-[30px] md:text-[42px] font-bold text-lv-blue mb-4 text-shadow-blue">
            Trusted by repeat customers
          </h2>

          {/* Descriptive Paragraph */}
          <p className="text-[15px] sm:text-base text-[#6b7280] max-w-3xl mx-auto leading-relaxed">
            Here are a few recent reviews from our customers. Clean output, fast turnaround, and production ready files for printing, cutting, and stitching.
          </p>
        </div>

        {/* Elfsight Etsy Reviews | Etsy Reviews */}
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="lazyOnload"
          async
        />
        <div
          className="elfsight-app-be55f99e-5bb0-4f18-bf58-62db2f97cb4d"
          data-elfsight-app-lazy
        ></div>
      </div>
    </section>
  );
}

