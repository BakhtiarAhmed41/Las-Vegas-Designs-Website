import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import ServiceHero from "../components/ServicePages/ServiceHero";
import ServiceCards from "../components/ServicePages/ServiceCards";
import { svgHeroData } from "../data/svg/heroData";
import { svgSecondSectionData } from "../data/svg/secondSectionData";
import { svgThirdSectionData } from "../data/svg/thirdSectionData";
import { svgFourthSectionData } from "../data/svg/fourthSectionData";
import { serviceCardsData } from "../data/svg/serviceCardsData";
import { svgFifthSectionData } from "../data/svg/fifthSectionData";
import { svgSixthSectionData } from "../data/svg/sixthSectionData";
import WhyChooseUs from "../components/ServicePages/WhyChooseUs";
import { whyChooseUsData } from "../data/svg/whyChooseUsData";
import EtsyReviews from "../components/EtsyReviews/EtsyReviews";
import QuickQuote from "../components/ServicePages/QuickQuote";
import { quickQuoteData } from "../data/svg/quickQuoteData";

export const metadata = {
    title: "Custom SVG Files - Las Vegas Designs USA",
    description:
        "Professional custom SVG files for Cricut, Silhouette, and cutting machines. One color, full color, silhouette art, and line art SVG designs.",
};

export default function SVGPage() {
    return (
        <main className="bg-white">
            <TopTicker />
            <Navbar />

            {/* Hero Section */}
            <ServiceHero {...svgHeroData} />

            {/* Second Section - One Color SVG (Swapped Layout) */}
            <ServiceHero {...svgSecondSectionData} />

            {/* Third Section - Full Color SVG (Normal Layout) */}
            <ServiceHero {...svgThirdSectionData} />

            {/* Fourth Section - Convert PNG Section */}
            <ServiceHero {...svgFourthSectionData} />

            {/* Service Cards - Web Use & Full Color Print (2 cards) */}
            <ServiceCards {...serviceCardsData} columns={2} />

            {/* Fifth Section - Custom Silhouette Art (Swapped Layout) */}
            <ServiceHero {...svgFifthSectionData} />

            {/* Sixth Section - Custom Line Art (Normal Layout) */}
            <ServiceHero {...svgSixthSectionData} />

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
