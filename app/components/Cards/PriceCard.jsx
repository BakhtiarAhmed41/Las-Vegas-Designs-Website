"use client";

import { IoCheckmarkCircle } from "react-icons/io5";

export default function PriceCard({ title, features, highlighted = false }) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        highlighted ? "bg-lv-blue text-white" : "bg-white text-gray-800"
      } shadow-md lg:shadow-2xl flex flex-col h-full`}
    >
      {/* Title */}
      <h3
        className={`text-2xl font-bold py-8 mb-6 text-center border-b-[0.2] ${
          highlighted ? "border-white" : "border-gray-400"
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
        className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-200 ${
          highlighted
            ? "bg-lv-red hover:bg-red-600 text-white"
            : "bg-lv-red hover:bg-red-600 text-white"
        }`}
      >
        → Get A Quote
      </button>
    </div>
  );
}
