"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/HomePage/hero.module.css";

const slides = [
  {
    title: "Custom Work",
    image: "/assets/homePage/landing.png",
  },
  {
    title: "Embroidery Digitizing & Vector Art",
    image: "/assets/homePage/hat.png",
  },
  {
    title: "Custom SVG Files",
    image: "/assets/homePage/eagle-svg.png",
  },
  {
    title: "CNC & Laser Cut Files",
    image: "/assets/homePage/laser-nobg.png",
  },
  {
    title: "Custom Vectorization & Design",
    image: "/assets/homePage/image-to-vector.png",
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const groupRef = useRef(null);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 3D tilt effect
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    let targetX = 0,
      targetY = 0,
      targetRx = 0,
      targetRy = 0,
      targetZ = 0;
    let currentX = 0,
      currentY = 0,
      currentRx = 0,
      currentRy = 0,
      currentZ = 0;
    let rafId = null;

    const maxTranslate = 28;
    const maxRotate = 16;
    const maxZ = 60;

    function clamp(v, a, b) {
      return Math.max(a, Math.min(b, v));
    }

    function getPointerCoords(e) {
      if (e.touches?.[0]) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    function updateTargets(pointerX, pointerY) {
      const rect = group.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const px = (pointerX - rect.left) / rect.width - 0.5;
      const py = (pointerY - rect.top) / rect.height - 0.5;

      targetX = px * maxTranslate;
      targetY = py * maxTranslate;
      targetRy = clamp(px * maxRotate, -maxRotate, maxRotate);
      targetRx = clamp(-py * maxRotate, -maxRotate, maxRotate);

      const maxDist = Math.sqrt(0.5 * 0.5 + 0.5 * 0.5);
      const dist = Math.sqrt(px * px + py * py);
      const normalized = clamp(1 - dist / maxDist, 0, 1);
      targetZ = normalized * maxZ;
    }

    function handlePointerMove(e) {
      const { x, y } = getPointerCoords(e);
      updateTargets(x, y);
    }

    function animate() {
      const ease = 0.12;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      currentRx += (targetRx - currentRx) * ease;
      currentRy += (targetRy - currentRy) * ease;
      currentZ += (targetZ - currentZ) * ease;

      group.style.transform = `perspective(1200px) translate3d(${currentX.toFixed(
        3
      )}px, ${currentY.toFixed(3)}px, 0) rotateX(${currentRx.toFixed(
        3
      )}deg) rotateY(${currentRy.toFixed(3)}deg) translateZ(${currentZ.toFixed(
        3
      )}px)`;
      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    setTimeout(() => {
      const rect = group.getBoundingClientRect();
      if (rect.width && rect.height) {
        updateTargets(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    }, 50);

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Zoomed background with gradient transition */}
      <div
        className={styles.bgZoom}
        role="img"
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "120%",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
      />

      {/* Darker overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-center text-center lg:text-left">
          {/* LEFT column */}
          <div
            className="order-2 lg:order-1 text-white space-y-6 transition-all duration-700 ease-out"
            key={`content-${currentSlide}`}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-[var(--white)] via-[var(--lv-sky-blue)] to-[var(--lv-red-light)] bg-clip-text text-transparent">
              {slide.title}
            </h1>

            <p className="text-3xl md:text-4xl font-bold text-yellow-400">
              Starting $10 USD
            </p>

            <p className="text-[var(--muted)] text-xl md:text-2xl pb-6">
              2 to 6 Hours Urgent Turnaround Time
            </p>

            <a
              className={`${styles.quoteBtn} group relative px-8 py-4 bg-gradient-to-r from-[var(--lv-blue)] via-[var(--lv-blue-light)] to-[var(--lv-red-light)] text-white text-lg rounded-full`}
              aria-label="Get free quote"
              href="#quote"
            >
              Get a Free Quote
            </a>

            <div className="mb-12 pb-6 block lg:hidden"></div>
          </div>

          {/* RIGHT column  */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center">
            <div
              ref={groupRef}
              className={`relative mt-12 mb-16 w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[680px] xl:max-w-[780px] aspect-square flex items-center justify-center ${styles.groupWrapper}`}
            >
              <div
                className={`absolute transform rotate-[6deg] ${styles.polaroidContainer}`}
                style={{ zIndex: 40 }}
                role="img"
                aria-label="Polaroid artwork"
              >
                <div className={`${styles.floatWrap} ${styles.floatMain}`}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={1200}
                    height={1200}
                    priority
                    className={`object-cover w-96 md:w-96 lg:w-[520px] ${styles.polaroidImage}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex gap-3 z-20 mt-0 md:mt-6 lg:mt-0">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? "w-12 h-3 bg-gradient-to-r from-[var(--lv-sky-blue)] to-[var(--lv-blue)]"
                  : "w-3 h-3 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 cursor-pointer hidden md:block"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 cursor-pointer hidden md:block"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Las Vegas Designs USA",
            url: "https://lasvegasdesignsusa.com/",
            description:
              "Custom logo embroidery digitizing, fast turnaround. Starting $10 USD.",
          }),
        }}
      />
    </section>
  );
}
