"use client";
import { faqs } from "@/app/data/FAQs/faqs";
import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-sm md:mx-0 md:w-xl px-5">
      <h2 className="text-center text-3xl md:text-4xl font-bold mt-2 text-black mb-6">
        Frequently Asked
        <span className="text-lv-blueGreen"> Questions</span>
      </h2>

      <div className="rounded-lg divide-y w-full flex flex-col">
        {faqs.map((item, i) => (
          <div key={i} className="py-2 border-none">
            {/* Question Row */}
            <button
              className="w-full flex justify-between items-center text-left cursor-pointer"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {/* ID Badge + Question */}
              <div className="flex items-center gap-3 px-2 py-3">
                <span className="min-w-7 min-h-7 w-7 h-7 rounded-full bg-lv-blueGreen text-white flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>

                <span className="text-base font-semibold text-black">
                  {item.q}
                </span>
              </div>

              {/* Chevron */}
              <span
                className={`transition-transform duration-300 ${
                  openIndex === i ? "rotate-180 text-lv-blueGreen" : "rotate-0"
                }`}
              >
                <IoChevronDown size={20} />
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
              <div className="px-2 text-base text-gray-600 font-light pb-4 text-sm">
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
