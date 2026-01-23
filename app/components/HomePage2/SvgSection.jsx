import React from "react";
import Image from "next/image";
import { svgCards } from "../../data/HomePage/svgCards.js";

export default function SvgSection() {
  return (
    <section aria-labelledby="custom-svg-heading">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:py-20">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Custom SVG Files
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-500">
            A custom SVG is a scalable vector graphic designed to meet specific
            needs, whether for logos, illustrations, or print designs. It can be
            used for cutting (cuttable SVGs), printing (DTF, etc.), or even on
            websites. Unlike raster images, SVGs maintain crisp quality at any
            size, ensuring sharp and professional results across all
            applications.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center items-center"
          role="list"
        >
          {svgCards.map((c) => {
            const isSmall = c.size === "small";

            return (
              <article
                key={c.slug}
                className={`flex flex-col items-center text-center rounded-2xl p-4 sm:p-6 shadow-md`}
                style={{
                  backgroundColor: c.bgColor,
                  height: c.minHeight,
                }}
                aria-labelledby={c.slug}
                role="listitem"
                id={c.slug}
              >
                {/* Icon */}
                <div
                  className={`flex items-center justify-center rounded-full bg-white mb-4`}
                  style={{
                    width: isSmall ? 72 : 96,
                    height: isSmall ? 72 : 96,
                  }}
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={isSmall ? 56 : 72}
                    height={isSmall ? 56 : 72}
                    loading="lazy"
                    className="object-contain"
                  />
                </div>

                {/* Title */}
                <h3
                  id={c.slug + "-title"}
                  className={`font-semibold mb-2 text-white`}
                  style={{
                    fontSize: isSmall ? "1rem" : "1.125rem",
                  }}
                >
                  {c.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed text-gray-200"
                  style={{
                    fontSize: isSmall ? "0.8rem" : "0.875rem",
                  }}
                >
                  {c.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
