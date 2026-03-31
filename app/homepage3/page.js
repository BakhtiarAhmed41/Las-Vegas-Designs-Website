import React from "react";
import Hero from "../components/HomePage3/Hero.jsx";
import VectorArtServices from "../components/HomePage3/VectorArtServices.jsx";
import SvgSection from "../components/HomePage3/SvgSection.jsx";
import CutFile from "../components/HomePage3/CutFile.jsx";
import Vectorization from "../components/HomePage3/Vectorization.jsx";
import OurPrice from "../components/HomePage3/OurPrice.jsx";
import DigitizingPortfolio from "../components/HomePage3/DigitizingPortfolio.jsx";
import ContactSection from "../components/HomePage3/ContactSection.jsx";
import WhyChooseUs from "../components/HomePage3/WhyChooseUs.jsx";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import ReviewSlider from "../components/HomePage3/ReviewSlider/ReviewSlider";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";

export const metadata = {
  title: "Las Vegas Designs — Custom Embroidery & Vector Art",
  description:
    "Custom embroidery digitizing, hat & jacket logo digitizing, applique work and vector artwork conversion with fast turnaround.",
};

export default function HomePage3() {
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

