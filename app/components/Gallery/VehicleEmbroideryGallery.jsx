"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import ScrollAnimation from "../UI/ScrollAnimation";
import ServiceLabel from "../UI/ServiceLabel";

/**
 * Responsive Horizontal Carousel Component
 * All cards move together in smooth, coordinated transitions
 */
export default function VehicleEmbroideryGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const intervalRef = useRef(null);
    const carouselRef = useRef(null);

  // Vehicle stitch out samples from cars and truck gallery
  const projects = [
    {
      id: 1,
      image: "/assets/images/cars and trcuk/gallery/Ford tractor embroidery stitched on cotton fleece sweatshirt.png",
      title: "Ford tractor embroidery",
      description: "Vehicle logo stitched on cotton fleece sweatshirt",
      alt: "Ford tractor embroidery stitched on cotton fleece sweatshirt",
    },
    {
      id: 2,
      image: "/assets/images/cars and trcuk/gallery/Large back excavator embroidery stitched on hoodies.png",
      title: "Large back excavator embroidery",
      description: "Heavy equipment embroidery stitched on hoodies",
      alt: "Large back excavator embroidery stitched on hoodies",
    },
    {
      id: 3,
      image: "/assets/images/cars and trcuk/gallery/Large back tractor and trolley embroidery stitched on puff jackets.png",
      title: "Tractor and trolley embroidery",
      description: "Large back design stitched on puff jackets",
      alt: "Large back tractor and trolley embroidery stitched on puff jackets",
    },
    {
      id: 4,
      image: "/assets/images/cars and trcuk/gallery/PR. Valeting car logo embroidery stitched on cotton fleece sweatshirt.png",
      title: "Car logo embroidery",
      description: "PR Valeting car logo on cotton fleece sweatshirt",
      alt: "PR Valeting car logo embroidery stitched on cotton fleece sweatshirt",
    },
    {
      id: 5,
      image: "/assets/images/cars and trcuk/gallery/Tractor and Scania truck embroidery stitched on quilted padded jacket fabric.png",
      title: "Tractor and truck embroidery",
      description: "Vehicle embroidery on quilted padded jacket",
      alt: "Tractor and Scania truck embroidery stitched on quilted padded jacket fabric",
    },
    {
      id: 6,
      image: "/assets/images/cars and trcuk/gallery/Tractor embroidery stitched on quilted puffer vest.png",
      title: "Tractor embroidery",
      description: "Tractor logo on quilted puffer vest",
      alt: "Tractor embroidery stitched on quilted puffer vest",
    },
    {
      id: 7,
      image: "/assets/images/cars and trcuk/gallery/Tractor with grain trailer embroidery stitched on quilted puffer jacket.png",
      title: "Tractor with grain trailer",
      description: "Vehicle embroidery on quilted puffer jacket",
      alt: "Tractor with grain trailer embroidery stitched on quilted puffer jacket",
    },
  ];

    // Auto-rotate carousel - infinite loop
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % projects.length);
        }, 5000); // Change every 5 seconds

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [projects.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") {
                goToPrevious();
            } else if (e.key === "ArrowRight") {
                goToNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const goToSlide = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }, [projects.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, [projects.length]);

    // Touch handlers for swipe gestures
    const minSwipeDistance = 50;

    const onTouchStart = useCallback((e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }, []);

    const onTouchMove = useCallback((e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }, []);

    const onTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrevious();
        }
    }, [touchStart, touchEnd, goToNext, goToPrevious]);

    // Calculate card position relative to center
    const getCardPosition = (projectIndex) => {
        const diff = projectIndex - currentIndex;

        // Handle wrapping for infinite loop
        if (diff > projects.length / 2) {
            return diff - projects.length;
        } else if (diff < -projects.length / 2) {
            return diff + projects.length;
        }
        return diff;
    };

  return (
    <section id="gallery" className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16 lg:py-20 scroll-mt-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                {/* Section Header */}
                <ScrollAnimation animation="fadeInUp" delay={0.1}>
                    <div className="text-center mb-8 md:mb-12">
                        <div className="mb-4 flex justify-center">
                            <ServiceLabel text="REAL STITCH OUT PROOFS" />
                        </div>
                        <h2 className="text-[20px] sm:text-[29px] md:text-[41px] font-bold text-gray-800 mb-4 text-shadow-sm">
                            Vehicle Stitch Out Samples
                        </h2>
                        <p className="text-[#6b7280] text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm">
                            Real stitch outs of car and truck logos on fabric, showing clarity, density balance, and clean edges.
                        </p>
                    </div>
                </ScrollAnimation>

                {/* Carousel Container */}
                <ScrollAnimation animation="fadeInUp" delay={0.2}>
                    <div
                        ref={carouselRef}
                        className="relative w-full"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        role="region"
                        aria-label="Sample work carousel"
                    >
                        {/* Carousel Wrapper */}
                        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[525px] flex items-center justify-center overflow-hidden">
                            {/* Cards Container - All cards render and slide together */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                {projects.map((project, index) => {
                                    const position = getCardPosition(index);
                                    const isCenter = position === 0;
                                    const isLeft = position === -1;
                                    const isRight = position === 1;
                                    const isVisible = Math.abs(position) <= 1;

                                    // Calculate transform values for smooth sliding
                                    // Center card at 0%, left at -100%, right at +100%
                                    const translateX = position * 100; // Percentage of container width
                                    const scale = isCenter ? 1 : 0.75;
                                    const opacity = isVisible ? (isCenter ? 1 : 0.6) : 0;
                                    const zIndex = isCenter ? 30 : isVisible ? 20 : 10;

                                    return (
                                        <article
                                            key={project.id}
                                            className="absolute left-1/2 top-1/2 -translate-y-1/2 cursor-pointer"
                                            style={{
                                                transform: `translateX(calc(-50% + ${translateX}%)) scale(${scale})`,
                                                opacity: opacity,
                                                zIndex: zIndex,
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
                                            {/* Card */}
                                            <div
                                                className={`relative rounded-2xl overflow-hidden ${isCenter
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
                                                {/* Image */}
                                                <div className="relative w-full h-[75%]">
                                                    <Image
                                                        src={project.image}
                                                        alt={project.alt}
                                                        fill
                                                        className="object-cover opacity-80"
                                                        priority={isCenter}
                                                        sizes="(max-width: 768px) 240px, (max-width: 1024px) 320px, 380px"
                                                    />
                                                    {/* Frosted glass overlay */}
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{
                                                            background:
                                                                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                                                        }}
                                                    />
                                                </div>

                                                {/* Title Section */}
                                                <div className="relative h-[25%] flex flex-col items-center justify-center px-4 py-3 bg-gray-100">
                                                    <h3
                                                        className={`font-semibold text-gray-800 text-center line-clamp-1 ${isCenter
                                                                ? "text-base md:text-lg lg:text-xl mb-1"
                                                                : "text-sm md:text-base lg:text-lg mb-1"
                                                            }`}
                                                    >
                                                        {project.title}
                                                    </h3>
                                                    <p
                                                        className={`text-gray-600 text-center line-clamp-2 ${isCenter
                                                                ? "text-xs md:text-sm"
                                                                : "text-[10px] md:text-xs"
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

              {/* Navigation Arrows */}
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
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M15 19l-7-7 7-7"
                                    />
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
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}
