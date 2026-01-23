"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiChevronDown,
  FiMenu,
  FiX,
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
    <header className="max-w-screen w-screen bg-white pt-5">
      <div className="hidden lg:flex gap-10 justify-center">
        {contactDetails.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="text-lv-blue hover:text-lv-red font-medium text-lg"
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="w-screen mx-auto px-10 py-4 flex items-center justify-between lg:justify-normal lg:gap-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={200} height={68} alt="Las Vegas Designs" />
        </Link>

        {/* Desktop Navigation */}
        <>
          <nav className="hidden lg:flex items-center gap-4 p-2">
            {navLinks.map((item) => (
              <div key={item.label} className="relative group">
                <button className="flex items-center gap-1 text-lv-blue hover:text-lv-red text-lg font-medium py-2 pb-1">
                  {item.label}
                  {item.sub && (
                    <FiChevronDown className="transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </button>

                {item.sub && (
                  <div className="z-50 absolute left-0 top-14 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-lv-blue-light shadow-lg p-3 w-64">
                      {item.sub.map((s) => (
                        <Link
                          key={s}
                          href="#"
                          className="block px-3 py-2 text-md hover:text-lv-red text-white font-semibold transition-colors duration-150"
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
              className="ml-10 text-lv-blue cursor-pointer hover:text-lv-red transition-colors duration-150"
              size={20}
            />
          </nav>
        </>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
          <FiMenu size={26} />
        </button>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="bg-lv-red text-white p-4 flex justify-between items-center">
          <span className="font-semibold">MENU</span>
          <button onClick={() => setMobileOpen(false)}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="p-4">
          {navLinks.map((item) => (
            <div key={item.label} className="border-b border-gray-200 py-3">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => item.sub && toggleExpand(item.label)}
              >
                <span className="text-sm font-medium">{item.label}</span>

                {item.sub && (
                  <FiChevronRight
                    className={`transition-transform duration-200 ${
                      expanded === item.label ? "rotate-90" : ""
                    }`}
                  />
                )}
              </div>

              {/* Expandable submenu with smooth animation */}
              {item.sub && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expanded === item.label ? "max-h-96 mt-2" : "max-h-0"
                  }`}
                >
                  <div className="pl-4 flex flex-col gap-1 text-sm">
                    {item.sub.map((s) => (
                      <Link
                        key={s}
                        href="#"
                        className="py-1 text-gray-700 hover:text-lv-red transition-colors duration-150"
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
