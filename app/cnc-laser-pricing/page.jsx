"use client";

import React, { useState } from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import PricingHero from "../components/Pricing/PricingHero";
import ScrollAnimation from "../components/UI/ScrollAnimation";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import Link from "next/link";
import { FiClock, FiEdit, FiCheckCircle, FiInfo, FiChevronDown } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function CncLaserPricingPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What makes a design complex?",
      answer:
        "Fine details, small cut areas, bridges, layers, and material limitations.",
    },
    {
      question: "Do you prepare files for specific machines?",
      answer:
        "Yes. Files are optimized for CNC routers, laser cutters, plasma, and stencils.",
    },
    {
      question: "Are revisions included?",
      answer:
        "Yes. Minor revisions are included to ensure clean and safe cutting.",
    },
    {
      question: "Will you add bridges for stencil designs?",
      answer:
        "Yes. Bridges are added where required for strength and stability.",
    },
    {
      question: "What file formats will I receive?",
      answer:
        "SVG, DXF, AI, and EPS, ready for cutting.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "All files are custom made. Issues are handled through revisions first, and refunds are only considered if the service cannot be completed as agreed.",
    },
  ];

  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      <section className="bg-slate-50 py-10 md:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <PricingHero
              title="CNC, Laser, Plasma & Stencil pricing"
              intro={`Pick a starting plan below. If your artwork needs cleanup, bridge planning, or extra detailing, request a quote and we will review first.`}
              tabs={[
                { href: "/embroidery-pricing", label: "Embroidery Digitizing" },
                { href: "/vector-svg-pricing", label: "Vector and SVG" },
                { href: "/cnc-laser-pricing", label: "CNC and Laser Files" },
              ]}
              activeIndex={2}
              tip={`If you are not sure, pick the middle plan. We can adjust after review.`}
              features={[
                { badge: "24", label: "Typical turnaround", text: "Most standard jobs delivered within 12 to 24 hours. Rush available on request." },
                { badge: "QC", label: "Free Adjustments", text: "Minor adjustments available for most cutting formats (SVG, DXF, AI, etc.)." },
                { badge: "QC", label: "Quality checks", text: "Clean paths, proper kerf, bridges, and safe cutting at final size." },
                { badge: "OK", label: "Edits included", text: "If something needs a tweak, we adjust and resend. Keep your order number for tracking." },
              ]}
            />
          </ScrollAnimation>

          {/* Pricing Cards */}
          <ScrollAnimation animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              <PricingCard
                title="Simple Cut Files"
                subtitle="Basic cutting files for simple shapes and designs."
                price="$20"
                maxPrice="Up to $40"
                maxSize="Any size"
                features={[
                  "Simple cut file preparation",
                  "Clean paths and outlines",
                  "SVG, DXF, AI formats",
                  "Turnaround 6-12 Hrs",
                  "Urgent option available, $5 extra",
                ]}
              />
              <PricingCard
                title="Complex Cut Files"
                subtitle="Detailed cutting files with bridges, layers, and complex paths."
                price="$35"
                maxPrice="Subject to complexity"
                maxSize="Subject to complexity"
                features={[
                  "Complex cut file preparation",
                  "Bridges and support structures",
                  "Multiple layer optimization",
                  "Support turnaround 12 to 24 hours",
                  "Urgent turnaround depends on detail level",
                ]}
              />
              <PricingCard
                title="Stencil & Engraving"
                subtitle="Stencil designs with bridges and engraving files for detailed work."
                price="$30"
                maxPrice="Subject to complexity"
                maxSize="Subject to complexity"
                features={[
                  "Stencil design with bridges",
                  "Engraving file preparation",
                  "Material-specific optimization",
                  "Support turnaround 12 to 24 hours",
                  "Pricing based on detail level and complexity",
                ]}
              />
            </div>
          </ScrollAnimation>

          {/* Informational Boxes */}
          <ScrollAnimation animation="fadeInUp" delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <InfoBox
                title="What affects the price"
                text="Complexity, number of cut paths, bridges required, material thickness, kerf settings, and how clean the source artwork is. Clear source files result in lower pricing."
                subBoxes={[
                  {
                    title: "Clean artwork",
                    items: ["Better result and faster delivery", "Low cost"],
                    type: "positive",
                  },
                  {
                    title: "More detail",
                    items: ["More time consuming", "More cost"],
                    type: "warning",
                  },
                ]}
              />
              <InfoBox
                title="What you always get"
                text="We provide machine-ready files, simple support for edits, and clean results that cut properly. If you need multiple formats, tell us at once and we include them."
                subBoxes={[
                  {
                    title: "Formats included",
                    items: ["SVG", "DXF", "AI", "EPS", "and more"],
                    type: "info",
                  },
                  {
                    title: "Support included",
                    items: ["Minor fixes and adjustments if needed"],
                    type: "info",
                  },
                ]}
              />
            </div>
          </ScrollAnimation>

          {/* CTA Section */}
          <ScrollAnimation animation="fadeInUp" delay={0.3}>
            <div className="text-center mb-16 bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-lv-blue mb-3">
                Need an exact quote for your file?
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Send your image and tell us the material and machine type. We reply fast
                with the right plan and price.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="#faqs"
                  className="inline-flex items-center justify-center rounded-full bg-white border-2 border-lv-red text-lv-red px-8 py-3 text-sm font-semibold shadow-md hover:bg-lv-red hover:text-white transition-all duration-300"
                >
                  Read FAQs
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-lv-red px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-lv-red-dark hover:shadow-lg transition-all duration-300"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </ScrollAnimation>

          {/* How It Works Section */}
          <HowItWorksSection />

          {/* FAQs Section */}
          <FAQsSection
            id="faqs"
            title="Common questions"
            intro="Quick answers about pricing, turnaround, edits, and what we need from you."
            faqs={faqs}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}

// Reusable Components
function FeatureItem({ iconBadge, label, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-lv-red rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
        {iconBadge}
      </div>
      <div className="flex-1">
        <p className="font-bold text-lv-blue text-sm mb-1">{label}</p>
        <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function PricingCard({
  title,
  subtitle,
  price,
  maxPrice,
  maxSize,
  features,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-slate-200 hover:border-lv-red/30">
      <h3 className="text-xl font-bold text-lv-blue mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed">{subtitle}</p>
      <div className="mb-5 pb-4 border-b border-slate-200">
        <span className="text-5xl font-bold text-lv-red">{price}</span>
        <p className="text-xs text-slate-500 mt-1 font-medium">starting price</p>
      </div>
      <div className="text-sm text-slate-700 mb-5 space-y-2 bg-slate-50 rounded-lg p-3">
        <p className="flex justify-between">
          <span className="font-semibold text-slate-900">Maximum price:</span>
          <span className="text-slate-700">{maxPrice}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-slate-900">Maximum size:</span>
          <span className="text-slate-700">{maxSize}</span>
        </p>
      </div>
      <ul className="space-y-3 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <IoCheckmarkCircle className="text-lv-red flex-shrink-0 mt-0.5 w-5 h-5" />
            <span className="text-sm text-slate-700 leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoBox({ title, text, subBoxes }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-bold text-lv-blue mb-3">{title}</h3>
      <p className="text-sm text-slate-600 mb-5 leading-relaxed">{text}</p>
      <div className="grid grid-cols-2 gap-4">
        {subBoxes.map((box, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl ${box.type === "positive"
              ? "bg-green-50 border-2 border-green-300 shadow-sm"
              : box.type === "warning"
                ? "bg-red-50 border-2 border-red-300 shadow-sm"
                : "bg-slate-50 border-2 border-slate-300 shadow-sm"
              }`}
          >
            <p className="font-bold text-sm mb-1 text-slate-900">{box.title}</p>
            {box.title === "Formats included" ? (
              <p className="text-xs text-slate-700 leading-tight">
                {box.items.join(" | ")}
              </p>
            ) : (
              <ul className="space-y-1">
                {box.items.map((item, i) => (
                  <li key={i} className="text-xs text-slate-700 leading-tight">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Send Your Design",
      items: [
        "Upload your logo, photo, sketch, or idea",
        "Choose the service you need",
      ],
      buttonText: "Upload Design",
      buttonLink: "/contact",
    },
    {
      number: "2",
      title: "Get a Clear Quote",
      items: ["Fixed price shown upfront", "Pay the invoice to begin"],
      buttonText: "Get Quote",
      buttonLink: "/contact",
    },
    {
      number: "3",
      title: "Receive Your Files",
      items: ["Files delivered on time", "Minor edits included"],
      buttonText: "Get Files",
      buttonLink: "/contact",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-lv-blue text-center mb-3">
        How It Works
      </h2>
      <p className="text-center text-slate-600 mb-8">
        Simple pricing, step by step you get the price upfront before you
        proceed.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:border-lv-red/30"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-lv-red to-lv-red-dark text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-5 shadow-md">
              {step.number}
            </div>
            <h3 className="text-lg font-bold text-lv-blue mb-4">
              {step.title}
            </h3>
            <ul className="text-left space-y-2.5 mb-6">
              {step.items.map((item, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                  <IoCheckmarkCircle className="text-lv-red flex-shrink-0 mt-0.5 w-4 h-4" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={step.buttonLink}
              className="inline-block w-full rounded-full bg-lv-red px-6 py-3 text-sm font-semibold text-white hover:bg-lv-red-dark shadow-md hover:shadow-lg transition-all duration-300"
            >
              {step.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQsSection({ id, title, intro, faqs, openIndex, setOpenIndex }) {
  return (
    <section id={id} className="mb-12">
      <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
        FAQs
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-lv-blue mt-4 mb-3">
        {title}
      </h2>
      <p className="text-slate-600 mb-8">{intro}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-lv-blue pr-4">{faq.question}</span>
              <FiChevronDown
                className={`text-lv-red transition-transform flex-shrink-0 ${openIndex === index ? "rotate-180" : ""
                  }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
