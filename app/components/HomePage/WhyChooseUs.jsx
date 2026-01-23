import React from "react";
import { whyChooseUsData } from "../../data/HomePage/chooseUs.js";

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 bg-[var(--lv-sky-blue)]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--lv-blue)] mb-4">
            Why Las Vegas Designs USA?
          </h2>
          <div className="w-24 h-1 bg-[var(--lv-red-light)] mx-auto"></div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyChooseUsData.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[var(--lv-red-light)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-[var(--lv-blue)] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--lv-blue-light)] mb-3 group-hover:text-[var(--lv-red)] transition-colors">
                      {benefit.headline}
                    </h3>
                    <p className="text-[var(--lv-text-muted)] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
