import React from "react";
import ScrollAnimation from "../UI/ScrollAnimation";
import { whyChooseUsData } from "../../data/HomePage/chooseUs.js";

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-10 md:py-14 lg:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
              Why us
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-lv-blue">
              Why Las Vegas Designs USA?
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-sm md:text-base text-slate-600 leading-relaxed">
              Built for real production—clean files, consistent quality checks, and
              support when you need a tweak.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {whyChooseUsData.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <ScrollAnimation key={index} animation="fadeInUp" delay={0.05 + index * 0.03}>
                <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-lv-red/30">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-14 h-14 bg-lv-red rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-lv-blue mb-2 group-hover:text-lv-red transition-colors">
                      {benefit.headline}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}

