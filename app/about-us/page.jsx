import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import Link from "next/link";
import { IoCheckmarkCircle } from "react-icons/io5";

export const metadata = {
  title: "About Us - Las Vegas Designs USA",
  description:
    "Clean files, no surprises. We help shops and creators with embroidery digitizing, vector and SVG artwork, and CNC and laser files that run smoothly in real production.",
};

const expectItems = [
  {
    code: "EX",
    label: "Experience driven",
    description:
      "We build files for real stitching and real cutting, not just looks on screen.",
  },
  {
    code: "QC",
    label: "Quality checks",
    description:
      "We review paths, node count, stitch flow, trims, and readability at final size.",
  },
  {
    code: "MR",
    label: "Machine ready",
    description:
      "Delivered in the formats you need, sized properly, with clean exports.",
  },
  {
    code: "SUP",
    label: "Fast support",
    description:
      "Quick replies, and adjustments when something needs a small tweak.",
  },
];

const heroPills = [
  { bold: "Manual work", text: "not auto traced" },
  { bold: "Machine ready", text: "formats included" },
  { bold: "Fast support", text: "friendly communication" },
  { bold: "Revisions", text: "when needed" },
];

const whoWeAreBullets = [
  "Embroidery digitizing for hats, left chest, jacket backs, patches, 3D puff, applique.",
  "Vector and SVG cleanup for printing, cutting, DTF, and screen printing workflows.",
  "CNC and laser cut files with separated layers for cut, score, and engraving.",
];

const whatMakesDifferentBullets = [
  "Smooth curves and tidy nodes, so cutters move cleanly.",
  "Smart stitch direction and trim planning, so embroidery stays readable.",
  "Layer separation for cut, score, and engraving, so production is simple.",
  "Clear naming and organization, so you can find what you need fast.",
];

const workflowSteps = [
  {
    num: "01",
    title: "Review your artwork",
    description:
      "We check detail level, size goals, and the best approach for your machine and material.",
  },
  {
    num: "02",
    title: "Build clean structure",
    description:
      "We create clean geometry, stitch logic, or cut paths so the file runs correctly.",
  },
  {
    num: "03",
    title: "Export checks",
    description:
      "We verify output, formats, and sizing before delivery so you get a ready file.",
  },
  {
    num: "04",
    title: "Support and adjustments",
    description:
      "If something needs a tweak, we adjust and resend. Quick replies and clear communication.",
  },
];

const whoWeServeCards = [
  {
    title: "Embroidery shops",
    description:
      "Caps, polos, jackets, patches, and production runs with clean stitchouts.",
  },
  {
    title: "Print shops",
    description:
      "Vector cleanup, DTF ready files, and screen printing separations when needed.",
  },
  {
    title: "Laser and CNC users",
    description:
      "Cut and engraving layers, bridge planning, and smooth paths for cleaner jobs.",
  },
  {
    title: "Small businesses",
    description:
      "Branding, uniforms, merch, and consistent files you can reuse anytime.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      {/* Hero: Clean files, no surprises – two-column layout per design */}
      <section className="bg-[#F8F8FA] py-6 md:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center rounded-full bg-[#FFE6E6] border border-red-400 text-[#C80000] text-[11px] font-bold tracking-wide uppercase px-3 py-1.5">
                About us
              </span>
              <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
                Clean files, no surprises
              </h1>
              <p className="mt-4 max-w-2xl text-base md:text-lg text-[#646464] leading-relaxed">
                Las Vegas Designs USA helps shops and creators with embroidery
                digitizing, vector and SVG artwork, and CNC and laser files that
                run smoothly in real production.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {heroPills.map((pill) => (
                  <span
                    key={pill.bold}
                    className="inline-flex items-center rounded-full bg-[#EBEBEB] text-[#1E1E1E] text-sm px-4 py-2"
                  >
                    <span className="font-bold">{pill.bold}</span>
                    <span className="ml-1.5 font-normal text-[#646464]">
                      {pill.text}
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-end lg:self-start">
              <div className="w-full max-w-md bg-[#F0F0F0] rounded-2xl shadow-md p-5 md:p-6">
                <h2 className="text-lg font-bold text-[#1E1E1E] mb-2">
                  What you can expect
                </h2>
                <p className="text-sm text-[#646464] mb-4 leading-relaxed">
                  A consistent workflow across all services, clear delivery, and
                  files that behave the way you expect.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {expectItems.map((item) => (
                    <div
                      key={item.code}
                      className="bg-white rounded-xl border border-slate-100 shadow-sm p-3"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#3C5064] flex items-center justify-center text-white font-bold text-xs shrink-0 mb-2">
                        {item.code}
                      </div>
                      <p className="font-bold text-[#1E1E1E] text-xs mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-[#646464] leading-snug">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are / What makes our files different – two card columns */}
      <section className="py-8 md:py-10 lg:py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-gray-100 rounded-xl border border-slate-200 shadow-md p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                Who we are
              </h2>
              <p className="text-slate-600 text-sm md:text-base mb-4 leading-relaxed">
                We are a digital production focused studio. We create files that
                are ready for real machines and real workflows—embroidery,
                vector art, and CNC or laser cutting.
              </p>
              <ul className="space-y-4">
                {whoWeAreBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <IoCheckmarkCircle
                        className="text-success"
                        size={18}
                      />
                    </span>
                    <span className="text-slate-700 text-sm md:text-base leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 rounded-xl border border-slate-200 shadow-md p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                What makes our files different
              </h2>
              <p className="text-slate-600 text-sm md:text-base mb-4 leading-relaxed">
                We focus on clean geometry and clean stitch logic. Files are
                built so they run correctly the first time and stay easy to
                edit when you need changes.
              </p>
              <ul className="space-y-4">
                {whatMakesDifferentBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <IoCheckmarkCircle
                        className="text-success"
                        size={18}
                      />
                    </span>
                    <span className="text-slate-700 text-sm md:text-base leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How we work – workflow + CTA */}
      <section className="py-8 md:py-10 lg:py-12 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-lv-red text-white text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5">
            Workflow
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900">
            How we work
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600 text-sm md:text-base leading-relaxed">
            A consistent process keeps results predictable. We keep it simple,
            review your artwork, build the file properly, check the output, and
            support you if adjustments are needed.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {workflowSteps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-xl border border-slate-200 shadow-md p-5 flex flex-col"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="shrink-0 inline-flex items-center justify-center rounded-lg bg-white border border-lv-red px-2 py-1">
                    <span className="text-xl font-bold text-lv-red">{step.num}</span>
                  </span>
                  <h3 className="text-slate-800 font-bold text-base pt-0.5">
                    {step.title}
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA banner – full width at bottom of section */}
          <div className="mt-6 relative rounded-2xl bg-gray-100 border border-slate-200 shadow-md p-6 md:p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lv-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="text-slate-800 text-sm md:text-base max-w-xl leading-relaxed">
                <span className="font-bold text-slate-900">Ready to get started?</span>{" "}
                Send your artwork, size, and format. We will reply with a clear
                price and the right plan for your project.
              </p>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/embroidery-pricing"
                  className="inline-flex items-center justify-center rounded-full bg-gray-200 border border-slate-300 text-slate-800 px-6 py-3 text-sm font-semibold hover:bg-gray-300 transition-colors duration-200"
                >
                  View pricing
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-lv-red text-white px-6 py-3 text-sm font-semibold shadow-md hover:bg-lv-red-dark transition-all duration-200"
                >
                  Get a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-8 md:py-10 lg:py-12 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-lv-red text-white text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5">
            Customers
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900">
            Who we serve
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600 text-sm md:text-base leading-relaxed">
            We work with shops and creators who need reliable digital files for
            production and repeat use.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoWeServeCards.map((card) => (
              <div
                key={card.title}
                className="bg-gray-50 rounded-xl border border-slate-200 shadow-md p-6 text-left"
              >
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}
