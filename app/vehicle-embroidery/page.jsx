import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import ServiceHero from "../components/ServicePages/ServiceHero";
import ServiceCards from "../components/ServicePages/ServiceCards";
import { vehicleEmbroideryHeroData } from "../data/vehicleEmbroidery/heroData";
import { carLogoSectionData } from "../data/vehicleEmbroidery/carLogoSectionData";
import { bikeLogoSectionData } from "../data/vehicleEmbroidery/bikeLogoSectionData";
import { serviceCardsData } from "../data/vehicleEmbroidery/serviceCardsData";
import { sportCarSectionData } from "../data/vehicleEmbroidery/sportCarSectionData";
import { boatsSectionData } from "../data/vehicleEmbroidery/boatsSectionData";
import VehicleEmbroideryGallery from "../components/Gallery/VehicleEmbroideryGallery";
import WhyChooseUs from "../components/ServicePages/WhyChooseUs";
import { whyChooseUsData } from "../data/vehicleEmbroidery/whyChooseUsData";
import EtsyReviews from "../components/EtsyReviews/EtsyReviews";
import QuickQuote from "../components/ServicePages/QuickQuote";
import { quickQuoteData } from "../data/vehicleEmbroidery/quickQuoteData";

export const metadata = {
    title: "Vehicle Embroidery Digitizing - Las Vegas Designs USA",
    description:
        "Professional vehicle logo embroidery digitizing services for cars, trucks, motorcycles, boats, and heavy equipment. Manual digitizing for clean, professional embroidery results.",
};

export default function VehicleEmbroideryPage() {
    return (
        <main className="bg-white">
            <TopTicker />
            <Navbar />

            {/* Hero Section */}
            <ServiceHero {...vehicleEmbroideryHeroData} />

            {/* Car Logo Section - Swapped Layout */}
            <ServiceHero {...carLogoSectionData} />

            {/* Bike Logo Section - Normal Layout */}
            <ServiceHero {...bikeLogoSectionData} />

            {/* Service Cards Section - 3 Cards */}
            <ServiceCards {...serviceCardsData} />

            {/* Sport Car Logo Section - Swapped Layout */}
            <ServiceHero {...sportCarSectionData} />

            {/* Boats Section - Normal Layout */}
            <ServiceHero {...boatsSectionData} />

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
