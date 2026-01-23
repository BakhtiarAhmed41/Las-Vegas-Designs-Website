import React from "react";
import TopTicker from "../components/TopPicker/TopPicker";
import Navbar from "../components/Navbar/Navbar3";
import Footer from "../components/Footer/Footer";
import GoUp from "../components/Buttons/GoUp";
import ChatButton from "../components/Buttons/ChatButton";
import PaymentHero from "../components/Payment/PaymentHero";
import PaymentFormSection from "../components/Payment/PaymentFormSection";

export const metadata = {
    title: "Payment - Las Vegas Designs USA",
    description:
        "Secure and trusted checkout for your custom order. Complete payment for vector, embroidery, SVG, and CNC services.",
};

export default function PaymentPage() {
    return (
        <main className="bg-white">
            <TopTicker />
            <Navbar />

            {/* Hero Section */}
            <PaymentHero />

            {/* Payment Form & Summary Section */}
            <PaymentFormSection />

            <Footer />
            <GoUp />
            <ChatButton />
        </main>
    );
}
