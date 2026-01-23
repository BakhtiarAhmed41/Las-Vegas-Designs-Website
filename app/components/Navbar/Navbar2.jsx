"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiChevronDown,
  FiMenu,
  FiSearch,
  FiChevronRight,
} from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import logo from "@/public/assets/logos/lasLogo.png";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const navLinks = [
    {
      label: "Digitizing",
      sub: [
        "Applique Logo Digitizing",
        "Hat Logo Digitizing",
        "Left Chest Digitizing",
        "Jacket Back Logo Digitizing",
        "Custom Pet Embroidery Digitizing",
        "Car & Truck Embroidery Digitizing",
      ],
    },
    {
      label: "SVG",
      sub: [
        "Single-Color SVG",
        "Full-Color SVG",
        "Silhouette ART",
        "Line Art & Illustrations",
      ],
    },
    {
      label: "CNC & Laser Cut",
      sub: [
        "CNC Cut Files",
        "Engraving Files",
        "Laser Cut Files",
        "Stencil Desgins",
      ],
    },
    {
      label: "Custom Vector",
      sub: [
        "Image to Vector",
        "Color Separation",
        "DTF Printing",
        "Screen Printing",
      ],
    },
    { label: "Pricing" },
    { label: "Free Designs" },
    { label: "Payment" },
    { label: "Blog" },
  ];

  const contactDetails = [
    { label: "(USA) (725) 300-3797", href: "tel:7253003797" },
    { label: "(UK) +44 7706 709210", href: "tel:+447706709210" },
    { label: "Text (725) 300-3797", href: "tel:7253003797" },
    {
      label: "Email: Sales@Lasvegasdesignsusa.com",
      href: "mailto:Sales@Lasvegasdesignsusa.com",
    },
    { label: "Contact us", href: "/contact" },
  ];

  const toggleExpand = (label) => {
    setExpanded(expanded === label ? null : label);
  };

  return (
    <header className="w-full bg-white shadow-sm">
      {/* ------------------------------------------------------ */}
      {/* 🔹 TOP CONTACT BAR */}
      {/* ------------------------------------------------------ */}
      <div className="hidden lg:flex justify-center gap-10 py-2 bg-white">
        {contactDetails.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="text-lv-blue font-medium hover:text-lv-blueGreen transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-5 py-6 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={190} alt="Las Vegas Designs" />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-6 ml-10 bg-white">
          {navLinks.map((item) => (
            <div key={item.label} className="relative group">
              {/* Main Button */}
              <button className="flex items-center gap-1 text-[#183559] font-semibold hover:text-lv-red-light transition-colors cursor-pointer">
                {item.label}
                {item.sub && (
                  <FiChevronDown className="transition-transform duration-200 group-hover:rotate-180" />
                )}
              </button>

              {/* Dropdown */}
              {item.sub && (
                <div className="absolute left-0 top-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-xl w-64 py-2">
                    {item.sub.map((s) => (
                      <Link
                        key={s}
                        href="#"
                        className="block px-4 py-2 text-lv-blue hover:bg-lv-blueGreen/10 hover:text-lv-red rounded-md transition"
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <FiSearch
            size={20}
            className="ml-6 text-white cursor-pointer hover:text-lv-skyBlue transition-colors"
          />
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
          <FiMenu size={28} className="text-lv-blueGreen" />
        </button>
      </div>

      {/* ------------------------------------------------------ */}
      {/* 🔹 OVERLAY */}
      {/* ------------------------------------------------------ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ------------------------------------------------------ */}
      {/* 🔹 MOBILE SIDEBAR */}
      {/* ------------------------------------------------------ */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* HEADER */}
        <div className="bg-lv-blueGreen text-white p-4 flex justify-between items-center">
          <span className="font-semibold text-lg">MENU</span>
          <button onClick={() => setMobileOpen(false)}>
            <IoClose size={26} />
          </button>
        </div>

        {/* LINKS */}
        <div className="p-4">
          {navLinks.map((item) => (
            <div key={item.label} className="border-b border-gray-200 py-3">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => item.sub && toggleExpand(item.label)}
              >
                <span className="text-sm font-semibold text-lv-blue">
                  {item.label}
                </span>

                {item.sub && (
                  <FiChevronRight
                    className={`transition-transform duration-200 ${expanded === item.label ? "rotate-90" : ""
                      }`}
                  />
                )}
              </div>

              {item.sub && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${expanded === item.label ? "max-h-96 mt-2" : "max-h-0"
                    }`}
                >
                  <div className="pl-4 flex flex-col gap-1">
                    {item.sub.map((s) => (
                      <Link
                        key={s}
                        href="#"
                        className="py-1 text-sm text-gray-700 hover:text-lv-red transition"
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
