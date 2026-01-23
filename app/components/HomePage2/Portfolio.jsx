import React from "react";
import DigitizingSlider from "../Sliders/DigitizingSlider.jsx/DigitizingSlider";

function Portfolio() {
  return (
    <section className="py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          Our Digitizing Portfolio
        </h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto px-3">
          These digitized files are the exclusive property of Las Vegas Designs
          USA and their respective clients. Images are for viewing purposes
          only. Please do not use without permission.
        </p>
      </div>

      <DigitizingSlider />
    </section>
  );
}

export default Portfolio;
