import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export const metadata = {
  title: "Privacy Policy - Las Vegas Designs USA",
  description:
    "Learn how Las Vegas Designs USA collects, uses, and protects your information for embroidery digitizing, vector artwork, SVG, CNC, and laser cut services.",
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "what-we-collect", label: "What information we collect" },
  { id: "how-we-use", label: "How we use your information" },
  { id: "uploads", label: "Uploaded files and confidentiality" },
  { id: "cookies", label: "Cookies and tracking" },
  { id: "sharing", label: "Sharing of information" },
  { id: "retention", label: "Data retention" },
  { id: "security", label: "Security" },
  { id: "your-rights", label: "Your rights" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      <section className="bg-white py-10 md:py-14 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-10 md:mb-12">
            <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
              Privacy Policy
            </span>

            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Privacy for custom digital services
            </h1>

            <p className="mt-4 max-w-3xl text-sm md:text-base text-slate-600">
              We collect only the information required to deliver your custom
              digital files, process payments, and provide order support. Your
              data is handled responsibly, never sold, and customer work remains
              private unless permission is given.
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
            </div>
          </header>

          <div className="grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)] items-start">
            {/* Main content */}
            <div>
              {/* Feature cards row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6 mb-10 md:mb-12">
                <FeatureCard
                  title="Order based collection"
                  body="We collect information only when you place an order, request a quote, or contact us for support. This ensures we have the exact details needed to deliver your files correctly."
                />
                <FeatureCard
                  title="Design file privacy"
                  body="Files you upload such as logos, photos, vectors, or reference images are used only to complete your order. Customer files are never shared publicly without approval."
                />
                <FeatureCard
                  title="Limited data usage"
                  body="Your information is used strictly for service delivery, communication, security, and basic website improvement. We do not collect unnecessary personal data."
                />
                <FeatureCard
                  title="Your control"
                  body="You can request access, correction, or deletion of your personal data and uploaded files, subject to legal or operational requirements."
                />
              </div>

              {/* Numbered sections */}
              <article className="space-y-8 md:space-y-10 text-sm md:text-base text-slate-700">
                {/* 1. Overview */}
                <Section id="overview" number="1" title="Overview">
                  <p className="mb-4">
                    Las Vegas Designs USA provides custom digital services
                    including embroidery digitizing, vector and SVG artwork, and
                    CNC, laser, and engraving ready files.
                  </p>
                  <p>
                    This Privacy Policy explains how we collect, use, protect,
                    and manage personal information when you use our website,
                    place an order, or contact us for support.
                  </p>
                </Section>

                {/* 2. What information we collect */}
                <Section
                  id="what-we-collect"
                  number="2"
                  title="What information we collect"
                >
                  <p className="mb-4">
                    We collect information only when it is necessary to complete
                    your order or assist you. This may include:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Name, email address, phone number, and preferred contact
                      method
                    </li>
                    <li>
                      Order details such as sizes, formats, placement,
                      deadlines, and special instructions
                    </li>
                    <li>
                      Files you upload including logos, photos, sketches,
                      vectors, or screenshots
                    </li>
                    <li>
                      Communication related to revisions, fixes, previews, or
                      re-delivery
                    </li>
                    <li>
                      Basic technical information such as browser type, device
                      type, and approximate location for analytics and security
                    </li>
                  </ul>
                </Section>

                {/* 3. How we use your information */}
                <Section
                  id="how-we-use"
                  number="3"
                  title="How we use your information"
                >
                  <p className="mb-4">Your information is used to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Create and deliver your custom digital files in formats
                      such as DST, PES, JEF, SVG, PNG, DXF, and others
                    </li>
                    <li>Process payments and verify transactions</li>
                    <li>
                      Communicate about order progress, revisions, and support
                      requests
                    </li>
                    <li>
                      Improve website performance and prevent misuse or fraud
                    </li>
                    <li>
                      Meet legal or regulatory requirements when applicable
                    </li>
                  </ul>
                </Section>

                {/* 4. Uploaded files and confidentiality */}
                <Section
                  id="uploads"
                  number="4"
                  title="Uploaded files and confidentiality"
                >
                  <p className="mb-4">
                    Uploaded files may contain personal, brand, or business
                    related content.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Files are used only to complete the requested service</li>
                    <li>
                      We do not publish or share customer work without
                      permission
                    </li>
                    <li>Customer designs are treated as confidential</li>
                    <li>
                      Portfolio or example usage is done only with customer
                      approval
                    </li>
                  </ul>
                </Section>

                {/* 5. Cookies and tracking */}
                <Section
                  id="cookies"
                  number="5"
                  title="Cookies and tracking"
                >
                  <p className="mb-4">
                    Cookies help the website function correctly and improve user
                    experience.
                  </p>
                  <p className="mb-3">We may use:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Essential cookies required for core site functionality</li>
                    <li>
                      Analytics cookies to understand traffic and improve
                      performance
                    </li>
                    <li>
                      Optional marketing cookies if advertising is used
                    </li>
                  </ul>
                  <p>
                    You can control cookies through your browser settings.
                    Disabling cookies may limit certain features.
                  </p>
                </Section>

                {/* 6. Sharing of information */}
                <Section
                  id="sharing"
                  number="6"
                  title="Sharing of information"
                >
                  <p className="mb-4">We do not sell personal information.</p>
                  <p className="mb-3">Information may be shared only with:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Payment processors to securely complete transactions
                    </li>
                    <li>
                      Service providers such as hosting, email delivery,
                      analytics, and security services
                    </li>
                    <li>
                      Legal authorities if required by law or to protect rights
                      and safety
                    </li>
                  </ul>
                </Section>

                {/* 7. Data retention */}
                <Section
                  id="retention"
                  number="7"
                  title="Data retention"
                >
                  <p className="mb-4">
                    We retain information only as long as necessary for:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Completing and supporting your order</li>
                    <li>Handling revisions, fixes, or re-delivery</li>
                    <li>Business records and legal compliance</li>
                  </ul>
                  <p>
                    Uploaded files may be retained for future edits or recovery
                    unless deletion is requested and feasible.
                  </p>
                </Section>

                {/* 8. Security */}
                <Section id="security" number="8" title="Security">
                  <p className="mb-4">
                    We take reasonable measures to protect your data using
                    secure hosting, access controls, and internal safeguards.
                  </p>
                  <p>
                    While no system is completely secure, we actively work to
                    reduce risk and respond quickly to issues.
                  </p>
                </Section>

                {/* 9. Your rights */}
                <Section
                  id="your-rights"
                  number="9"
                  title="Your rights"
                >
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Request access to personal data we hold about you
                    </li>
                    <li>Request correction of inaccurate information</li>
                    <li>
                      Request deletion of personal data or uploaded files,
                      subject to operational or legal limits
                    </li>
                    <li>Unsubscribe from marketing emails at any time</li>
                  </ul>
                </Section>

                {/* 10. Contact */}
                <Section id="contact" number="10" title="Contact">
                  <p className="mb-3">
                    For privacy related questions or requests, contact us at:
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
                  <p>Please include your order number if applicable to help us respond faster.</p>
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
                    title="No selling of data"
                    body="We do not sell, rent, or trade personal information to third parties."
                  />
                  <SummaryItem
                    index="02"
                    title="Files stay private"
                    body="Customer uploads are handled confidentially and used only for the requested service."
                  />
                  <SummaryItem
                    index="03"
                    title="Secure transactions"
                    body="Payments are processed through trusted third party payment processors. We do not store full payment details."
                  />
                  <SummaryItem
                    index="04"
                    title="Contact first"
                    body="If you have any privacy concerns, contact us first so we can resolve them quickly and clearly."
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
                Need help with privacy or an order?
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-xl">
                Send us your details and any relevant order information.
                Most questions are resolved quickly with a simple
                clarification.
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
