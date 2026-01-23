import React from "react";
import QuoteForm from "../QuoteForm/QuoteForm";
import FAQs from "./FAQs";

function Contact() {
  return (
    <section className="py-10 md:py-16 lg:pt-20 xl:pb-0 ">
      <div className="flex justify-center mt-5">
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-10 max-w-7xl">
          <FAQs />
          <div className="flex-1 lg:min-w-[700px] lg:max-w-[800px]">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
