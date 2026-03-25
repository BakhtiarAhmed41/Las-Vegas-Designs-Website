"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import ScrollAnimation from "../UI/ScrollAnimation";
import ServiceLabel from "../UI/ServiceLabel";

/**
 * Hat Embroidery Gallery - Horizontal Carousel
 * Stitch-out samples from assets/images/hat/stitch
 */
export default function HatEmbroideryGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const intervalRef = useRef(null);
    const carouselRef = useRef(null);

    const projects = [
        {
            id: 1,
            image: "/assets/images/hat/stitch/Circuit Lab logo  embroidery stitched on baseball caps.png",
            title: "Circuit Lab Stitch Out",
            description: "Real baseball cap embroidery sample",
            alt: "Circuit Lab logo embroidery stitched on baseball caps",
        },
        {
            id: 2,
            image: "/assets/images/hat/stitch/Ford Mustang 5.0 embroidery stitched on baseball caps.png",
            title: "Ford Mustang 5.0 Stitch Out",
            description: "Real baseball cap embroidery sample",
            alt: "Ford Mustang 5.0 embroidery stitched on baseball caps",
        },
        {
            id: 3,
            image: "/assets/images/hat/stitch/hat embroidery logo digitizing sewout (12).png",
            title: "Hat Embroidery Sewout",
            description: "Real hat logo embroidery sample",
            alt: "Hat embroidery logo digitizing sewout",
        },
        {
            id: 4,
            image: "/assets/images/hat/stitch/Matoski Trucking logo patch embroidery stitched on baseball caps.png",
            title: "Matoski Trucking Stitch Out",
            description: "Real baseball cap embroidery sample",
            alt: "Matoski Trucking logo patch embroidery stitched on baseball caps",
        },
        {
            id: 5,
            image: "/assets/images/hat/stitch/O'Reilly Auto Parts logo embroidery stitched on baseball caps.png",
            title: "O'Reilly Auto Parts Stitch Out",
            description: "Real baseball cap embroidery sample",
            alt: "O'Reilly Auto Parts logo embroidery stitched on baseball caps",
        },
        {
            id: 6,
            image: "/assets/images/hat/stitch/Pennsylvania Fish & Boat Commission logo embroidery stitched on caps.png",
            title: "Pennsylvania Fish & Boat Stitch Out",
            description: "Real cap embroidery sample",
            alt: "Pennsylvania Fish and Boat Commission logo embroidery stitched on caps",
        },
        {
            id: 7,
            image: "/assets/images/hat/stitch/Pittsburgh Steelers logo embroidery stitched on caps.png",
            title: "Pittsburgh Steelers Stitch Out",
            description: "Real cap embroidery sample",
            alt: "Pittsburgh Steelers logo embroidery stitched on caps",
        },
        {
            id: 8,
            image: "/assets/images/hat/stitch/Punisher skull embroidery stitched on camo baseball caps.png",
            title: "Punisher Skull Stitch Out",
            description: "Real camo cap embroidery sample",
            alt: "Punisher skull embroidery stitched on camo baseball caps",
        },
        {
            id: 9,
            image: "/assets/images/hat/stitch/Texas flag patch embroidery stitched on caps.png",
            title: "Texas Flag Patch Stitch Out",
            description: "Real cap patch embroidery sample",
            alt: "Texas flag patch embroidery stitched on caps",
        },
        {
            id: 10,
            image: "/assets/images/hat/stitch/UConn Huskies logo embroidery stitched on bucket hats.png",
            title: "UConn Huskies Stitch Out",
            description: "Real bucket hat embroidery sample",
            alt: "UConn Huskies logo embroidery stitched on bucket hats",
        },
    ];

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % projects.length);
        }, 5000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [projects.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") goToPrevious();
            else if (e.key === "ArrowRight") goToNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const goToSlide = useCallback((index) => setCurrentIndex(index), []);
    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }, [projects.length]);
    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, [projects.length]);

    const minSwipeDistance = 50;
    const onTouchStart = useCallback((e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }, []);
    const onTouchMove = useCallback((e) => setTouchEnd(e.targetTouches[0].clientX), []);
    const onTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) goToNext();
        else if (distance < -minSwipeDistance) goToPrevious();
    }, [touchStart, touchEnd, goToNext, goToPrevious]);

    const getCardPosition = (projectIndex) => {
        const diff = projectIndex - currentIndex;
        if (diff > projects.length / 2) return diff - projects.length;
        if (diff < -projects.length / 2) return diff + projects.length;
        return diff;
    };

    return (
        <section
            id="gallery"
            className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16 lg:py-20 scroll-mt-20"
        >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                <ScrollAnimation animation="fadeInUp" delay={0.1}>
                    <div className="text-center mb-8 md:mb-12">
                        <div className="mb-4 flex justify-center">
                            <ServiceLabel text="REAL STITCH OUT PROOFS" />
                        </div>
                        <h2 className="text-[20px] sm:text-[29px] md:text-[41px] font-bold text-gray-800 mb-4 text-shadow-sm">
                            Hat & Cap Stitch Out Samples
                        </h2>
                        <p className="text-[#6b7280] text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm">
                            Customer stitch-outs on caps and hats showing clean stitching, sharp logo details, and amazing results on curved surfaces.
                        </p>
                    </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fadeInUp" delay={0.2}>
                    <div
                        ref={carouselRef}
                        className="relative w-full"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        role="region"
                        aria-label="Hat stitch out samples carousel"
                    >
                        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[525px] flex items-center justify-center overflow-hidden">
                            <div className="relative w-full h-full flex items-center justify-center">
                                {projects.map((project, index) => {
                                    const position = getCardPosition(index);
                                    const isCenter = position === 0;
                                    const isVisible = Math.abs(position) <= 1;
                                    const translateX = position * 100;
                                    const scale = isCenter ? 1 : 0.75;
                                    const opacity = isVisible ? (isCenter ? 1 : 0.6) : 0;
                                    const zIndex = isCenter ? 30 : isVisible ? 20 : 10;

                                    return (
                                        <article
                                            key={project.id}
                                            className="absolute left-1/2 top-1/2 -translate-y-1/2 cursor-pointer"
                                            style={{
                                                transform: `translateX(calc(-50% + ${translateX}%)) scale(${scale})`,
                                                opacity,
                                                zIndex,
                                                transition: "all 3000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                                pointerEvents: isVisible ? "auto" : "none",
                                            }}
                                            onClick={() => !isCenter && isVisible && goToSlide(index)}
                                            onKeyDown={(e) => {
                                                if ((e.key === "Enter" || e.key === " ") && !isCenter && isVisible) {
                                                    e.preventDefault();
                                                    goToSlide(index);
                                                }
                                            }}
                                            tabIndex={isCenter ? 0 : -1}
                                            aria-label={`${project.title} - ${isCenter ? "Currently viewing" : "Click to view"}`}
                                        >
                                            <div
                                                className={`relative rounded-2xl overflow-hidden ${
                                                    isCenter
                                                        ? "w-[240px] h-[300px] md:w-[320px] md:h-[400px] lg:w-[380px] lg:h-[475px]"
                                                        : "w-[240px] h-[300px] md:w-[320px] md:h-[400px] lg:w-[380px] lg:h-[475px]"
                                                }`}
                                                style={{
                                                    background: "rgba(255, 255, 255, 0.25)",
                                                    backdropFilter: "blur(10px)",
                                                    WebkitBackdropFilter: "blur(10px)",
                                                    border: "1px solid rgba(255, 255, 255, 0.3)",
                                                    boxShadow: isCenter
                                                        ? "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2) inset"
                                                        : "0 10px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2) inset",
                                                    transition: "box-shadow 3000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                                }}
                                            >
                                                <div className="relative w-full h-[75%]">
                                                    <Image
                                                        src={project.image}
                                                        alt={project.alt}
                                                        fill
                                                        className="object-cover opacity-80"
                                                        priority={isCenter}
                                                        sizes="(max-width: 768px) 240px, (max-width: 1024px) 320px, 380px"
                                                    />
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{
                                                            background:
                                                                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                                                        }}
                                                    />
                                                </div>
                                                <div className="relative h-[25%] flex flex-col items-center justify-center px-4 py-3 bg-gray-100">
                                                    <h3
                                                        className={`font-semibold text-gray-800 text-center line-clamp-1 ${
                                                            isCenter ? "text-base md:text-lg lg:text-xl mb-1" : "text-sm md:text-base lg:text-lg mb-1"
                                                        }`}
                                                    >
                                                        {project.title}
                                                    </h3>
                                                    <p
                                                        className={`text-gray-600 text-center line-clamp-2 ${
                                                            isCenter ? "text-xs md:text-sm" : "text-[10px] md:text-xs"
                                                        }`}
                                                    >
                                                        {project.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>

                            <button
                                onClick={goToPrevious}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        goToPrevious();
                                    }
                                }}
                                className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-gray-600 hover:text-lv-red rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-lv-red focus:ring-offset-2 cursor-pointer"
                                aria-label="Previous project"
                                tabIndex={0}
                            >
                                <svg
                                    className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={goToNext}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        goToNext();
                                    }
                                }}
                                className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-gray-600 hover:text-lv-red rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-lv-red focus:ring-offset-2 cursor-pointer"
                                aria-label="Next project"
                                tabIndex={0}
                            >
                                <svg
                                    className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}
