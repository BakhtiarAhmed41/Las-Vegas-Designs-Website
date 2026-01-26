"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ServiceLabel from "../UI/ServiceLabel";
import ScrollAnimation from "../UI/ScrollAnimation";

/**
 * ServiceHero Component
 * Reusable hero section for service pages
 * 
 * @param {string} serviceLabel - Small label above heading (e.g., "CUSTOM VECTOR ART SERVICE")
 * @param {string} heading - Main heading text
 * @param {string} subheading - Secondary heading in red
 * @param {string} description - Paragraph description
 * @param {array} features - Array of feature strings for bullet points
 * @param {object} primaryButton - { text: string, href: string }
 * @param {object} secondaryButton - { text: string, href: string }
 * @param {object} galleryButton - { text: string, href: string } - Optional button to link to gallery
 * @param {array} featureCards - Array of { title: string, description: string } for feature cards
 * @param {string} imageSrc - Image path or null for placeholder
 * @param {string} imageAlt - Alt text for image
 * @param {boolean} swapLayout - If true, image on left, content on right
 * @param {boolean} centered - If true, renders centered text-only layout without image
 */
export default function ServiceHero({
    serviceLabel,
    heading,
    subheading,
    description,
    features = [],
    primaryButton,
    secondaryButton,
    galleryButton,
    featureCards = [],
    imageSrc = null,
    imageAlt = "Service illustration",
    swapLayout = false,
    hasContainer = false,
    narrowLayout = false, // If true, uses 60/30 layout instead of 50/50
    centered = false, // If true, renders centered text-only layout
    customMaxWidth = null, // Custom max-width (e.g., "1680px" for 20% wider)
}) {
    // If centered layout, render centered content only
    if (centered) {
        const maxWidthClass = customMaxWidth ? `max-w-[${customMaxWidth}]` : "max-w-[1400px]";

        return (
            <section className="bg-white py-8 md:py-12 lg:py-16">
                <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 xl:px-12`}>
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Service Label */}
                        {serviceLabel && (
                            <ScrollAnimation animation="fadeInUp" delay={0.1}>
                                <div className="mb-3 md:mb-4 flex justify-center">
                                    <ServiceLabel text={serviceLabel} />
                                </div>
                            </ScrollAnimation>
                        )}

                        {/* Main Heading */}
                        {heading && (
                            <ScrollAnimation animation="fadeInUp" delay={0.2}>
                                <h1 className="font-bold text-lv-blue leading-[1.2] mb-4 text-shadow-blue text-[18px] sm:text-[24px] md:text-[30px] lg:text-[36px]">
                                    {heading}
                                </h1>
                            </ScrollAnimation>
                        )}

                        {/* Subheading */}
                        {subheading && (
                            <ScrollAnimation animation="fadeInUp" delay={0.3}>
                                <h2 className="font-bold text-lv-red mb-4 text-shadow-red text-sm sm:text-base md:text-lg">
                                    {subheading}
                                </h2>
                            </ScrollAnimation>
                        )}

                        {/* Description */}
                        {description && (
                            <ScrollAnimation animation="fadeInUp" delay={0.4}>
                                <div className="text-[#6b7280] leading-[1.75] mb-5 font-medium text-shadow-sm text-sm sm:text-[14px] md:text-base">
                                    {description.split('\n\n').map((paragraph, idx) => (
                                        <p key={idx} className={idx > 0 ? 'mt-3' : ''}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </ScrollAnimation>
                        )}

                        {/* Features List */}
                        {features.length > 0 && (
                            <ScrollAnimation animation="fadeInUp" delay={0.5}>
                                <ul className="space-y-2 mb-6 list-none text-left max-w-2xl mx-auto">
                                    {features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-[#4b5563] font-normal text-sm"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#4b5563] mr-3 mt-1.5 shrink-0"></span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollAnimation>
                        )}

                        {/* Action Buttons */}
                        {(primaryButton || secondaryButton || galleryButton) && (
                            <ScrollAnimation animation="fadeInUp" delay={0.6}>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
                                    {primaryButton && (
                                        <Link
                                            href={primaryButton.href}
                                            className="inline-block bg-lv-red hover:bg-lv-red-dark text-white font-bold px-7 py-3.5 rounded-[10px] transition-all duration-200 text-center text-[15px] shadow-lg hover:shadow-xl"
                                        >
                                            {primaryButton.text}
                                        </Link>
                                    )}

                                    {secondaryButton && (
                                        <Link
                                            href={secondaryButton.href}
                                            className="inline-block bg-white text-lv-blue hover:text-lv-red font-bold px-7 py-3.5 rounded-[10px] border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 text-center text-[15px]"
                                        >
                                            {secondaryButton.text}
                                        </Link>
                                    )}

                                    {galleryButton && (
                                        <Link
                                            href={galleryButton.href}
                                            className="inline-block bg-lv-blue hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-[10px] transition-all duration-200 text-center text-[15px] shadow-lg hover:shadow-xl"
                                        >
                                            {galleryButton.text}
                                        </Link>
                                    )}
                                </div>
                            </ScrollAnimation>
                        )}

                        {/* Feature Cards */}
                        {featureCards.length > 0 && (
                            <ScrollAnimation animation="fadeInUp" delay={0.7}>
                                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-8 md:mt-10 justify-center">
                                    {featureCards.map((card, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl px-4 py-2 md:py-2.5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex-1 md:flex-initial md:min-w-0"
                                        >
                                            <h3 className="font-bold text-gray-800 text-xs md:text-sm mb-0.5 whitespace-nowrap">
                                                {card.title}
                                            </h3>
                                            <p className="text-gray-600 text-[10px] md:text-xs whitespace-nowrap">
                                                {card.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollAnimation>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    const maxWidthClass = customMaxWidth ? `max-w-[${customMaxWidth}]` : "max-w-[1400px]";

    return (
        <section className="bg-white py-8 md:py-12 lg:py-16">
            <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 xl:px-12`}>
                <div className={`${hasContainer ? 'bg-gray-50 rounded-2xl p-6 md:p-8 lg:p-10' : ''}`}>
                    <div className={`grid grid-cols-1 ${narrowLayout ? 'lg:grid-cols-[55%_40%]' : 'lg:grid-cols-2'} gap-8 md:gap-12 lg:gap-16 items-center ${swapLayout ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
                        {/* Content Section */}
                        <div className={`${swapLayout ? 'lg:pl-8' : 'lg:pr-8'}`}>
                            {/* Service Label */}
                            {serviceLabel && (
                                <ScrollAnimation animation={swapLayout ? 'fadeInLeft' : 'fadeInRight'} delay={0.1}>
                                    <div className="mb-3 md:mb-4">
                                        <ServiceLabel text={serviceLabel} />
                                    </div>
                                </ScrollAnimation>
                            )}

                            {/* Main Heading */}
                            <ScrollAnimation animation={swapLayout ? 'fadeInLeft' : 'fadeInRight'} delay={0.2}>
                                <h1 className={`font-bold text-lv-blue leading-[1.2] mb-4 text-shadow-blue ${hasContainer ? 'text-[18px] sm:text-[24px] md:text-[30px]' : 'text-[18px] sm:text-[24px] md:text-[30px]'}`}>
                                    {heading}
                                </h1>
                            </ScrollAnimation>

                            {/* Subheading */}
                            {subheading && (
                                <ScrollAnimation animation={swapLayout ? 'fadeInLeft' : 'fadeInRight'} delay={0.3}>
                                    <h2 className={`font-bold text-lv-red mb-4 text-shadow-red ${hasContainer ? 'text-sm sm:text-base md:text-lg' : 'text-sm sm:text-base md:text-lg'}`}>
                                        {subheading}
                                    </h2>
                                </ScrollAnimation>
                            )}

                            {/* Description */}
                            {description && (
                                <ScrollAnimation animation={swapLayout ? 'fadeInLeft' : 'fadeInRight'} delay={0.4}>
                                    <div className={`text-[#6b7280] leading-[1.75] mb-5 font-medium text-shadow-sm ${hasContainer ? 'text-sm sm:text-[14px]' : 'text-sm sm:text-[14px]'}`}>
                                        {description.split('\n\n').map((paragraph, idx) => (
                                            <p key={idx} className={idx > 0 ? 'mt-3' : ''}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </ScrollAnimation>
                            )}

                            {/* Features List */}
                            {features.length > 0 && (
                                <ScrollAnimation animation={swapLayout ? 'fadeInLeft' : 'fadeInRight'} delay={0.5}>
                                    <ul className="space-y-2 mb-6 list-none">
                                        {features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className={`flex items-start text-[#4b5563] font-normal ${hasContainer ? 'text-sm' : 'text-sm'}`}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#4b5563] mr-3 mt-1.5 shrink-0"></span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollAnimation>
                            )}

                            {/* Action Buttons */}
                            <ScrollAnimation animation={swapLayout ? 'fadeInLeft' : 'fadeInRight'} delay={0.6}>
                                <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                                    {primaryButton && (
                                        <Link
                                            href={primaryButton.href}
                                            className="inline-block bg-lv-red hover:bg-lv-red-dark text-white font-bold px-7 py-3.5 rounded-[10px] transition-all duration-200 text-center text-[15px] shadow-lg hover:shadow-xl"
                                        >
                                            {primaryButton.text}
                                        </Link>
                                    )}

                                    {secondaryButton && (
                                        <Link
                                            href={secondaryButton.href}
                                            className="inline-block bg-white text-lv-blue hover:text-lv-red font-bold px-7 py-3.5 rounded-[10px] border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 text-center text-[15px]"
                                        >
                                            {secondaryButton.text}
                                        </Link>
                                    )}

                                    {galleryButton && (
                                        <Link
                                            href={galleryButton.href}
                                            className="inline-block bg-lv-blue hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-[10px] transition-all duration-200 text-center text-[15px] shadow-lg hover:shadow-xl"
                                        >
                                            {galleryButton.text}
                                        </Link>
                                    )}
                                </div>
                            </ScrollAnimation>

                            {/* Feature Cards */}
                            {featureCards.length > 0 && (
                                <ScrollAnimation animation={swapLayout ? 'fadeInLeft' : 'fadeInRight'} delay={0.7}>
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-8 md:mt-10 justify-start">
                                        {featureCards.map((card, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-xl px-4 py-2 md:py-2.5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex-1 md:flex-initial md:min-w-0"
                                            >
                                                <h3 className="font-bold text-gray-800 text-xs md:text-sm mb-0.5 whitespace-nowrap">
                                                    {card.title}
                                                </h3>
                                                <p className="text-gray-600 text-[10px] md:text-xs whitespace-nowrap">
                                                    {card.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollAnimation>
                            )}
                        </div>

                        {/* Image/Placeholder Section */}
                        <ScrollAnimation animation={swapLayout ? 'fadeInRight' : 'fadeInLeft'} delay={0.3}>
                            <div className="relative mt-8 lg:mt-0">
                                <div className="bg-white rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] flex items-center justify-center" style={{
                                    boxShadow: '0 10px 30px rgba(156, 15, 23, 0.15), 0 4px 15px rgba(24, 53, 89, 0.2)',
                                    border: '0.5px solid rgba(156, 15, 23, 0.08)'
                                }}>
                                    {imageSrc ? (
                                        <Image
                                            src={imageSrc}
                                            alt={imageAlt}
                                            width={800}
                                            height={600}
                                            className="w-full h-auto rounded-lg"
                                        />
                                    ) : (
                                        <div className="text-center w-full">
                                            <div className="bg-gray-100 rounded-lg p-8 sm:p-10 md:p-12 mb-3 md:mb-4">
                                                <svg
                                                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto text-gray-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-gray-400 text-xs sm:text-sm">
                                                {imageAlt || "Image placeholder"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </div>
        </section>
    );
}

