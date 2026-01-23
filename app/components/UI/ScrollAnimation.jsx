"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ScrollAnimation Component
 * Wraps children and triggers animation when element enters viewport
 * 
 * @param {string} animation - Animation class name (e.g., 'fadeInRight', 'fadeInLeft')
 * @param {number} delay - Animation delay in seconds
 * @param {number} threshold - Intersection threshold (0-1)
 * @param {React.ReactNode} children - Child elements to animate
 */
export default function ScrollAnimation({
  animation,
  delay = 0,
  threshold = 0.1,
  children,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Unobserve after animation triggers to prevent re-triggering
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before element is fully visible
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  const animationMap = {
    fadeInRight: 'animate-fadeInRight',
    fadeInLeft: 'animate-fadeInLeft',
    fadeInUp: 'animate-fadeInUp',
    fadeInDown: 'animate-fadeInDown',
  };

  const animationClass = isVisible ? (animationMap[animation] || '') : '';

  return (
    <div
      ref={elementRef}
      className={`opacity-0 ${animationClass}`}
      style={isVisible ? { animationDelay: `${delay}s` } : {}}
    >
      {children}
    </div>
  );
}

