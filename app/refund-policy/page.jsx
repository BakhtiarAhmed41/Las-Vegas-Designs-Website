import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export const metadata = {
  title: "Refund Policy - Las Vegas Designs USA",
  description:
    "Learn about our refund policy for custom digital services including embroidery digitizing, vector artwork, SVG, CNC, and laser cut services.",
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "not-applicable", label: "Not applicable" },
  { id: "may-be-considered", label: "May be considered" },
  { id: "revisions", label: "Revisions" },
  { id: "chargebacks", label: "Chargebacks" },
  { id: "contact", label: "Contact" },
];

export default function RefundPolicyPage() {
  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      <section className="bg-slate-50 py-10 md:py-14 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-10 md:mb-12">
            <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
              Refund Policy
            </span>

            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Refunds for custom digital services
            </h1>

            <p className="mt-4 max-w-3xl text-sm md:text-base text-slate-600">
              We always aim to resolve issues through revisions first. Because
              all services are custom-made digital files, refunds follow clear
              conditions and are only considered when a service cannot be
              delivered as agreed.
            </p>

            {/* Meta Info Bar */}
            <div className="mt-6 flex flex-wrap gap-3 text-xs md:text-sm">
              <MetaPill label="Last updated" value="Jan 2026" />
              <MetaPill label="Applies to" value="Digital services only" />
            </div>
          </header>

          <div className="grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)] items-start">
            {/* Main content */}
            <div>
              {/* Feature cards row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6 mb-10 md:mb-12">
                <FeatureCard
                  title="Custom work"
                  body="Every order is custom made."
                />
                <FeatureCard
                  title="Revisions first"
                  body="Most issues are resolved through revisions."
                />
                <FeatureCard
                  title="Digital delivery"
                  body="All services are digital. No physical items are shipped or returned."
                />
                <FeatureCard
                  title="Fair handling"
                  body="All cases are reviewed carefully and handled case by case."
                />
              </div>

              {/* Numbered sections */}
              <article className="space-y-8 md:space-y-10 text-sm md:text-base text-slate-700">
                {/* 1. Overview */}
                <Section id="overview" number="1" title="Overview">
                  <p className="mb-4">
                    Las Vegas Designs USA provides custom digital services
                    including embroidery digitizing, vector and SVG artwork,
                    and CNC or laser-ready files. Because every design is
                    created specifically for the customer, refunds are limited
                    and governed by the conditions below.
                  </p>
                  <p>
                    Once work has started, the service is considered in progress
                    and cannot be reversed. Our priority is always to fix and
                    deliver a usable file through revisions whenever possible.
                  </p>
                </Section>

                {/* 2. When refunds are not applicable */}
                <Section
                  id="not-applicable"
                  number="2"
                  title="When refunds are not applicable"
                >
                  <p className="mb-4">
                    Refunds will not be issued in the following situations:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-6">
                    <li>
                      The order has already been started or delivered
                    </li>
                    <li>
                      The customer changes their mind after placing the order
                    </li>
                    <li>
                      Incorrect, incomplete, or unclear instructions were
                      provided
                    </li>
                    <li>
                      Incorrect size, format, placement, or machine details were
                      supplied
                    </li>
                    <li>
                      The file matches the approved instructions but
                      expectations differ
                    </li>
                    <li>
                      A preview or design direction was approved and later
                      cancelled
                    </li>
                  </ul>
                  <p className="mb-3 font-semibold text-slate-900">
                    Production-related limitations
                  </p>
                  <p className="mb-3">
                    Refunds are not applicable for issues related to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Embroidery machine settings or machine limitations</li>
                    <li>Fabric type or fabric behavior</li>
                    <li>Thread type, thread quality, or tension</li>
                    <li>Stabilizers or backing materials</li>
                    <li>Hooping, trimming, or production methods</li>
                    <li>Production conditions beyond our control</li>
                  </ul>
                  <p className="mt-4">
                    These factors vary by customer setup and are outside the
                    scope of digital file creation.
                  </p>
                </Section>

                {/* 3. When refunds may be considered */}
                <Section
                  id="may-be-considered"
                  number="3"
                  title="When refunds may be considered"
                >
                  <p className="mb-4">
                    Refunds may be considered only in limited cases, such as:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>
                      We are unable to deliver the service due to internal
                      issues
                    </li>
                    <li>
                      The delivered file does not follow the original
                      instructions and cannot be corrected through reasonable
                      revisions
                    </li>
                  </ul>
                  <p>
                    All refund requests are reviewed individually, and revisions
                    are always attempted first.
                  </p>
                </Section>

                {/* 4. Revisions and fixes */}
                <Section
                  id="revisions"
                  number="4"
                  title="Revisions and fixes"
                >
                  <p className="mb-3 font-semibold text-slate-900">
                    Free minor revisions
                  </p>
                  <p className="mb-3">
                    Minor revisions are provided at no additional cost. These
                    include:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-6">
                    <li>Minor stitch or path corrections</li>
                    <li>Slight size adjustments</li>
                    <li>Spacing or alignment fixes</li>
                    <li>
                      Simple text edits that do not change the overall
                      structure
                    </li>
                    <li>
                      Small adjustments to improve stitch flow or clarity
                    </li>
                  </ul>
                  <p className="mb-3 font-semibold text-slate-900">
                    Major revisions
                  </p>
                  <p className="mb-3">
                    Major revisions involve significant changes and may require
                    additional charges. These include:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Redesigning or rebuilding elements</li>
                    <li>Adding new objects or details</li>
                    <li>
                      Major size changes that require re-digitizing
                    </li>
                    <li>Layout or composition modifications</li>
                    <li>Requests outside the original instructions</li>
                  </ul>
                  <p>
                    Any additional charges for major revisions will be
                    communicated and approved before work begins.
                  </p>
                </Section>

                {/* 5. Client responsibility */}
                <Section
                  id="client-responsibility"
                  number="5"
                  title="Client responsibility"
                >
                  <p className="mb-4">
                    Customers are responsible for providing accurate and complete
                    information, including:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Final artwork or reference images</li>
                    <li>Required size and placement</li>
                    <li>File format and machine type</li>
                    <li>Intended fabric and application</li>
                  </ul>
                  <p className="mt-4">
                    Changes due to missing or incorrect information may require
                    additional charges.
                  </p>
                </Section>

                {/* 6. Chargebacks and disputes */}
                <Section
                  id="chargebacks"
                  number="6"
                  title="Chargebacks and disputes"
                >
                  <p className="mb-4">
                    Please contact us before opening a chargeback or dispute.
                    Most issues can be resolved quickly through revisions or
                    file adjustments.
                  </p>
                  <p>
                    Chargebacks initiated without prior communication may result
                    in service suspension or account restrictions.
                  </p>
                </Section>

                {/* 7. Contact */}
                <Section id="contact" number="7" title="Contact">
                  <p className="mb-1">
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href="mailto:sales@lasvegasdesignsusa.com"
                      className="text-lv-blue hover:text-lv-blue-light underline underline-offset-2"
                    >
                      sales@lasvegasdesignsusa.com
                    </a>
                  </p>
                </Section>
              </article>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:space-y-7 lg:sticky lg:top-28">
              {/* Quick summary card */}
              <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Quick summary
                  </h2>
                </div>
                <div className="px-5 py-4 space-y-4 text-xs md:text-sm">
                  <SummaryItem
                    index="01"
                    title="No instant refunds"
                    body="Work begins after order placement and file preparation."
                  />
                  <SummaryItem
                    index="02"
                    title="Fixes included"
                    body="Minor issues are corrected through revisions or file updates."
                  />
                  <SummaryItem
                    index="03"
                    title="Limited eligibility"
                    body="Refunds apply only if delivery is not possible as agreed."
                  />
                  <SummaryItem
                    index="04"
                    title="Contact first"
                    body="Please contact us before opening disputes so we can resolve issues quickly."
                  />
                </div>
              </div>

              {/* On this page / table of contents */}
              <nav className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                  <h2 className="text-sm font-semibold text-slate-900">
                    On this page
                  </h2>
                </div>
                <ul className="px-2 py-2 text-xs md:text-sm">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      >
                        <span>{section.label}</span>
                        <FiChevronRight className="text-slate-400" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>

          {/* Bottom help section - Full width */}
          <div className="mt-10 md:mt-12 rounded-2xl bg-white border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                Need help with a refund or order?
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-xl">
                Send us your details and any relevant order information.
                Most issues are resolved quickly through revisions or file
                adjustments.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/payment"
                className="inline-flex items-center justify-center rounded-full bg-lv-red px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lv-red/90 transition-colors whitespace-nowrap"
              >
                Payment
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 transition-colors whitespace-nowrap"
              >
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}

function MetaPill({ label, value, type, href }) {
  const content = (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 text-slate-700 border border-slate-200 px-3 py-1 shadow-xs">
      <span className="text-[10px] uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="text-[11px] font-medium">{value}</span>
    </span>
  );

  if (type === "link" && href) {
    return (
      <a href={href} className="hover:bg-white/100 transition-colors">
        {content}
      </a>
    );
  }

  return content;
}

function FeatureCard({ title, body }) {
  return (
    <div className="h-full rounded-2xl bg-white border border-slate-100 shadow-sm px-4 py-4 md:px-5 md:py-5">
      <h3 className="text-xs md:text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wide">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
        {body}
      </p>
    </div>
  );
}

function Section({ id, number, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <h2
        id={`${id}-heading`}
        className="flex items-baseline gap-2 text-lg md:text-xl font-semibold text-slate-900 mb-3"
      >
        <span className="text-xs md:text-sm font-semibold text-slate-400">
          {number}.
        </span>
        <span>{title}</span>
      </h2>
      <div className="space-y-3 text-slate-700">{children}</div>
    </section>
  );
}

function SummaryItem({ index, title, body }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5">
        <span className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white text-[10px] font-semibold w-6 h-6">
          {index}
        </span>
      </div>
      <div>
        <p className="text-xs md:text-sm font-semibold text-slate-900">
          {title}
        </p>
        <p className="text-[11px] md:text-xs text-slate-600 mt-0.5 leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
}
