"use client";

import {
  otherPriceCardsData,
  priceCardsData,
} from "@/app/data/HomePage/priceCardData";
import PriceCard from "../Cards/PriceCard";
import { useState, useEffect } from "react";

export default function OurPrice() {
  const [customEmbroideryButtonClicked, setcustomEmbroideryButtonClicked] =
    useState(true);

  // Prevent hydration mismatch by adding animation AFTER mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-16 px-3 md:px-6 w-full">
      <div className="mx-auto">
        <div className="flex flex-col items-center py-10 gap-y-10">
          <h3 className="text-lv-blue text-[32px] font-bold text-center">
            Our Prices
          </h3>
          <p className="text-center">
            All prices are based on logo size and complexity. We don’t offer
            flat rates or charge per 1,000 stitches count, but we provide highly
            competitive pricing compared to industry standards.
          </p>

          <div className="flex flex-wrap justify-center gap-10">
            <button
              onClick={() => setcustomEmbroideryButtonClicked(true)}
              className={`px-5 py-3 rounded-full font-semibold transition-all duration-200
                ${
                  customEmbroideryButtonClicked
                    ? "bg-lv-red text-white"
                    : "bg-lv-red text-black"
                }
              `}
            >
              Custom Embroidery Logo Digitizing Prices
            </button>

            <button
              onClick={() => setcustomEmbroideryButtonClicked(false)}
              className={`block px-10 py-3 rounded-full font-semibold transition-all duration-200
                ${
                  !customEmbroideryButtonClicked
                    ? "bg-lv-red text-white"
                    : "bg-lv-red text-black"
                }
              `}
            >
              Custom Vector & SVG Pricing
            </button>
          </div>
        </div>

        {/* Animated Cards Grid */}
        <div
          key={customEmbroideryButtonClicked ? "embroidery" : "vector"}
          className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
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
