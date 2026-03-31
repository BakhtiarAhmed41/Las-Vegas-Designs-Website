import Image from "next/image";
import React from "react";
import ScrollAnimation from "../UI/ScrollAnimation";
import vectorization from "../../data/HomePage/vectorization.js";

export default function Vectorization({ items = vectorization }) {
  return (
    <section
      aria-labelledby="custom-vectorization-design"
      className="bg-white py-10 md:py-14 lg:py-18"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <header className="text-center mb-10">
            <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
              Vector
            </span>
            <div className="text-center mt-4 mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-lv-blue">
                Custom Vectorization & Design
              </h2>
              <div className="w-24 h-1 bg-lv-red mx-auto mt-4" />
            </div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed mx-auto max-w-4xl text-slate-600">
              Custom vector design involves creating scalable digital artwork
              using software like Adobe Illustrator, CorelDRAW, or similar
              programs. Unlike raster images (JPEG, PNG), vector images are made
              of mathematical equations, allowing them to be resized without
              losing quality. This makes them perfect for logos, illustrations,
              and any design requiring sharpness and optimal quality.
            </p>
          </header>
        </ScrollAnimation>

        <div className="flex flex-wrap justify-center gap-8">
          {items.map((item, index) => (
            <ScrollAnimation key={item.id} animation="fadeInUp" delay={0.05 + index * 0.03}>
              <div
                className="group relative block cursor-pointer focus:outline-none w-60"
                aria-label={item.title}
              >
              <div className="relative transform transition duration-500 group-hover:scale-105 overflow-hidden rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl bg-white">
                <div className="relative w-60 h-70 sm:h-64 md:h-72 overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                    className={`transition-transform duration-500 group-hover:scale-110 ${
                      index === 2
                        ? "bg-linear-to-br from-gray-200 to-gray-300"
                        : ""
                    }`}
                    priority={false}
                  />
                </div>

                <div className="absolute right-4 top-4">
                  <div className="relative">
                    <div className="rotate-45">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        className="drop-shadow-md"
                      >
                        <path
                          d="M30 5 Q50 15 50 30 Q50 45 30 55 Q10 45 10 30 Q10 15 30 5 Z"
                          fill="white"
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                    <span className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-800">
                      {item.id}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-[rgba(0,0,0,0.52)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <div className="absolute left-6 bottom-5 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="bg-white/95 backdrop-blur-sm p-2 rounded-xl outline-none font-semibold text-sm border border-slate-200">
                    {item.title}
                  </div>
                </div>

                <div className="absolute left-0 right-0 bottom-0 px-6 pb-5 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out text-black bg-white pt-4 rounded-t-2xl border-t border-slate-200">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

