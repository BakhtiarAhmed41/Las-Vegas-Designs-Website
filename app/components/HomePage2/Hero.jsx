"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/HomePage/hero.module.css";

const slides = [
  { title: "Custom Work", image: "/assets/homePage/landing.png" },
  {
    title: "Embroidery Digitizing & Vector Art",
    image: "/assets/homePage/hat.png",
  },
  { title: "Custom SVG Files", image: "/assets/homePage/eagle-svg.png" },
  { title: "CNC & Laser Cut Files", image: "/assets/homePage/laser-nobg.png" },
  {
    title: "Custom Vectorization & Design",
    image: "/assets/homePage/image-to-vector.png",
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const groupRef = useRef(null);

  // Auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ---- 3D Tilt  ----
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

      group.style.transform = `perspective(1200px) translate3d(${currentX}px, ${currentY}px, 0) rotateX(${currentRx}deg) rotateY(${currentRy}deg) translateZ(${currentZ}px)`;

      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full bg-white text-black pt-12 pb-20">
      <div className="w-full mx-auto grid md:grid-cols-2 gap-0 md:gap-10 px-4 md:px-10 max-w-7xl">
        {/* LEFT CONTENT */}
        <div className="flex flex-col pt-4 order-2 md:order-1 text-center md:text-left items-center md:items-start">
          {/* Badge */}
          <span className="bg-blue-100 text-sm text-lv-blueGreen px-3 py-1 rounded-full w-fit mb-4">
            Starting $10 USD
          </span>

          {/* Heading */}
          <h1 className="hidden md:block text-4xl md:text-6xl font-bold leading-tight">
            Transform Your <br />
            Designs Into <br />
            <span className="text-lv-blueGreen">{slide.title}</span>
          </h1>

          <h1 className="md:hidden text-3xl font-bold leading-tight">
            Transform Your Designs <br /> Into <br />
            <span className="text-lv-blueGreen">{slide.title}</span>
          </h1>

          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-md">
            Professional embroidery digitizing & vector art services with fast
            turnaround, expert quality, and 100% satisfaction guaranteed.
          </p>

          <span className="text-md text-semibold text-lv-blueGreen w-fit mt-4 italic">
            2 to 6 Hours Urgent Turnaround Time
          </span>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <a
              href="#quote"
              className="bg-lv-maroon text-white px-6 py-3 rounded-md"
            >
              Get Free Quote
            </a>

            <a className="border border-gray-300 px-6 py-3 rounded-md cursor-pointer">
              View Portfolio
            </a>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative flex justify-center items-center order-1 md:order-2">
          <div
            ref={groupRef}
            className={`relative mt-10 w-full max-w-[380px] md:max-w-[520px] lg:max-w-[620px] aspect-square flex items-center justify-center ${styles.groupWrapper}`}
          >
            <div
              className="absolute transform rotate-[6deg]"
              style={{ zIndex: 40 }}
            >
              <div className={styles.floatWrap}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={1200}
                  height={1200}
                  priority
                  className="object-contain w-80 md:w-[420px] lg:w-[520px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === currentSlide
                ? "bg-lv-blueGreen scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
