import React from "react";
import Hero from "../app/components/HomePage/Hero.jsx";
import VectorArtServices from "./components/HomePage/VectorArtServices.jsx";
import SvgSection from "./components/HomePage/SvgSection.jsx";
import CutFile from "./components/HomePage/CutFile.jsx";
import Vectorization from "./components/HomePage/Vectorization.jsx";
import OurPrice from "./components/HomePage/OurPrice.jsx";
import DigitizingPortfolio from "./components/HomePage/DigitizingPortfolio.jsx";
import ContactSection from "./components/HomePage/ContactSection.jsx";
import WhyChooseUs from "./components/HomePage/WhyChooseUs.jsx";
import TopTicker from "./components/TopPicker/TopPicker";
import Navbar from "./components/Navbar/Navbar3";
import Footer from "./components/Footer/Footer";
import ReviewSlider from "./components/Sliders/ReviewSlider.jsx/ReviewSlider";
import GoUp from "./components/Buttons/GoUp";
import ChatButton from "./components/Buttons/ChatButton";

export const metadata = {
  title: "Las Vegas Designs — Custom Embroidery & Vector Art",
  description:
    "Custom embroidery digitizing, hat & jacket logo digitizing, applique work and vector artwork conversion with fast turnaround.",
};

export default function HomePage() {
  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />
      <Hero />
      <VectorArtServices />
      <DigitizingPortfolio />
      <SvgSection />
      <CutFile />
      <Vectorization />
      <OurPrice />
      <WhyChooseUs />
      <ContactSection />
      <ReviewSlider />
      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}
