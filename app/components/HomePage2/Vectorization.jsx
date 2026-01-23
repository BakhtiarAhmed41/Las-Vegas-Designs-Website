import Image from "next/image";
import React from "react";
import vectorization from "../../data/HomePage/vectorization.js";

export default function Vectorization({ items = vectorization }) {
  return (
    <section
      aria-labelledby="custom-vectorization-design"
      className="bg-[var(--background)] py-16"
    >
      <div>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <header className="mb-12 text-center md:text-left max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Custom Vectorization & Design
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-500">
              Custom vector design involves creating scalable digital artwork
              using software like Adobe Illustrator, CorelDRAW, or similar
              programs. Unlike raster images (JPEG, PNG), vector images are made
              of mathematical equations, allowing them to be resized without
              losing quality. This makes them perfect for logos, illustrations,
              and any design requiring sharpness and optimal quality.
            </p>
          </header>
        </div>

        <div className="flex flex-wrap justify-center gap-8 w-full bg-black p-4 sm:p-6 lg:p-8">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group relative block cursor-pointer focus:outline-none w-60"
              aria-label={item.title}
            >
              <div className="relative img-rounded card-shadow transform transition duration-500 group-hover:scale-105 overflow-hidden rounded-lg">
                <div className="relative w-60 h-70 sm:h-64 md:h-72 overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                    className={`transition-transform duration-500 group-hover:scale-110 ${
                      index === 2
                        ? "bg-gradient-to-br from-gray-200 to-gray-300"
                        : ""
                    }`}
                    priority={false}
                  />
                </div>

                {/* Leaf-shaped badge at top */}
                <div className="absolute right-4 top-4">
                  <div className="relative">
                    <div className="rotate-45">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        className="drop-shadow-md"
                      >
                        {/* Leaf shape */}
                        <path
                          d="M30 5 Q50 15 50 30 Q50 45 30 55 Q10 45 10 30 Q10 15 30 5 Z"
                          fill="#0b9397"
                          stroke="#eef2fb"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                    <span className="absolute inset-0 flex items-center justify-center text-base font-bold text-white">
                      {item.id}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-[rgba(0,0,0,0.52)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Title - shows by default, hides on hover */}
                <div className="absolute left-6 bottom-5 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="bg-lv-blueGreen p-2 rounded-lg outline-none font-semibold text-sm text-white">
                    {item.title}
                  </div>
                </div>

                {/* Description - hidden by default, slides up on hover */}
                <div className="absolute left-0 right-0 bottom-0 px-6 pb-5 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out text-black bg-white pt-4 rounded-t-lg bg-lv-skyBlue">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
