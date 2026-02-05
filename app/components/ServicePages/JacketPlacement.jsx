"use client";

import React from "react";
import Image from "next/image";
import ServiceLabel from "../UI/ServiceLabel";
import ScrollAnimation from "../UI/ScrollAnimation";

/**
 * JacketPlacement Component
 * Displays jacket back logo placement examples in a creative row layout
 */
export default function JacketPlacement() {
    const placements = [
        {
            id: 1,
            image: "/assets/images/digitizing images/Jacket Back Logo Placement images/1.png",
            alt: "Red hoodie with sleeve text placement",
            label: "Sleeve Placement",
            description: "Vertical text on sleeve",
        },
        {
            id: 2,
            image: "/assets/images/digitizing images/Jacket Back Logo Placement images/2.png",
            alt: "Red hoodie with sleeve text placement side view",
            label: "Sleeve Side View",
            description: "Side view sleeve placement",
        },
        {
            id: 3,
            image: "/assets/images/digitizing images/Jacket Back Logo Placement images/3.png",
            alt: "Grey hoodie with centered back logo",
            label: "Center Back",
            description: "Centered logo placement",
        },
        {
            id: 4,
            image: "/assets/images/digitizing images/Jacket Back Logo Placement images/4.png",
            alt: "Navy hoodie with lower back logo",
            label: "Lower Back",
            description: "Lower back placement",
        },
        {
            id: 5,
            image: "/assets/images/digitizing images/Jacket Back Logo Placement images/5.png",
            alt: "Orange hoodie with upper back logo",
            label: "Upper Back",
            description: "Upper back placement",
        },
    ];

    return (
        <section className="py-12 md:py-16 lg:py-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                {/* Section Header */}
                <ScrollAnimation animation="fadeInUp" delay={0.1}>
                    <div className="text-center mb-8 md:mb-12">
                        <div className="mb-4 flex justify-center">
                            <ServiceLabel text="JACKET BACK LOGO PLACEMENT" />
                        </div>
                        <h2 className="text-[20px] sm:text-[29px] md:text-[41px] font-bold text-gray-800 mb-4 text-shadow-sm">
                            Jacket Back Logo Placement
                        </h2>
                        <p className="text-[#6b7280] text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm">
                            See how different logo placements look on jackets and hoodies. Choose the perfect spot for your design.
                        </p>
                    </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fadeInUp" delay={0.2}>
                    <div className="relative overflow-hidden h-[400px] flex items-center justify-center">
                        {/* Main Row Container - No Scroll, Responsive Grid */}
                        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full">
                            {placements.map((placement, index) => {
                                // Create staggered heights and rotations for visual interest
                                const rotation = index % 2 === 0 ? -3 : 3;
                                const scale = index === 2 ? 1.1 : 1; // Center image slightly larger
                                const translateY = index % 2 === 0 ? -10 : 10;

                                return (
                                    <div
                                        key={placement.id}
                                        className="group relative flex-shrink-0"
                                        style={{
                                            transform: `translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
                                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        }}
                                    >
                                        <div className="relative w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px] aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-0 group-hover:translateY(0) border-2 border-white/20 group-hover:border-lv-red/50">
                                            <Image
                                                src={placement.image}
                                                alt={placement.alt}
                                                fill
                                                className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, (max-width: 1024px) 160px, (max-width: 1280px) 180px, 200px"
                                            />
                                            {/* Gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                    <p className="text-sm font-bold mb-1">{placement.label}</p>
                                                    <p className="text-xs text-white/90">{placement.description}</p>
                                                </div>
                                            </div>
                                            {/* Shine effect on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                        </div>
                                        {/* Label below image */}
                                        <div className="mt-4 mb-2 text-center transform group-hover:scale-105 transition-transform duration-300">
                                            <p className="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-lv-red transition-colors duration-300 whitespace-nowrap">
                                                {placement.label}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </ScrollAnimation>

                {/* Info Text */}
                <ScrollAnimation animation="fadeInUp" delay={0.3}>
                    <div className="mt-12 text-center">
                        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                            Each placement offers a unique look and feel. Our team can help you choose the perfect position for your logo based on your design and garment type.
                        </p>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}
