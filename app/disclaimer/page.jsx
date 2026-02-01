import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export const metadata = {
  title: "Disclaimer - Las Vegas Designs USA",
  description:
    "Read our disclaimer for custom digital services including embroidery digitizing, vector artwork, SVG, CNC, and laser cut services.",
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "website-information", label: "Website information" },
  { id: "digital-files", label: "Digital files and production results" },
  { id: "customer-responsibilities", label: "Customer responsibilities" },
  { id: "limits-liability", label: "Limits of liability" },
  { id: "third-party", label: "Third party tools and platforms" },
  { id: "no-legal-advice", label: "No legal advice" },
  { id: "contact", label: "Contact" },
];

export default function DisclaimerPage() {
  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      <section className="bg-slate-50 py-10 md:py-14 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-10 md:mb-12">
            <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
              Disclaimer
            </span>

            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Disclaimer for custom digital services
            </h1>

            <p className="mt-4 max-w-3xl text-sm md:text-base text-slate-600">
              This page explains important limits and responsibilities when
              using our website and digital files. Production results can vary,
              so testing and proper setup are always recommended.
            </p>

            {/* Meta Info Bar */}
            <div className="mt-6 flex flex-wrap gap-3 text-xs md:text-sm">
              <MetaPill label="Last updated" value="January 2026" />
              <MetaPill label="Applies to" value="Digital services only" />
              <MetaPill
                label="Contact"
                value="info@lasvegasdesignsusa.com"
                type="link"
                href="mailto:info@lasvegasdesignsusa.com"
              />
              <MetaPill label="Reference" value="disclaimer" />
            </div>
          </header>

          <div className="grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)] items-start">
            {/* Main content */}
            <div>
              {/* Feature cards row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6 mb-10 md:mb-12">
                <FeatureCard
                  title="General information only"
                  body="Content on this website is provided for general informational purposes and may change over time."
                />
                <FeatureCard
                  title="Digital files as delivered"
                  body="All digital files are delivered based on the instructions and source material provided. Final results depend on your machine settings, materials, and production environment."
                />
                <FeatureCard
                  title="Always test first"
                  body="We strongly recommend running a test sample before full production to confirm sizing, stitch density, cut lines, and final output quality."
                />
                <FeatureCard
                  title="Support available"
                  body="Support is available for adjustments within the agreed scope of your order. Contact us if something looks incorrect before production."
                />
              </div>

              {/* Numbered sections */}
              <article className="space-y-8 md:space-y-10 text-sm md:text-base text-slate-700">
                {/* 1. Overview */}
                <Section id="overview" number="1" title="Overview">
                  <p className="mb-4">
                    Las Vegas Designs USA provides custom digital services such
                    as embroidery digitizing, vector and SVG artwork, and CNC,
                    laser, and engraving ready files.
                  </p>
                  <p>
                    By using our website, placing an order, or using delivered
                    files, you acknowledge and accept the terms outlined in
                    this Disclaimer.
                  </p>
                </Section>

                {/* 2. Website information */}
                <Section
                  id="website-information"
                  number="2"
                  title="Website information"
                >
                  <p>
                    Information on this website is provided for general purposes
                    only. While we make reasonable efforts to keep content
                    accurate and up to date, we do not guarantee completeness,
                    reliability, or suitability for every use case.
                  </p>
                </Section>

                {/* 3. Digital files and production results */}
                <Section
                  id="digital-files"
                  number="3"
                  title="Digital files and production results"
                >
                  <p className="mb-4">
                    Digital file outcomes can vary depending on tools, materials,
                    and settings used.
                  </p>
                  <p className="mb-3">This includes but is not limited to:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-6">
                    <li>
                      <span className="font-semibold">Embroidery files:</span>{" "}
                      Results depend on fabric type, stabilizer, hooping method,
                      thread quality, needle selection, tension, speed, and
                      machine calibration.
                    </li>
                    <li>
                      <span className="font-semibold">Vector and SVG files:</span>{" "}
                      Results depend on software compatibility, scaling,
                      printing methods, color profiles, and output devices.
                    </li>
                    <li>
                      <span className="font-semibold">CNC and laser files:</span>{" "}
                      Results depend on material thickness, kerf, power, speed,
                      focus, toolpath settings, and machine tuning.
                    </li>
                  </ul>
                  <div className="bg-slate-50 border-l-4 border-lv-red pl-4 py-3 rounded-r">
                    <p className="font-semibold text-slate-900 mb-1">
                      Important note
                    </p>
                    <p>
                      Always run a test sample before full production. Testing
                      helps confirm sizing, placement, stitch density, cut
                      accuracy, and final appearance.
                    </p>
                  </div>
                </Section>

                {/* 4. Customer responsibilities */}
                <Section
                  id="customer-responsibilities"
                  number="4"
                  title="Customer responsibilities"
                >
                  <p className="mb-4">Customers are responsible for:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Providing accurate instructions, measurements, and high
                      quality source files
                    </li>
                    <li>
                      Reviewing any notes, previews, or instructions provided
                    </li>
                    <li>Testing files before production</li>
                    <li>Using appropriate machine settings and materials</li>
                    <li>
                      Ensuring files are suitable for their specific equipment
                    </li>
                  </ul>
                </Section>

                {/* 5. Limits of liability */}
                <Section
                  id="limits-liability"
                  number="5"
                  title="Limits of liability"
                >
                  <p className="mb-4">
                    To the maximum extent permitted by applicable law, Las Vegas
                    Designs USA is not responsible for production losses,
                    material waste, machine damage, or business interruption
                    resulting from the use of delivered files.
                  </p>
                  <p>
                    This includes issues caused by incorrect setup, machine
                    calibration, software configuration, or usage outside the
                    agreed scope of work.
                  </p>
                </Section>

                {/* 6. Third party tools and platforms */}
                <Section
                  id="third-party"
                  number="6"
                  title="Third party tools and platforms"
                >
                  <p className="mb-4">
                    Payments and certain services may be handled through third
                    party platforms. Las Vegas Designs USA is not responsible
                    for the availability, policies, or practices of third party
                    services.
                  </p>
                  <p>
                    Customers are encouraged to review third party terms and
                    privacy policies independently.
                  </p>
                </Section>

                {/* 7. No legal advice */}
                <Section
                  id="no-legal-advice"
                  number="7"
                  title="No legal advice"
                >
                  <p>
                    This Disclaimer is provided for informational purposes only
                    and does not constitute legal advice. If you require legal
                    guidance for your jurisdiction or business operations,
                    consult a qualified legal professional.
                  </p>
                </Section>

                {/* 8. Contact */}
                <Section id="contact" number="8" title="Contact">
                  <p className="mb-3">
                    If you have questions about this Disclaimer or need
                    assistance with a file issue, contact us at:
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href="mailto:info@lasvegasdesignsusa.com"
                      className="text-lv-blue hover:text-lv-blue-light underline underline-offset-2"
                    >
                      info@lasvegasdesignsusa.com
                    </a>
                  </p>
                  <p>
                    Please include your order number if applicable to help us
                    respond faster.
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
                    title="Results may vary"
                    body="Final output depends on machine calibration, material selection, software settings, and production conditions."
                  />
                  <SummaryItem
                    index="02"
                    title="Test before production"
                    body="Always run a test stitch or cut before starting full production to avoid material waste."
                  />
                  <SummaryItem
                    index="03"
                    title="No legal advice"
                    body="This disclaimer is for clarity only and does not constitute legal advice."
                  />
                  <SummaryItem
                    index="04"
                    title="Contact first"
                    body="If you experience issues, contact us first so we can review and assist where possible."
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
                Need help with a file or settings?
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-xl">
                Send your order details and describe what you are trying to
                produce. Most issues are resolved quickly with a small
                adjustment.
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
