"use client";

import React from "react";
import Link from "next/link";
import ServiceLabel from "../UI/ServiceLabel";
import ScrollAnimation from "../UI/ScrollAnimation";
import { FiCheck } from "react-icons/fi";

/**
 * WhyChooseUs Component
 * Displays benefits and CTA buttons
 */
export default function WhyChooseUs({ data }) {
  return (
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Column - Why Choose Us */}
          <div className="border border-gray-200 rounded-xl p-6 md:p-8 bg-white shadow-sm">
            {/* Service Label */}
            <ScrollAnimation animation="fadeInRight" delay={0.1}>
              <div className="mb-4">
                <ServiceLabel text={data.label} />
              </div>
            </ScrollAnimation>

            {/* Heading */}
            <ScrollAnimation animation="fadeInRight" delay={0.2}>
              <h2 className="text-[18px] sm:text-[24px] md:text-[30px] font-bold text-lv-blue mb-5 text-shadow-blue">
                {data.heading}
              </h2>
            </ScrollAnimation>

            {/* Description */}
            <ScrollAnimation animation="fadeInRight" delay={0.3}>
              <p className="text-[#6b7280] text-sm sm:text-[14px] leading-relaxed mb-6 font-medium text-shadow-sm">
                {data.description}
              </p>
            </ScrollAnimation>

            {/* Benefits List */}
            <ScrollAnimation animation="fadeInRight" delay={0.4}>
              <ul className="space-y-3 mb-8">
                {data.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <FiCheck className="text-lv-red w-5 h-5 font-bold" strokeWidth={3} />
                    </div>
                    <span className="text-[#4b5563] text-sm font-medium ml-3">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollAnimation>

            {/* CTA Buttons */}
            <ScrollAnimation animation="fadeInRight" delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4">
                {data.primaryButton && (
                  <Link
                    href={data.primaryButton.href}
                    className="inline-block bg-lv-red hover:bg-lv-red-dark text-white font-bold px-7 py-3.5 rounded-[10px] transition-all duration-200 text-center text-sm shadow-lg hover:shadow-xl"
                  >
                    {data.primaryButton.text}
                  </Link>
                )}

                {data.secondaryButton && (
                  <Link
                    href={data.secondaryButton.href}
                    className="inline-block bg-white text-lv-blue hover:text-lv-red font-bold px-7 py-3.5 rounded-[10px] border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 text-center text-sm"
                  >
                    {data.secondaryButton.text}
                  </Link>
                )}
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Column - FAQ */}
          <FAQAccordion data={data} />
        </div>
      </div>
    </section>
  );
}

/**
 * FAQ Accordion Component
 * Manages FAQ state so only one can be open at a time
 */
function FAQAccordion({ data }) {
  const [openIndex, setOpenIndex] = React.useState(() => {
    // Find the index of the FAQ that should be open by default
    const defaultIndex = data.faqs.findIndex((faq) => faq.defaultOpen);
    return defaultIndex !== -1 ? defaultIndex : null;
  });

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 md:p-8 bg-white shadow-sm">
      <ScrollAnimation animation="fadeInLeft" delay={0.2}>
        <h2 className="text-[17px] sm:text-[23px] md:text-[29px] font-bold text-lv-blue mb-6 text-shadow-blue">
          {data.faqHeading}
        </h2>
      </ScrollAnimation>

      <div className="space-y-3">
        {data.faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * FAQ Item Component
 * Individual expandable FAQ item
 */
function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <ScrollAnimation animation="fadeInLeft" delay={0.3 + index * 0.1}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button
          onClick={onToggle}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <span className="text-lv-blue font-semibold text-sm flex-1 pr-4">
            {faq.question}
          </span>
          <div className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
            <svg
              className="w-5 h-5 text-lv-red"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-[#6b7280] text-sm leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}

