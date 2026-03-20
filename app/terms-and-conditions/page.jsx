import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export const metadata = {
  title: "Terms and Conditions - Las Vegas Designs USA",
  description:
    "Read our terms and conditions for custom digital services including embroidery digitizing, vector artwork, SVG, CNC, and laser cut services.",
};

const sections = [
  { id: "acceptance", label: "Acceptance" },
  { id: "services", label: "Services" },
  { id: "orders-payments", label: "Orders and payments" },
  { id: "customer-responsibilities", label: "Customer responsibilities" },
  { id: "turnaround-time", label: "Turnaround time" },
  { id: "revisions", label: "Revisions" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "limitation-liability", label: "Limitation of liability" },
  { id: "refunds", label: "Refunds" },
  { id: "contact", label: "Contact" },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      <section className="bg-white py-10 md:py-14 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-10 md:mb-12">
            <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
              Terms and Conditions
            </span>

            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Terms for our custom digital services
            </h1>

            <p className="mt-4 max-w-3xl text-sm md:text-base text-slate-600">
              These terms explain how our embroidery digitizing, vector and
              SVG artwork, and CNC and laser-ready files are provided, and what
              both parties agree to when placing an order with Las Vegas Designs
              USA.
            </p>

            {/* Meta Info Bar */}
            <div className="mt-6 flex flex-wrap gap-3 text-xs md:text-sm">
              <MetaPill label="Last updated" value="Jan 2026" />
              <MetaPill label="Applies to" value="All services" />
              <div className="flex gap-2">
                <Link
                  href="/terms-and-conditions"
                  className="inline-flex items-center rounded-full bg-white/80 text-slate-700 border border-slate-200 px-3 py-1 shadow-xs hover:bg-white/100 transition-colors text-[11px] font-medium"
                >
                  Terms
                </Link>
                <Link
                  href="/privacy-policy"
                  className="inline-flex items-center rounded-full bg-white/80 text-slate-700 border border-slate-200 px-3 py-1 shadow-xs hover:bg-white/100 transition-colors text-[11px] font-medium"
                >
                  Privacy
                </Link>
              </div>
            </div>
          </header>

          <div className="grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)] items-start">
            {/* Main content */}
            <div>
              {/* Feature cards row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6 mb-10 md:mb-12">
                <FeatureCard
                  title="Digital services"
                  body="All services are delivered digitally. No physical products are shipped."
                />
                <FeatureCard
                  title="Your details"
                  body="Correct and complete order details are required for accurate results."
                />
                <FeatureCard
                  title="Revisions"
                  body="Minor revisions are included based on the original request."
                />
                <FeatureCard
                  title="Liability"
                  body="We are not responsible for production or machine-related outcomes."
                />
              </div>

              {/* Numbered sections */}
              <article className="space-y-8 md:space-y-10 text-sm md:text-base text-slate-700">
                {/* 1. Acceptance of terms */}
                <Section id="acceptance" number="1" title="Acceptance of terms">
                  <p>
                    By placing an order with Las Vegas Designs USA, you confirm
                    that you have read, understood, and agreed to these Terms
                    and Conditions. If you do not agree, please do not use our
                    services.
                  </p>
                </Section>

                {/* 2. Services provided */}
                <Section id="services" number="2" title="Services provided">
                  <p className="mb-4">
                    Las Vegas Designs USA provides custom digital services only,
                    including:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Embroidery digitizing</li>
                    <li>Vector and SVG artwork</li>
                    <li>CNC and laser-ready files</li>
                  </ul>
                  <p>
                    All services are delivered digitally in the requested file
                    formats. We do not sell physical products, embroidered
                    items, patches, prints, or finished goods.
                  </p>
                </Section>

                {/* 3. Orders and payments */}
                <Section
                  id="orders-payments"
                  number="3"
                  title="Orders and payments"
                >
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Orders are processed after payment confirmation</li>
                    <li>
                      Pricing is based on complexity, size, and service
                      requirements
                    </li>
                    <li>
                      Major changes after work has started may require
                      additional charges
                    </li>
                    <li>
                      Files may remain locked until payment is successfully
                      completed
                    </li>
                  </ul>
                  <p>
                    We reserve the right to refuse or cancel orders with
                    unclear, incomplete, unrealistic, or conflicting
                    instructions.
                  </p>
                </Section>

                {/* 4. Customer responsibilities */}
                <Section
                  id="customer-responsibilities"
                  number="4"
                  title="Customer responsibilities"
                >
                  <p className="mb-4">
                    Customers must provide accurate, complete, and final
                    information at the time of order placement. Responsibilities
                    vary by service type.
                  </p>
                  <p className="mb-3 font-semibold text-slate-900">
                    Embroidery digitizing
                  </p>
                  <p className="mb-3">Customers must provide:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-6">
                    <li>Artwork or reference files</li>
                    <li>Final size and placement</li>
                    <li>Color and stitch preferences</li>
                    <li>Embroidery machine type and required file format</li>
                    <li>Fabric type and intended application</li>
                  </ul>
                  <p className="mb-3 font-semibold text-slate-900">
                    Vector and SVG services
                  </p>
                  <p className="mb-3">Customers must provide:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-6">
                    <li>Source image or artwork for conversion</li>
                    <li>Required output format and color mode</li>
                    <li>
                      Intended use, such as printing, cutting, or digital
                      display
                    </li>
                    <li>Final size, scaling needs, and detail preferences</li>
                  </ul>
                  <p className="mb-3 font-semibold text-slate-900">
                    CNC and laser-ready files
                  </p>
                  <p className="mb-3">Customers must specify:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Material type and thickness</li>
                    <li>Cut, engrave, or score instructions</li>
                    <li>
                      Kerf, tolerance, or bridge requirements if applicable
                    </li>
                    <li>Machine or software compatibility details</li>
                  </ul>
                  <p>
                    Las Vegas Designs USA is not responsible for errors, delays,
                    or additional work caused by missing, incorrect, or unclear
                    information. Changes requested due to incomplete details may
                    be treated as revisions or new orders.
                  </p>
                </Section>

                {/* 5. Turnaround time */}
                <Section
                  id="turnaround-time"
                  number="5"
                  title="Turnaround time"
                >
                  <p>
                    Turnaround times are estimates only and may vary depending
                    on workload, complexity, and revision requests. Rush
                    delivery is subject to availability and approval.
                  </p>
                </Section>

                {/* 6. Revisions */}
                <Section id="revisions" number="6" title="Revisions">
                  <p className="mb-4">
                    Minor revisions are included unless stated otherwise. These
                    include small corrections that do not alter the overall
                    structure of the design.
                  </p>
                  <p>
                    Major revisions, redesigns, or requests outside the original
                    instructions may require additional charges or be treated as
                    new orders.
                  </p>
                </Section>

                {/* 7. Intellectual property */}
                <Section
                  id="intellectual-property"
                  number="7"
                  title="Intellectual property"
                >
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>You retain ownership of all artwork you submit</li>
                    <li>We do not claim ownership of customer designs</li>
                    <li>
                      You confirm you have the legal right to use and digitize
                      the artwork
                    </li>
                  </ul>
                  <p>
                    Customers are responsible for copyright and trademark
                    compliance. Las Vegas Designs USA is not liable for
                    third-party rights violations related to customer-provided
                    content.
                  </p>
                </Section>

                {/* 8. Limitation of liability */}
                <Section
                  id="limitation-liability"
                  number="8"
                  title="Limitation of liability"
                >
                  <p className="mb-4">
                    We provide professionally prepared digital files, but we are
                    not responsible for final production results.
                  </p>
                  <p className="mb-3">This includes issues related to:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Machine settings or limitations</li>
                    <li>Fabric behavior</li>
                    <li>Thread quality or tension</li>
                    <li>Stabilizers or backing materials</li>
                    <li>Hooping, trimming, or production techniques</li>
                  </ul>
                  <p>
                    Testing files on your own machine and material is the
                    customer's responsibility.
                  </p>
                </Section>

                {/* 9. Refunds */}
                <Section id="refunds" number="9" title="Refunds">
                  <p className="mb-4">
                    Refunds are governed by our{" "}
                    <Link
                      href="/refund-policy"
                      className="text-lv-blue hover:text-lv-blue-light underline underline-offset-2"
                    >
                      Refund Policy
                    </Link>
                    . Because all services are custom and digital, refunds are
                    limited, and revisions are always attempted first.
                  </p>
                  <p>
                    Please review the refund policy before placing an order.
                  </p>
                </Section>

                {/* 10. Contact */}
                <Section id="contact" number="10" title="Contact">
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
                    title="Custom files"
                    body="Each file is created based on your artwork and instructions."
                  />
                  <SummaryItem
                    index="02"
                    title="Revisions first"
                    body="Fixes and adjustments are attempted before refunds."
                  />
                  <SummaryItem
                    index="03"
                    title="Testing required"
                    body="Files must be tested prior to production."
                  />
                  <SummaryItem
                    index="04"
                    title="Fair rules"
                    body="Clear expectations for services, delivery, and responsibilities."
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
                Need help with terms or an order?
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-xl">
                Send us your details and any relevant order information. Most
                questions are resolved quickly with a simple clarification.
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
