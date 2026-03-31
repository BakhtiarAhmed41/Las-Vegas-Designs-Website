"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Card({
  title,
  description,
  imageSrc,
  alt = "",
  href = "#",
  isTall = false,
  className = "",
  imageClass = "w-44 h-44 md:w-48 md:h-48",
}) {
  const id = title.replace(/\s+/g, "-").toLowerCase();

  // Slightly wider cards and a touch more vertical space; tall cards only when explicitly set
  const baseSizeClasses = isTall
    ? "w-72 sm:w-80 min-h-[28rem] lg:min-h-[34rem]"
    : "w-72 sm:w-80 min-h-[22rem] lg:min-h-[26rem]";

  return (
    <article
      aria-labelledby={id}
      className={
        `${baseSizeClasses} ${className} transform transition-transform duration-300 ` +
        "bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] " +
        "flex flex-col items-center text-center p-8"
      }
    >
      {/* image area: size controlled via imageClass prop */}
      <div className={`${imageClass} relative mb-4 shrink-0`}>
        <Image
          src={imageSrc}
          alt={alt || title}
          fill
          sizes="(max-width: 1024px) 200px, 192px"
          className="object-contain rounded-md"
        />
      </div>

      <h3 id={id} className="text-lg font-bold text-lv-blue mb-2">
        {title}
      </h3>

      <p className="text-[12px] md:text-sm text-gray-600 mb-4 px-2">
        {description}
      </p>

      <div className="mt-auto pb-1">
        <Link href={href}>
          <button className="bg-lv-red cursor-pointer text-white text-sm px-5 py-2 rounded-full shadow-sm hover:bg-lv-red-dark transition-colors">
            Learn More →
          </button>
        </Link>
      </div>
    </article>
  );
}
