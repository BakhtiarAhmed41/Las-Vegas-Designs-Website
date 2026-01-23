import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import ServiceHero from "../components/ServicePages/ServiceHero";
import ServiceCards from "../components/ServicePages/ServiceCards";
import { cncLaserHeroData } from "../data/cncLaserCut/heroData";
import { cncLaserSecondSectionData } from "../data/cncLaserCut/secondSectionData";
import { cncLaserThirdSectionData } from "../data/cncLaserCut/thirdSectionData";
import { serviceCardsData } from "../data/cncLaserCut/serviceCardsData";
import { customEngravedSectionData } from "../data/cncLaserCut/customEngravedSectionData";
import { petPortraitEngravedSectionData } from "../data/cncLaserCut/petPortraitEngravedSectionData";
import WhyChooseUs from "../components/ServicePages/WhyChooseUs";
import { whyChooseUsData } from "../data/cncLaserCut/whyChooseUsData";
import EtsyReviews from "../components/EtsyReviews/EtsyReviews";
import QuickQuote from "../components/ServicePages/QuickQuote";
import { quickQuoteData } from "../data/cncLaserCut/quickQuoteData";

export const metadata = {
    title: "CNC & Laser Cut Files - Las Vegas Designs USA",
    description:
        "Professional CNC cut files and laser cut designs for engraving, stencils, plasma cutting, and precision cutting applications.",
};

export default function CNCLaserCutPage() {
    return (
        <main className="bg-white">
            <TopTicker />
            <Navbar />

            {/* Hero Section */}
            <ServiceHero {...cncLaserHeroData} />

            {/* Second Section - Swapped Layout */}
            <ServiceHero {...cncLaserSecondSectionData} />

            {/* Third Section - Normal Layout */}
            <ServiceHero {...cncLaserThirdSectionData} />

            {/* Service Cards Section */}
            <ServiceCards {...serviceCardsData} columns={2} />

            {/* Custom Engraved Files Section */}
            <ServiceHero {...customEngravedSectionData} />

            {/* Pet & Portrait Engraved Files Section */}
            <ServiceHero {...petPortraitEngravedSectionData} />

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
