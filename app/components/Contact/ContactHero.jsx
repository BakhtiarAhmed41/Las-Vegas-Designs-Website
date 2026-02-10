"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ServiceLabel from "../UI/ServiceLabel";
import ScrollAnimation from "../UI/ScrollAnimation";

export default function ContactHero() {
  return (
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="lg:pr-8">
            {/* Service Label */}
            <ScrollAnimation animation="fadeInRight" delay={0.1}>
              <div className="mb-3 md:mb-4">
                <ServiceLabel text="CONTACT US" />
              </div>
            </ScrollAnimation>

            {/* Main Heading */}
            <ScrollAnimation animation="fadeInRight" delay={0.2}>
              <h1 className="font-bold text-gray-800 leading-[1.2] mb-4 text-[24px] sm:text-[30px] md:text-[36px] lg:text-[42px]">
                Let's talk about your project
              </h1>
            </ScrollAnimation>

            {/* Description */}
            <ScrollAnimation animation="fadeInRight" delay={0.3}>
              <p className="text-[#6b7280] leading-[1.75] mb-6 font-medium text-sm sm:text-[14px] md:text-base">
                Get in touch with us for fast response, and und high-quality vector or embroidery design services.
              </p>
            </ScrollAnimation>

            {/* Action Buttons */}
            <ScrollAnimation animation="fadeInRight" delay={0.4}>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <Link
                  href="#quote-form"
                  className="inline-block bg-lv-red hover:bg-lv-red-dark text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 text-center text-[15px] shadow-lg hover:shadow-xl"
                >
                  Get Free Quote
                </Link>
                <Link
                  href="sms:7253003797"
                  className="inline-block bg-white text-lv-blue hover:text-lv-red font-bold px-7 py-3.5 rounded-full border-2 border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 text-center text-[15px]"
                >
                  Text Us
                </Link>
                <Link
                  href="mailto:Sales@Lasvegasdesignsusa.com"
                  className="inline-block bg-white text-lv-blue hover:text-lv-red font-bold px-7 py-3.5 rounded-full border-2 border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 text-center text-[15px]"
                >
                  Email Us
                </Link>
              </div>
            </ScrollAnimation>

            {/* Benefit Pills */}
            <ScrollAnimation animation="fadeInRight" delay={0.5}>
              <div className="flex flex-wrap gap-3">
                <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                  Fast turnaround
                </span>
                <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                  Clean working files
                </span>
                <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                  16/7 support available
                </span>
              </div>
            </ScrollAnimation>
          </div>

          {/* Image Section */}
          <ScrollAnimation animation="fadeInLeft" delay={0.3}>
            <div className="relative mt-8 lg:mt-0">
              <div
                className="rounded-xl md:rounded-2xl overflow-hidden min-h-[400px] sm:min-h-[450px] md:min-h-[500px]"
                style={{
                  boxShadow:
                    "0 10px 30px rgba(156, 15, 23, 0.15), 0 4px 15px rgba(24, 53, 89, 0.2)",
                  border: "0.5px solid rgba(156, 15, 23, 0.08)",
                }}
              >
                <Image
                  src="/assets/images/contact-register-feedback-support-help-concept.jpg"
                  alt="Contact us - get in touch for vector and embroidery design services"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover min-h-[400px] sm:min-h-[450px] md:min-h-[500px]"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
