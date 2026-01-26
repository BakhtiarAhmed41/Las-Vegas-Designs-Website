import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import ServiceHero from "../components/ServicePages/ServiceHero";
import ServiceCards from "../components/ServicePages/ServiceCards";
import { leftChestHeroData } from "../data/leftChestEmbroidery/heroData";
import { teePoloSectionData } from "../data/leftChestEmbroidery/teePoloSectionData";
import { pocketSectionData } from "../data/leftChestEmbroidery/pocketSectionData";
import { serviceCardsData } from "../data/leftChestEmbroidery/serviceCardsData";
import { abovePocketSectionData } from "../data/leftChestEmbroidery/abovePocketSectionData";
import { sleeveSectionData } from "../data/leftChestEmbroidery/sleeveSectionData";
import WhyChooseUs from "../components/ServicePages/WhyChooseUs";
import { whyChooseUsData } from "../data/leftChestEmbroidery/whyChooseUsData";
import EtsyReviews from "../components/EtsyReviews/EtsyReviews";
import QuickQuote from "../components/ServicePages/QuickQuote";
import { quickQuoteData } from "../data/leftChestEmbroidery/quickQuoteData";

export const metadata = {
    title: "Left Chest Embroidery Digitizing - Las Vegas Designs USA",
    description:
        "Professional left chest, pocket, above pocket, and sleeve embroidery digitizing services. Custom logos for shirts, polos, and uniforms. Machine-ready files for small placement embroidery.",
};

export default function LeftChestEmbroideryPage() {
    return (
        <main className="bg-white">
            <TopTicker />
            <Navbar />

            {/* Hero Section */}
            <ServiceHero {...leftChestHeroData} />

            {/* Tee & Polo Section - Swapped Layout */}
            <ServiceHero {...teePoloSectionData} />

            {/* Pocket Section - Normal Layout */}
            <ServiceHero {...pocketSectionData} />

            {/* Service Cards Section - 5 Placement Types */}
            <ServiceCards {...serviceCardsData} />

            {/* Above Pocket Section - Swapped Layout - 20% wider and centered */}
            <ServiceHero {...abovePocketSectionData} customMaxWidth="1680px" />

            {/* Sleeve Section - Normal Layout - 20% wider and centered */}
            <ServiceHero {...sleeveSectionData} customMaxWidth="1680px" />

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
