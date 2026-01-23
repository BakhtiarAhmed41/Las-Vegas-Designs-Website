import React from "react";
import Hero from "../components/HomePage2/Hero";
import Services from "../components/HomePage2/Service";
import Slider from "../components/ReusableSliderComponent/Slider";
import ReviewCard from "../components/Cards/ReviewCard";
import { reviews } from "../data/reviews";
import WhyChooseUs from "../components/HomePage2/WhyChooseUs";
import FourStepProcess from "../components/HomePage2/FourStep";
import Portfolio from "../components/HomePage2/Portfolio";
import VectorArtServices from "../components/HomePage2/VectorArtServices";
import SvgSection from "../components/HomePage2/SvgSection";
import CutFile from "../components/HomePage2/CutFile";
import Vectorization from "../components/HomePage2/Vectorization";
import ReviewSlider from "../components/Sliders/ReviewSlider.jsx/ReviewSlider";
import Contact from "../components/HomePage2/Contact";
import DigitizingPortfolio from "../components/HomePage/DigitizingPortfolio";
import DigitizingPrices from "../components/HomePage2/Pricing";
import PriceSlider from "../components/HomePage2/PricingCarousel";

function page() {
  return (
    <>
      <Hero />
      <Services />
      <VectorArtServices />
      <SvgSection />
      <CutFile />
      <Vectorization />
      <Portfolio />
      <FourStepProcess />
      {/* <DigitizingPrices />
       */}
      <WhyChooseUs />
      <ReviewSlider />
      <PriceSlider />
      <Contact />
    </>
  );
}

export default page;
