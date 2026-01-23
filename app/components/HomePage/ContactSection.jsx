import React from "react";
import QuoteForm from "../QuoteForm/QuoteForm";
import FaqSection from "./FaqSection";

function ContactSection() {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-wrap justify-center gap-10 max-w-7xl">
        <FaqSection />
        <QuoteForm />
      </div>
    </div>
  );
}

export default ContactSection;
