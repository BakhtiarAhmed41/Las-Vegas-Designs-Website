"use client";

import { IoCheckmarkCircle } from "react-icons/io5";

export default function PriceCard({ title, features, highlighted = false }) {
  return (
    <div
      className={`rounded-2xl p-6 ${
        highlighted
          ? "bg-lv-blue text-white border border-lv-blue shadow-xl"
          : "bg-white text-gray-800 border border-slate-200 shadow-lg"
      } flex flex-col h-full`}
    >
      {/* Title */}
      <h3
        className={`text-xl md:text-2xl font-bold pb-5 mb-5 text-center border-b ${
          highlighted ? "border-white/30" : "border-slate-200"
        }`}
      >
        {title}
      </h3>

      {/* Features List */}
      <ul className="space-y-4 mb-8 flex flex-col grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <IoCheckmarkCircle
              className={`flex shrink-0 w-5 h-5 mt-0.5 ${
                highlighted ? "text-white" : "text-lv-red"
              }`}
            />
            <span className="text-base leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`w-full px-4 py-2.5 text-sm rounded-full font-semibold transition-all duration-200 ${
          highlighted
            ? "bg-lv-red hover:bg-lv-red-dark text-white shadow-md"
            : "bg-lv-red hover:bg-lv-red-dark text-white shadow-md"
        }`}
      >
        → Get A Quote
      </button>
    </div>
  );
}
