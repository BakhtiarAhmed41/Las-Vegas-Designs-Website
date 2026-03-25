import React from "react";

/**
 * ServiceLabel Component
 * Reusable label/badge for service categories and tags
 * 
 * @param {string} text - Label text content
 * @param {string} className - Additional CSS classes (optional)
 */
export default function ServiceLabel({ text, className = "" }) {
  return (
    <span
      className={`inline-block w-fit self-start bg-lv-red-pale text-lv-red font-bold text-[10px] sm:text-xs uppercase tracking-wide px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-shadow-sm ${className}`}
    >
      {text}
    </span>
  );
}

