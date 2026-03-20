"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import ScrollAnimation from "../UI/ScrollAnimation";
import ServiceLabel from "../UI/ServiceLabel";

/**
 * Left Chest Embroidery Gallery - Horizontal Carousel
 * Stitch-out samples from assets/images/leftchest/stitch
 */
export default function LeftChestEmbroideryGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const intervalRef = useRef(null);
    const carouselRef = useRef(null);

    const projects = [
        {
            id: 1,
            image: "/assets/images/leftchest/stitch/BGP Painters oval logo stitched out on left chest pocket, twill fabric.png",
            title: "BGP Painters oval logo",
            description: "Left chest pocket on twill fabric",
            alt: "BGP Painters oval logo stitched out on left chest pocket, twill fabric",
        },
        {
            id: 2,
            image: "/assets/images/leftchest/stitch/Main Street Social left chest logo stitched on softshell jacket.png",
            title: "Main Street Social left chest logo",
            description: "Stitched on softshell jacket",
            alt: "Main Street Social left chest logo stitched on softshell jacket",
        },
        {
            id: 3,
            image: "/assets/images/leftchest/stitch/Mandala embroidery sample patches stitched on fabric.png",
            title: "Mandala embroidery sample patches",
            description: "Sample patches stitched on fabric",
            alt: "Mandala embroidery sample patches stitched on fabric",
        },
        {
            id: 4,
            image: "/assets/images/leftchest/stitch/Montgomery County Detention Facility star emblem stitched on work polo.png",
            title: "Montgomery County star emblem",
            description: "Emblem stitched on work polo",
            alt: "Montgomery County Detention Facility star emblem stitched on work polo",
        },
        {
            id: 5,
            image: "/assets/images/leftchest/stitch/PCA monogram logo embroidery stitched on polo knit fabric.png",
            title: "PCA monogram logo",
            description: "Embroidery on polo knit fabric",
            alt: "PCA monogram logo embroidery stitched on polo knit fabric",
        },
        {
            id: 6,
            image: "/assets/images/leftchest/stitch/Royal Arch Masons emblem stitched on jacket Front.png",
            title: "Royal Arch Masons emblem",
            description: "Emblem stitched on jacket front",
            alt: "Royal Arch Masons emblem stitched on jacket Front",
        },
        {
            id: 7,
            image: "/assets/images/leftchest/stitch/Shriners embroidered logo and name stitched on polo shirt.png",
            title: "Shriners logo and name",
            description: "Embroidered on polo shirt",
            alt: "Shriners embroidered logo and name stitched on polo shirt",
        },
        {
            id: 8,
            image: "/assets/images/leftchest/stitch/The Mourners rope emblem stitched out on left chest, twill fabric.png",
            title: "The Mourners rope emblem",
            description: "Left chest on twill fabric",
            alt: "The Mourners rope emblem stitched out on left chest, twill fabric",
        },
        {
            id: 9,
            image: "/assets/images/leftchest/stitch/Truck and tractor embroidery stitched on fleece sweatshirt.png",
            title: "Truck and tractor embroidery",
            description: "Stitched on fleece sweatshirt",
            alt: "Truck and tractor embroidery stitched on fleece sweatshirt",
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
                            Left Chest Stitch Out Samples
                        </h2>
                        <p className="text-[#6b7280] text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm">
                            Small logo embroidery stitch-outs designed for shirts and polos, showing sharp lettering and clean stitch definition.
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
                        aria-label="Left chest stitch out samples carousel"
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
