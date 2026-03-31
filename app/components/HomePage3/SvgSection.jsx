import React from "react";
import Image from "next/image";
import ScrollAnimation from "../UI/ScrollAnimation";
import { svgCards } from "../../data/HomePage/svgCards.js";

export default function SvgSection() {
  return (
    <section
      aria-labelledby="custom-svg-heading"
      className="relative overflow-hidden bg-white py-10 md:py-14 lg:py-18"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
              SVG
            </span>
            <div className="text-center mt-4 mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-lv-blue mb-0">
                Custom SVG Files
              </h2>
              <div className="w-24 h-1 bg-lv-red mx-auto mt-4" />
            </div>

            <p className="mt-3 text-sm sm:text-base leading-relaxed mx-auto max-w-4xl text-slate-600">
              A custom SVG is a scalable vector graphic designed to meet specific
              needs, whether for logos, illustrations, or print designs. It can be
              used for cutting (cuttable SVGs), printing (DTF, etc.), or even on
              websites. Unlike raster images, SVGs maintain crisp quality at any
              size, ensuring sharp and professional results across all
              applications.
            </p>
          </div>
        </ScrollAnimation>

        <div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          role="list"
        >
          {svgCards.map((c, idx) => (
            <ScrollAnimation key={c.slug} animation="fadeInUp" delay={0.05 + idx * 0.03}>
              <article
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
                aria-labelledby={c.slug}
                role="listitem"
                id={c.slug}
              >
              <div
                className="flex items-center justify-center rounded-2xl mb-4 bg-slate-50 border border-slate-200"
                style={{
                  width: 96,
                  height: 96,
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
                className="text-lg font-bold mb-2 text-lv-blue"
              >
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">{c.text}</p>
              </article>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

