import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollAnimation from "../UI/ScrollAnimation";
import { services } from "../../data/HomePage/services.js";

export default function Services() {
  return (
    <section className="bg-white py-10 md:py-14 lg:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <header className="text-center mb-8 md:mb-12">
            <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
              Services
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-lv-blue">
              Embroidery Digitizing &amp; Vector Art Services USA
            </h2>
            <div className="w-24 h-1 bg-lv-red mx-auto mt-4" />

            <p className="mt-4 text-sm sm:text-base leading-relaxed mx-auto max-w-4xl text-slate-600">
              Having trouble with your logo’s stitch file? Las Vegas Designs USA
              provides the best digitizing solutions for all your embroidery needs
              with a quick turnaround. We offer custom logo digitizing services at
              competitive rates, including free tweaks and all major machine file
              formats. Plus, we provide on-call assistance to help resolve any
              stitching issues you might encounter.
            </p>
          </header>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {services.map((svc, idx) => (
            <ScrollAnimation key={svc.id} animation="fadeInUp" delay={0.05 + idx * 0.03}>
              <article className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow p-6 md:p-8 h-full flex flex-col">
              <div className="flex items-start gap-5">
                <div className="shrink-0">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      width={112}
                      height={112}
                      className="w-16 h-16 md:w-18 md:h-18 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-lv-blue">
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <Link
                  href={`/services/${svc.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-lv-red text-white px-6 py-3 text-sm font-semibold shadow-md hover:bg-lv-red-dark transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </article>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

