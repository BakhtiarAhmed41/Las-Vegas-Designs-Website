import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import ServiceHero from "../components/ServicePages/ServiceHero";
import ServiceCards from "../components/ServicePages/ServiceCards";
import JacketPlacement from "../components/ServicePages/JacketPlacement";
import { jacketBackHeroData } from "../data/jacketBackEmbroidery/heroData";
import { centerChestSectionData } from "../data/jacketBackEmbroidery/centerChestSectionData";
import { fullBackSectionData } from "../data/jacketBackEmbroidery/fullBackSectionData";
import { serviceCardsData } from "../data/jacketBackEmbroidery/serviceCardsData";
import { sleeveSectionData } from "../data/jacketBackEmbroidery/sleeveSectionData";
import { upperLowerBackSectionData } from "../data/jacketBackEmbroidery/upperLowerBackSectionData";
import WhyChooseUs from "../components/ServicePages/WhyChooseUs";
import { whyChooseUsData } from "../data/jacketBackEmbroidery/whyChooseUsData";
import EtsyReviews from "../components/EtsyReviews/EtsyReviews";
import QuickQuote from "../components/ServicePages/QuickQuote";
import { quickQuoteData } from "../data/jacketBackEmbroidery/quickQuoteData";

export const metadata = {
    title: "Jacket Back Embroidery Digitizing - Las Vegas Designs USA",
    description:
        "Professional jacket back, full back, center chest, sleeve, and upper/lower back embroidery digitizing services. Large designs from 10-18 inches. Machine-ready files for jackets, hoodies, and outerwear.",
};

export default function JacketBackEmbroideryPage() {
    return (
        <main className="bg-white">
            <TopTicker />
            <Navbar />

            {/* Hero Section */}
            <ServiceHero {...jacketBackHeroData} />

            {/* Center Chest Section - Swapped Layout */}
            <ServiceHero {...centerChestSectionData} />

            {/* Full Back Section - Normal Layout */}
            <ServiceHero {...fullBackSectionData} />

            {/* Service Cards Section - 6 Placement Types */}
            <ServiceCards {...serviceCardsData} />

            {/* Jacket Back Logo Placement Section */}
            <JacketPlacement />

            {/* Sleeve Section - Swapped Layout */}
            <ServiceHero {...sleeveSectionData} />

            {/* Upper & Lower Back Section - Normal Layout */}
            <ServiceHero {...upperLowerBackSectionData} />

            {/* Why Choose Us & FAQ Section */}
            <WhyChooseUs data={whyChooseUsData} />

            {/* Etsy Reviews Section */}
            <EtsyReviews />

            {/* Quick Quote Section */}
            <QuickQuote data={quickQuoteData} />

            <Footer />
            <GoUp />
            <ChatButton />
        </main>
    );
}
