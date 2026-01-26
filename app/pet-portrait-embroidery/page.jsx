import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import ServiceHero from "../components/ServicePages/ServiceHero";
import ServiceCards from "../components/ServicePages/ServiceCards";
import VehicleEmbroideryGallery from "../components/Gallery/VehicleEmbroideryGallery";
import { petPortraitHeroData } from "../data/petPortraitEmbroidery/heroData";
import { dogSectionData } from "../data/petPortraitEmbroidery/dogSectionData";
import { catSectionData } from "../data/petPortraitEmbroidery/catSectionData";
import { serviceCardsData } from "../data/petPortraitEmbroidery/serviceCardsData";
import { portraitScenerySectionData } from "../data/petPortraitEmbroidery/portraitScenerySectionData";
import { humanPortraitSectionData } from "../data/petPortraitEmbroidery/humanPortraitSectionData";
import WhyChooseUs from "../components/ServicePages/WhyChooseUs";
import { whyChooseUsData } from "../data/petPortraitEmbroidery/whyChooseUsData";
import EtsyReviews from "../components/EtsyReviews/EtsyReviews";
import QuickQuote from "../components/ServicePages/QuickQuote";
import { quickQuoteData } from "../data/petPortraitEmbroidery/quickQuoteData";

export const metadata = {
    title: "Pet & Portrait Embroidery Digitizing - Las Vegas Designs USA",
    description:
        "Professional pet and portrait embroidery digitizing services. Convert dog photos, cat photos, human portraits, and scenery into machine-ready embroidery files. Manual digitizing with attention to detail.",
};

export default function PetPortraitEmbroideryPage() {
    return (
        <main className="bg-white">
            <TopTicker />
            <Navbar />

            {/* Hero Section */}
            <ServiceHero {...petPortraitHeroData} />

            {/* Dog Section - Swapped Layout */}
            <ServiceHero {...dogSectionData} />

            {/* Cat Section - Normal Layout */}
            <ServiceHero {...catSectionData} />

            {/* Service Cards Section - 4 Types (2 per row) */}
            <ServiceCards {...serviceCardsData} columns={2} />

            {/* Portrait & Scenery Section - Swapped Layout */}
            <ServiceHero {...portraitScenerySectionData} />

            {/* Human Portrait Section - Normal Layout */}
            <ServiceHero {...humanPortraitSectionData} />

            {/* Gallery Section - 360 Degree Carousel */}
            <VehicleEmbroideryGallery />

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
