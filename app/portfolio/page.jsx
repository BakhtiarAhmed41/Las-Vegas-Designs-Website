import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import PortfolioContent from "../components/Portfolio/PortfolioContent";

export const metadata = {
  title: "Portfolio - Las Vegas Designs USA",
  description:
    "Browse real work delivered to clients. Embroidery digitizing, vector art, SVG, and CNC laser cut portfolio with specs and formats.",
};

export default function PortfolioPage() {
  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />
      <PortfolioContent />
      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}
