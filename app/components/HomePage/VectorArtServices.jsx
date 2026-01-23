import React from "react";
import Card from "../Cards/Card.jsx";
import { services } from "../../data/HomePage/services.js";

export default function Services() {
  return (
    <section className="py-10 md:py-16 lg:pt-20 xl:pb-0 bg-[var(--lv-sky-blue)]">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-8 md:mb-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--lv-blue)] mb-4">
              Embroidery Digitizing & Vector Art Services USA
            </h1>
            <div className="w-24 h-1 bg-[var(--lv-red-light)] mx-auto"></div>
          </div>

          <p className="mt-3 text-sm sm:text-base leading-relaxed mx-auto text-gray-600">
            Having trouble with your logo’s stitch file? Las Vegas Designs USA
            provides the best digitizing solutions for all your embroidery needs
            with a quick turnaround. We offer custom logo digitizing services at
            competitive rates, including free tweaks and all major machine file
            formats. Plus, we provide on-call assistance to help resolve any
            stitching issues you might encounter.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 items-start gap-y-6">
          {services.map((svc, index) => {
            const centerLast =
              index === services.length - 1 ? "lg:col-start-2" : "";

            let extra = "mx-auto";
            if (svc.id === "hat") {
              extra += " lg:mx-0";
            } else if (index === services.length - 1) {
              extra += " lg:mt-8";
            } else {
              extra += " lg:mt-22";
            }

            const imageClass =
              svc.id === "hat"
                ? "w-44 h-44 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-72 xl:h-72"
                : "w-44 h-44 md:w-48 md:h-48";

            return (
              <div
                key={svc.id}
                className={`${centerLast} ${extra} flex justify-center`}
              >
                <Card
                  title={svc.title}
                  description={svc.desc}
                  imageSrc={svc.image}
                  alt={svc.title}
                  href={`/services/${svc.id}`}
                  isTall={!!svc.isTall}
                  imageClass={imageClass}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
