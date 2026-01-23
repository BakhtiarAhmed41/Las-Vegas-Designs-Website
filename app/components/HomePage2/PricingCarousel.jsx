"use client";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import PriceCard from "../Cards/PriceCard2";
import { priceData } from "@/app/data/HomePage/priceData";
import PriceCard from "../Cards/PriceCard2";

export default function PriceSlider() {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const total = priceData.length;

  // Responsive visible items: 1 → 2 → 3
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  const next = () => setCurrent((prev) => (prev + 1) % total);

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(priceData[(current + i) % total]);
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  return (
    <section className="bg-lv-blueGreen py-16">
      <div className="max-w-7xl mx-auto md:px-4">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          CUSTOM EMBROIDERY LOGO <br /> DIGITIZING PRICES
        </h2>

        <div className="relative flex items-center justify-center mt-14 gap-4">
          {/* Left Arrow */}
          <button
            onClick={prev}
            className="text-white text-4xl p-2 hover:scale-110 transition"
          >
            <FiChevronLeft />
          </button>

          {/* Cards */}
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: "translateX(0)" }}
          >
            {visibleItems.map((item, i) => (
              <div
                key={i}
                className={`overflow-x-hidden md:flex-shrink-0 transition-all duration-700 ease-out
                  ${
                    // center card is highlighted depending on visibleCount
                    (visibleCount === 1 && i === 0) ||
                    (visibleCount === 2 && i === 1) ||
                    (visibleCount === 3 && i === 1)
                      ? "scale-110 "
                      : "scale-90 opacity-80"
                  }
                `}
              >
                <PriceCard {...item} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="text-white text-4xl p-2 hover:scale-110 transition"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
