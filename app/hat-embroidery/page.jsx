import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import ServiceHero from "../components/ServicePages/ServiceHero";
import ServiceCards from "../components/ServicePages/ServiceCards";
import { hatEmbroideryHeroData } from "../data/hatEmbroidery/heroData";
import { beanieSectionData } from "../data/hatEmbroidery/beanieSectionData";
import { visorSectionData } from "../data/hatEmbroidery/visorSectionData";
import { serviceCardsData } from "../data/hatEmbroidery/serviceCardsData";
import { puffSectionData } from "../data/hatEmbroidery/puffSectionData";
import { sideHatSectionData } from "../data/hatEmbroidery/sideHatSectionData";
import { backHatSectionData } from "../data/hatEmbroidery/backHatSectionData";
import WhyChooseUs from "../components/ServicePages/WhyChooseUs";
import { whyChooseUsData } from "../data/hatEmbroidery/whyChooseUsData";
import EtsyReviews from "../components/EtsyReviews/EtsyReviews";
import QuickQuote from "../components/ServicePages/QuickQuote";
import { quickQuoteData } from "../data/hatEmbroidery/quickQuoteData";

export const metadata = {
    title: "Hat Embroidery Digitizing - Las Vegas Designs USA",
    description:
        "Professional hat, cap, and beanie embroidery digitizing services. Custom logos digitized for curved surfaces, front panels, side panels, back of hat, and 3D puff embroidery. Machine-ready files for caps, beanies, and visors.",
};

export default function HatEmbroideryPage() {
    return (
        <main className="bg-white">
            <TopTicker />
            <Navbar />

            {/* Hero Section */}
            <ServiceHero {...hatEmbroideryHeroData} />

            {/* Beanie Section - Swapped Layout */}
            <ServiceHero {...beanieSectionData} />

            {/* Visor Section - Normal Layout */}
            <ServiceHero {...visorSectionData} />

            {/* Service Cards Section - 6 Hat Types */}
            <ServiceCards {...serviceCardsData} />

            {/* 3D Puff Section - Swapped Layout */}
            <ServiceHero {...puffSectionData} />

            {/* Side Hat Section - Normal Layout */}
            <ServiceHero {...sideHatSectionData} />

            {/* Back of Hat Section - Swapped Layout */}
            <ServiceHero {...backHatSectionData} />

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
