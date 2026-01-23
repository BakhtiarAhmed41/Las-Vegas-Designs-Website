import React from "react";
import DigitizingSlider from "../Sliders/DigitizingSlider.jsx/DigitizingSlider";

function DigitizingPortfolio() {
  return (
    <section className="py-10">
      <div className="flex flex-col items-center pb-10 gap-y-10 px-5 md:px-10">
        <h3 className="text-lv-red text-4xl font-bold text-center ">
          Digitizing Portfolio
        </h3>
        <p className="text-center text-lg font-semibold">
          These digitized files are the exclusive property of Las Vegas Designs
          USA and their respective clients. Images are for viewing purposes
          only. Please do not use without permission.
        </p>
      </div>
      <DigitizingSlider />
    </section>
  );
}

export default DigitizingPortfolio;
