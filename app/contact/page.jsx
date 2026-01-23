import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import ContactHero from "../components/Contact/ContactHero";
import ContactFormSection from "../components/Contact/ContactFormSection";
import EtsyReviews from "../components/EtsyReviews/EtsyReviews";

export const metadata = {
    title: "Contact Us - Las Vegas Designs USA",
    description:
        "Get in touch with Las Vegas Designs USA for fast response and high-quality vector or embroidery design services. Get your free quote today.",
};

export default function ContactPage() {
    return (
        <main className="bg-white">
            <TopTicker />
            <Navbar />

            {/* Hero Section */}
            <ContactHero />

            {/* Reviews Section */}
            <EtsyReviews />

            {/* Contact Form & Quick Contact Section */}
            <ContactFormSection />

            <Footer />
            <GoUp />
            <ChatButton />
        </main>
    );
}
