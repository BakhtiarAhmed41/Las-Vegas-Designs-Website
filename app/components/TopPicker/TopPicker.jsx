"use client";
import { useEffect } from "react";

export default function TopTicker() {
  const items = [
    "CNC & laser Cut",
    "Custom Vector",
    "Free designs",
    "Custom Digitizing",
    "Custom SVG",
  ];

  return (
    <div className="w-screen bg-lv-blue overflow-hidden text-white text-sm">
      <ul className="flex gap-12 py-2 animate-scroll whitespace-nowrap">
        {/** Render the items twice for seamless scrolling */}
        {[...items, ...items, ...items].map((item, index) => (
          <div className="flex items-center gap-12 shrink-0" key={index}>
            <li className="uppercase font-semibold text-md list-disc">
              {item}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
