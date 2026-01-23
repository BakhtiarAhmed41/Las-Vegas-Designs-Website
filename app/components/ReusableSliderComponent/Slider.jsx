"use client";

import { useState, useEffect, useCallback } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

/**
 * Fully continuous carousel slider
 * Moves 1 item per click — even if multiple are visible.
 */
export default function Slider({
  items = [],
  renderItem,
  autoPlay = false,
  autoPlayInterval = 3000,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 16,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.mobile);
  const [windowWidth, setWindowWidth] = useState(0);

  // Handle responsiveness and window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width < 640) {
        setItemsToShow(itemsPerView.mobile);
      } else if (width < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  // Max index allowed before stopping
  const maxIndex = Math.max(0, items.length - itemsToShow);

  // Move next by ONE item
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  // Move previous by ONE item
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  // Autoplay
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext]);

  // Translation percentage per item
  const itemWidthPercent = 100 / itemsToShow;

  // Calculate gap percentage safely
  const gapPercent = windowWidth > 0 ? (gap / windowWidth) * 100 : 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="relative">
        {/* LEFT ARROW */}
        <button
          onClick={goToPrev}
          className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 md:-translate-x-4 z-10 bg-[var(--lv-blueGreen)] hover:bg-[var(--lv-blue)] rounded-full p-2 shadow-lg transition disabled:opacity-40 cursor-pointer"
        >
          <IoChevronBack className="w-4 h-4 text-white" />
        </button>

        {/* SLIDER TRACK */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              gap: `${gap}px`,
              transform: `translateX(-${
                currentIndex * (itemWidthPercent + gapPercent)
              }%)`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="shrink-0"
                style={{
                  width: `calc((100% - ${
                    gap * (itemsToShow - 1)
                  }px) / ${itemsToShow})`,
                }}
              >
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={goToNext}
          className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 md:translate-x-4 z-10 bg-[var(--lv-blueGreen)] hover:bg-[var(--lv-blue)] rounded-full p-2 shadow-lg transition disabled:opacity-40 cursor-pointer"
        >
          <IoChevronForward className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* PAGINATION DOTS */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-3 h-3 bg-lv-blue"
                : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
