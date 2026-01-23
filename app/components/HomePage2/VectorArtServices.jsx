"use client";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ServiceCard from "../Cards/ServiceCard.jsx";
import { services } from "@/app/data/HomePage/services";

export default function VectorArtServices() {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const total = services.length;

  // Responsive visibility logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // tablets / md screens
      } else {
        setVisibleCount(3); // desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Looping logic
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const next = () => setCurrent((prev) => (prev + 1) % total);

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(services[(current + i) % total]);
    }
    return visible;
  };

  const visibleItems = getVisibleItems();

  return (
    <section className="py-10 md:py-20 lg:pt-20 bg-lv-blueGreen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="mb-10 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase">
            Embroidery Digitizing &<br /> Vector Art Services USA
          </h2>
          <p className="pr-5 pt-5 text-sm sm:text-base md:text-lg text-black font-semibold leading-relaxed">
            Having trouble with your logo’s stitch file? Las Vegas Designs USA
            provides the best digitizing solutions for all your embroidery needs
            with a quick turnaround. We offer custom logo digitizing services at
            competitive rates, including free tweaks and all major machine file
            formats. Plus, we provide on-call assistance to help resolve any
            stitching issues you might encounter.
          </p>
        </header>

        {/* Carousel */}
        <div className="relative mx-auto max-w-5xl flex items-center justify-center gap-2 sm:gap-4 mt-10">
          {/* Prev button */}
          <button
            onClick={prev}
            className="text-white text-3xl sm:text-4xl p-1 sm:p-2 hover:scale-110 transition"
          >
            <FiChevronLeft />
          </button>

          {/* Cards container */}
          <div className="flex transition-all duration-700 ease-out">
            {visibleItems.map((item, index) => (
              <div
                key={index}
                className={`overflow-x-hidden md:flex-shrink-0 transition-all duration-700 ease-out
                  ${
                    // center card is highlighted depending on visibleCount
                    (visibleCount === 1 && index === 0) ||
                    (visibleCount === 2 && index === 1) ||
                    (visibleCount === 3 && index === 1)
                      ? "scale-110 "
                      : "scale-90 opacity-80"
                  }
                `}
              >
                <ServiceCard
                  image={item.image}
                  title={item.title}
                  description={item.desc}
                />
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            className="text-white text-3xl sm:text-4xl p-1 sm:p-2 hover:scale-110 transition"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
