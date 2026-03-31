"use client";

import {
  otherPriceCardsData,
  priceCardsData,
} from "@/app/data/HomePage/priceCardData";
import PriceCard from "../Cards/PriceCard";
import { useState, useEffect } from "react";
import ScrollAnimation from "../UI/ScrollAnimation";

export default function OurPrice() {
  const [customEmbroideryButtonClicked, setcustomEmbroideryButtonClicked] =
    useState(true);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="bg-white py-10 md:py-14 lg:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <div className="flex flex-col items-center text-center mb-8 md:mb-12">
            <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
              Pricing
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-lv-blue">
              Our Prices
            </h2>
            <p className="mt-4 max-w-3xl text-slate-600">
              All prices are based on logo size and complexity. We don’t offer
              flat rates or charge per 1,000 stitches count, but we provide highly
              competitive pricing compared to industry standards.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setcustomEmbroideryButtonClicked(true)}
                className={`px-5 py-3 rounded-full font-semibold transition-all duration-200 border ${
                  customEmbroideryButtonClicked
                    ? "bg-lv-red border-lv-red text-white shadow-md"
                    : "bg-white border-slate-300 text-slate-700 hover:border-lv-red/40 hover:text-lv-red"
                }`}
              >
                Custom Embroidery Logo Digitizing Prices
              </button>

              <button
                onClick={() => setcustomEmbroideryButtonClicked(false)}
                className={`px-5 py-3 rounded-full font-semibold transition-all duration-200 border ${
                  !customEmbroideryButtonClicked
                    ? "bg-lv-red border-lv-red text-white shadow-md"
                    : "bg-white border-slate-300 text-slate-700 hover:border-lv-red/40 hover:text-lv-red"
                }`}
              >
                Custom Vector & SVG Pricing
              </button>
            </div>
          </div>
        </ScrollAnimation>

        <div
          key={customEmbroideryButtonClicked ? "embroidery" : "vector"}
          className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8
            transition-all duration-500
            ${mounted ? "opacity-100 animate-fadeIn" : "opacity-100"}
          `}
        >
          {(customEmbroideryButtonClicked
            ? priceCardsData
            : otherPriceCardsData
          ).map((card) => (
            <PriceCard
              key={card.id}
              title={card.title}
              features={card.features}
              highlighted={card.highlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

