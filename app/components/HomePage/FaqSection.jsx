"use client";
import { faqs } from "@/app/data/FAQs/faqs";
import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-sm md:mx-0 md:w-xl px-5">
      <h2 className="text-center md:text-start text-3xl font-bold text-black mb-6">
        Frequently Asked
        <span className="text-lv-blue"> Questions</span>
      </h2>

      <div className="rounded-lg divide-y w-full flex flex-col">
        {faqs.map((item, i) => (
          <div key={i} className="py-2 border-none">
            {/* Question Row */}
            <button
              className={`w-full flex justify-between items-center text-left ${
                openIndex === i ? "border-b border-gray-400" : "border-none"
              }`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span
                className={`text-base font-semibold px-2 py-3 ${
                  openIndex === i ? "text-lv-red" : "text-lv-blue"
                }`}
              >
                {i + 1}. {item.q}
              </span>

              <span
                className={`transition-transform duration-300 ${
                  openIndex === i
                    ? "rotate-180 text-lv-red"
                    : "rotate-0 text-lv-blue"
                }`}
              >
                <IoChevronDown />
              </span>
            </button>

            {/* Smooth Expand / Collapse */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === i
                  ? "max-h-40 opacity-100 mt-3"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="px-2 text-base text-gray-600 font-light pb-4">
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaqSection;
