"use client";
import { faqs } from "@/app/data/FAQs/faqs";
import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full px-0">
      <h2 className="text-center md:text-start text-2xl md:text-3xl font-bold text-lv-blue mb-6">
        Frequently Asked <span className="text-lv-red">Questions</span>
      </h2>

      <div className="rounded-2xl divide-y w-full flex flex-col border border-slate-200 overflow-hidden">
        {faqs.map((item, i) => (
          <div key={i} className="py-2 border-none bg-white">
            <button
              className="w-full flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
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

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === i
                  ? "max-h-40 opacity-100 mt-3"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="px-2 text-base text-slate-600 font-light pb-4">
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

