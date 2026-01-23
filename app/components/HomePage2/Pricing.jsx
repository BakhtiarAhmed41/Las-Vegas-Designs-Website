"use client";
import PriceCard from "../Cards/PriceCard2";
import { priceData } from "@/app/data/HomePage/priceData";
import PriceSlider from "./PricingCarousel";

export default function DigitizingPrices() {
  return (
    <section className="bg-lv-blue py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          CUSTOM EMBROIDERY LOGO <br /> DIGITIZING PRICES
        </h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          <PriceSlider />
        </div>
      </div>
    </section>
  );
}
