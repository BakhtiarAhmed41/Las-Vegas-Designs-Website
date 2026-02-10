import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import ServiceHero from "../components/ServicePages/ServiceHero";
import ServiceCards from "../components/ServicePages/ServiceCards";
import { appliqueHeroData } from "../data/appliqueEmbroidery/heroData";
import { runningStitchSectionData } from "../data/appliqueEmbroidery/runningStitchSectionData";
import { satinStitchSectionData } from "../data/appliqueEmbroidery/satinStitchSectionData";
import { serviceCardsData } from "../data/appliqueEmbroidery/serviceCardsData";
import { puffAppliqueSectionData } from "../data/appliqueEmbroidery/puffAppliqueSectionData";
import { doubleLayerSectionData } from "../data/appliqueEmbroidery/doubleLayerSectionData";
import AppliqueGallery from "../components/Gallery/AppliqueGallery";
import WhyChooseUs from "../components/ServicePages/WhyChooseUs";
import { whyChooseUsData } from "../data/appliqueEmbroidery/whyChooseUsData";
import EtsyReviews from "../components/EtsyReviews/EtsyReviews";
import QuickQuote from "../components/ServicePages/QuickQuote";
import { quickQuoteData } from "../data/appliqueEmbroidery/quickQuoteData";

export const metadata = {
    title: "Appliqué Embroidery Digitizing - Las Vegas Designs USA",
    description:
        "Professional appliqué embroidery digitizing services with running stitch, satin stitch, zigzag, blanket stitch, decorative edge, and 3D puff appliqué techniques. Machine-ready files for jackets, uniforms, and sportswear.",
};

export default function AppliqueEmbroideryPage() {
    return (
        <main className="bg-white">
            <TopTicker />
            <Navbar />

            {/* Hero Section */}
            <ServiceHero {...appliqueHeroData} />

            {/* Running Stitch Section - Swapped Layout */}
            <ServiceHero {...runningStitchSectionData} />

            {/* Satin Stitch Section - Normal Layout */}
            <ServiceHero {...satinStitchSectionData} />

            {/* Service Cards Section - 6 Stitch Types */}
            <ServiceCards {...serviceCardsData} />

            {/* 3D Puff Appliqué Section - Swapped Layout */}
            <ServiceHero {...puffAppliqueSectionData} />

            {/* Double Layer Section - Normal Layout */}
            <ServiceHero {...doubleLayerSectionData} />

            {/* Gallery Section - Appliqué stitch out carousel */}
            <AppliqueGallery />

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
