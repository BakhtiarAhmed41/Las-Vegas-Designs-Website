"use client";

import React from "react";
import ServiceLabel from "../UI/ServiceLabel";
import ScrollAnimation from "../UI/ScrollAnimation";

/**
 * PlacementGuide Component
 * Displays placement and measurement guide for embroidery designs
 */
export default function PlacementGuide({ data }) {
  if (!data) return null;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <ScrollAnimation animation="fadeInUp" delay={0.1}>
          <div className="text-center mb-8 md:mb-12">
            <div className="mb-4 flex justify-center">
              <ServiceLabel text={data.label} />
            </div>
            <h2 className="text-[20px] sm:text-[29px] md:text-[41px] font-bold text-gray-800 mb-4 text-shadow-sm">
              {data.heading}
            </h2>
            {data.description && (
              <p className="text-[#6b7280] text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm">
                {data.description}
              </p>
            )}
          </div>
        </ScrollAnimation>

        {/* Placement Cards Grid */}
        <ScrollAnimation animation="fadeInUp" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {data.placements.map((placement, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl shrink-0">{placement.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-lv-red mb-2 text-shadow-red">
                      {placement.title}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-semibold text-gray-700 min-w-[100px]">
                          Size:
                        </span>
                        <span className="text-sm text-gray-600">
                          {placement.measurements}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-semibold text-gray-700 min-w-[100px]">
                          Placement:
                        </span>
                        <span className="text-sm text-gray-600">
                          {placement.placement}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {placement.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollAnimation>

        {/* Tips Section */}
        {data.tips && data.tips.length > 0 && (
          <ScrollAnimation animation="fadeInUp" delay={0.3}>
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold text-lv-blue mb-6 text-shadow-blue">
                Helpful Tips
              </h3>
              <ul className="space-y-3">
                {data.tips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm md:text-base text-gray-700"
                  >
                    <span className="w-2 h-2 rounded-full bg-lv-red mt-2 shrink-0"></span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  );
}
