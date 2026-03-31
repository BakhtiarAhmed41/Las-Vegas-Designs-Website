import React from "react";
import QuoteForm from "../QuoteForm/QuoteForm";
import FaqSection from "./FaqSection";
import ScrollAnimation from "../UI/ScrollAnimation";

function ContactSection() {
  return (
    <section className="bg-white py-10 md:py-14 lg:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-4 md:p-6">
              <FaqSection />
            </div>
          </ScrollAnimation>
          <ScrollAnimation animation="fadeInUp" delay={0.08}>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-4 md:p-6">
              <QuoteForm />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

