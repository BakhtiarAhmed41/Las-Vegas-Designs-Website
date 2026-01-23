import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import ServiceHero from "../components/ServicePages/ServiceHero";
import ServiceCards from "../components/ServicePages/ServiceCards";
import { customVectorHeroData } from "../data/customVector/heroData";
import { customVectorSecondSectionData } from "../data/customVector/secondSectionData";
import { customVectorThirdSectionData } from "../data/customVector/thirdSectionData";
import { serviceCardsData } from "../data/customVector/serviceCardsData";
import { vehicleVectorSectionData } from "../data/customVector/vehicleSectionData";
import { petPortraitSectionData } from "../data/customVector/petPortraitSectionData";
import { stlFilesSectionData } from "../data/customVector/stlFilesSectionData";
import WhyChooseUs from "../components/ServicePages/WhyChooseUs";
import { whyChooseUsData } from "../data/customVector/whyChooseUsData";
import EtsyReviews from "../components/EtsyReviews/EtsyReviews";
import QuickQuote from "../components/ServicePages/QuickQuote";
import { quickQuoteData } from "../data/customVector/quickQuoteData";

export const metadata = {
    title: "Custom Vector Services - Las Vegas Designs USA",
    description:
        "Professional custom vector conversion services including image to vector, color separation, DTF printing, and screen printing artwork.",
};

export default function CustomVectorPage() {
    return (
        <main className="bg-white">
            <TopTicker />
            <Navbar />

            {/* Hero Section */}
            <ServiceHero {...customVectorHeroData} />

            {/* Second Section - Swapped Layout */}
            <ServiceHero {...customVectorSecondSectionData} />

            {/* Third Section - Normal Layout */}
            <ServiceHero {...customVectorThirdSectionData} />

            {/* Service Cards Section */}
            <ServiceCards {...serviceCardsData} />

            {/* Vehicle Vector Section */}
            <ServiceHero {...vehicleVectorSectionData} />

            {/* Pet and Portrait Vector Section */}
            <ServiceHero {...petPortraitSectionData} />

            {/* STL Files Section */}
            <ServiceHero {...stlFilesSectionData} />

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

