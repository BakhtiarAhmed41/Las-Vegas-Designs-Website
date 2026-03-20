"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ServiceLabel from "../UI/ServiceLabel";
import ScrollAnimation from "../UI/ScrollAnimation";

/**
 * ServiceCard Component
 * Individual service card with icon, image, features, and CTA
 */
function ServiceCard({ card, index }) {
  return (
    <ScrollAnimation animation="fadeInUp" delay={index * 0.15}>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col group hover:-translate-y-1">
        {/* Image Container */}
        <div className="bg-gradient-to-br from-white to-white h-56 sm:h-64 md:h-72 lg:h-80 flex items-center justify-center relative overflow-hidden">
          {card.imageSrc ? (
            <div className="w-full h-full p-2 sm:p-3 md:p-4">
              <Image
                src={card.imageSrc}
                alt={card.imageAlt || card.title}
                width={600}
                height={400}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-gray-200 rounded-lg p-8 mb-2">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-xs">Image placeholder</p>
            </div>
          )}
        </div>

        {/* Decorative Separator */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="mx-5 flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-lv-red shadow-sm"></div>
              <div className="w-2 h-2 rounded-full bg-lv-blue shadow-sm"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-lv-red shadow-sm"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          {/* Icon and Label */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lv-blue to-lv-blue-light text-white font-bold text-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              {card.icon}
            </div>
            {card.label && <ServiceLabel text={card.label} />}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-lv-red mb-5 text-shadow-red leading-tight group-hover:text-lv-red-dark transition-colors duration-300">
            {card.title}
          </h3>

          {/* Features List */}
          <ul className="space-y-3 mb-8 flex-1">
            {card.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start text-gray-700 text-sm md:text-base group-hover:text-gray-800 transition-colors duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-lv-red mr-3 mt-2 shrink-0 group-hover:bg-lv-red-dark transition-colors duration-300"></span>
                <span className="font-medium leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          {card.button && (
            <Link
              href={card.button.href}
              className="inline-block bg-gradient-to-r from-lv-red to-lv-red-dark hover:from-lv-red-dark hover:to-lv-red text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 text-center text-sm md:text-base shadow-lg hover:shadow-xl mt-auto transform hover:scale-105"
            >
              {card.button.text}
            </Link>
          )}
        </div>
      </div>
    </ScrollAnimation>
  );
}

/**
 * ServiceCards Section Component
 * Displays a heading, description, and grid of service cards
 * @param {string} heading - Section heading
 * @param {string} description - Section description
 * @param {array} cards - Array of card objects
 * @param {number} columns - Number of columns on large screens (2 or 3, default: 3)
 */
export default function ServiceCards({ heading, description, cards = [], columns = 3 }) {
  // Determine grid classes based on columns prop
  const gridClasses = columns === 2
    ? "grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8";

  // Adjust max-width based on columns
  const maxWidthClass = columns === 2 ? "max-w-7xl" : "max-w-[1400px]";

  return (
    <section className="bg-white py-6 md:py-8 lg:py-10">
      <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 xl:px-12`}>
        {/* Section Header */}
        {(heading || description) && (
          <div className="text-center mb-12 md:mb-16">
            {heading && (
              <ScrollAnimation animation="fadeInUp" delay={0.1}>
                <h2 className="text-[20px] sm:text-[29px] md:text-[41px] font-bold text-lv-blue mb-6 text-shadow-blue max-w-4xl mx-auto">
                  {heading}
                </h2>
              </ScrollAnimation>
            )}

            {description && (
              <ScrollAnimation animation="fadeInUp" delay={0.2}>
                <p className="text-[#6b7280] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm">
                  {description}
                </p>
              </ScrollAnimation>
            )}
          </div>
        )}

        {/* Service Cards Grid */}
        <div className={gridClasses}>
          {cards.map((card, index) => (
            <ServiceCard key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

