"use client";

import React from "react";
import Link from "next/link";
import ServiceLabel from "../UI/ServiceLabel";
import ScrollAnimation from "../UI/ScrollAnimation";

export default function PaymentHero() {
  return (
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Service Label */}
            <ScrollAnimation animation="fadeInRight" delay={0.1}>
              <div className="mb-3 md:mb-4">
                <span className="inline-block bg-lv-red-pale text-lv-red font-bold text-[10px] sm:text-xs uppercase tracking-wide px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-shadow-sm">
                  <span className="text-base sm:text-lg mr-1">•</span> PAYMENT
                </span>
              </div>
            </ScrollAnimation>

            {/* Main Heading */}
            <ScrollAnimation animation="fadeInRight" delay={0.2}>
              <h1 className="font-bold text-gray-800 leading-[1.2] mb-4 text-[24px] sm:text-[30px] md:text-[36px] lg:text-[42px]">
                Secure and trusted checkout
              </h1>
            </ScrollAnimation>

            {/* Description */}
            <ScrollAnimation animation="fadeInRight" delay={0.3}>
              <p className="text-[#6b7280] leading-[1.75] mb-6 font-medium text-sm sm:text-[14px] md:text-base">
                Use this page to pay for your custom order. If you already received a quote, enter your details and complete payment.
              </p>
            </ScrollAnimation>

            {/* Action Buttons */}
            <ScrollAnimation animation="fadeInRight" delay={0.4}>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <Link
                  href="#payment-form"
                  className="inline-block bg-lv-red hover:bg-lv-red-dark text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 text-center text-[15px] shadow-lg hover:shadow-xl"
                >
                  Complete Payment
                </Link>
                <Link
                  href="mailto:Sales@Lasvegasdesignsusa.com"
                  className="inline-block bg-white text-lv-blue hover:text-lv-red font-bold px-7 py-3.5 rounded-full border-2 border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 text-center text-[15px]"
                >
                  Email Support
                </Link>
              </div>
            </ScrollAnimation>

            {/* Badges */}
            <ScrollAnimation animation="fadeInRight" delay={0.5}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-block bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                  Fast response
                </span>
                <span className="inline-block bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                  Secure checkout
                </span>
                <span className="inline-block bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                  Cards, PayPal, Apple Pay
                </span>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Column - Payment Accepted Card */}
          <ScrollAnimation animation="fadeInLeft" delay={0.3}>
            <div className="bg-white rounded-xl border border-gray-300 shadow-lg px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3 md:py-4 lg:py-5" style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Payment accepted
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Your payment details are protected. Use your order reference to avoid delays.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  SSL protected
                </span>
                <span className="inline-block bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  Secure processing
                </span>
                <span className="inline-block bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  Order tracked
                </span>
              </div>
              {/* Payment Logos */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  PayPal
                </span>
                <span className="inline-block bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  Visa
                </span>
                <span className="inline-block bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  Mastercard
                </span>
                <span className="inline-block bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  Apple Pay
                </span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
