"use client";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

function GoUp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 0.1) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="p-2 rounded-full fixed bottom-14 right-20 bg-lv-red transition-opacity duration-300 hover:opacity-80 cursor-pointer z-50"
    >
      <FaArrowUp className="text-white font-semibold text-lg" />
    </button>
  );
}

export default GoUp;
