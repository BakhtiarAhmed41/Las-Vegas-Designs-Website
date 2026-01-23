import React from "react";
import Image from "next/image";
import { svgCards } from "../../data/HomePage/svgCards.js";

export default function SvgSection() {
  return (
    <section
      aria-labelledby="custom-svg-heading"
      className="relative overflow-hidden bg-[var(--dark-gray)] text-[var(--white)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--lv-white)] mb-4">
              Custom SVG Files
            </h1>
            <div className="w-24 h-1 bg-[var(--lv-sky-blue)] mx-auto"></div>
          </div>

          <p className="mt-3 text-sm sm:text-base leading-relaxed mx-auto text-[var(--text-muted)]">
            A custom SVG is a scalable vector graphic designed to meet specific
            needs, whether for logos, illustrations, or print designs. It can be
            used for cutting (cuttable SVGs), printing (DTF, etc.), or even on
            websites. Unlike raster images, SVGs maintain crisp quality at any
            size, ensuring sharp and professional results across all
            applications.
          </p>
        </div>

        <div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6"
          role="list"
        >
          {svgCards.map((c) => (
            <article
              key={c.slug}
              className="flex flex-col items-center text-center px-3 sm:px-6"
              aria-labelledby={c.slug}
              role="listitem"
              id={c.slug}
            >
              <div
                className="flex items-center justify-center rounded-full mb-4"
                style={{
                  width: 96,
                  height: 96,
                  backgroundColor: "transparent",
                }}
              >
                <Image
                  src={`${c.image}`}
                  alt={c.title}
                  width={72}
                  height={72}
                  loading="lazy"
                  className="object-contain"
                />
              </div>

              <h3
                id={c.slug + "-title"}
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--white)" }}
              >
                {c.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {c.text}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 pointer-events-none ">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-24"
          aria-hidden="true"
        >
          <path
            d="M0,20 C360,100 1080,100 1440,20 L1440,120 L0,120 Z"
            fill="var(--lv-sky-blue)"
          />
        </svg>
      </div>
    </section>
  );
}
