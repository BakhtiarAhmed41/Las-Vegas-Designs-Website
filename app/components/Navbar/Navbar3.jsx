"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FiChevronDown,
    FiMenu,
    FiX,
} from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import logo from "@/public/assets/logos/lasLogo.png";
import Image from "next/image";

export default function Navbar3() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const navLinks = [
        {
            label: "Digitizing",
            hasDropdown: true,
            sub: [
                { label: "Applique Logo Digitizing", href: "#" },
                { label: "Hat Logo Digitizing", href: "#" },
                { label: "Left Chest Digitizing", href: "#" },
                { label: "Jacket Back Logo Digitizing", href: "#" },
                { label: "Custom Pet Embroidery Digitizing", href: "#" },
                { label: "Car & Truck Embroidery Digitizing", href: "/vehicle-embroidery" },
            ],
        },
        {
            label: "SVG",
            hasDropdown: true,
            href: "/svg",
            sub: [
                { label: "Single-Color SVG", href: "#" },
                { label: "Full-Color SVG", href: "#" },
                { label: "Silhouette ART", href: "#" },
                { label: "Line Art & Illustrations", href: "#" },
            ],
        },
        {
            label: "CNC & Laser Cut",
            hasDropdown: true,
            href: "/cnc-laser-cut",
            sub: [
                { label: "CNC Cut Files", href: "#" },
                { label: "Laser Cut Files", href: "#" },
                { label: "Engraving Files", href: "#" },
                { label: "Stencil Designs", href: "#" },
            ],
        },
        {
            label: "Custom Vector",
            hasDropdown: true,
            href: "/custom-vector",
            sub: [
                { label: "Image to Vector", href: "#" },
                { label: "Color Separation", href: "#" },
                { label: "DTF Printing", href: "#" },
                { label: "Screen Printing", href: "#" },
            ],
        },
        { label: "Pricing", hasDropdown: false, href: "#" },
        { label: "Free Designs", hasDropdown: false },
        { label: "Payment", hasDropdown: false, href: "/payment" },
        { label: "Blog", hasDropdown: false },
        { label: "Contact", hasDropdown: false, href: "/contact" },
    ];

    const contactDetails = [
        { label: "(USA) (725) 300-3797", href: "tel:7253003797" },
        { label: "(UK) +44 7706 709210", href: "tel:+447706709210" },
        { label: "Text (725) 300-3797", href: "sms:7253003797" },
        {
            label: "Email: Sales@Lasvegasdesignsusa.com",
            href: "mailto:Sales@Lasvegasdesignsusa.com",
        },
        { label: "Contact us", href: "/contact" },
    ];

    const toggleDropdown = (label) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    return (
        <header className="w-full bg-white">
            {/* ------------------------------------------------------ */}
            {/* 🔹 CONTACT INFO BAR */}
            {/* ------------------------------------------------------ */}
            <div className="hidden lg:block bg-[#EEF2FB] border-b border-border-light w-full">
                <div className="w-full px-6 py-2.5">
                    <div className="flex items-center justify-center gap-8 flex-wrap max-w-[1400px] mx-auto">
                        {contactDetails.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="text-black hover:text-lv-blue font-bold text-[13px] transition-colors duration-200"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ------------------------------------------------------ */}
            {/* 🔹 MAIN NAVIGATION BAR */}
            {/* ------------------------------------------------------ */}
            <div className="bg-[white] w-full">
                <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-center w-full gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0">
                        <Image
                            src={logo}
                            width={200}
                            height={68}
                            alt="Las Vegas Designs USA"
                            className="h-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation - Center Aligned */}
                    <div className="hidden lg:flex">
                        <nav className="flex items-center gap-8 bg-white rounded-full px-8 py-3 shadow-md">
                            {navLinks.map((item) => (
                                <div key={item.label} className="relative group">
                                    {item.hasDropdown ? (
                                        <>
                                            <Link
                                                href={item.href || "#"}
                                                className="flex items-center gap-1.5 text-lv-blue hover:text-lv-red font-bold text-[15px] transition-colors duration-200 whitespace-nowrap"
                                            >
                                                {item.label}
                                                <FiChevronDown
                                                    size={14}
                                                    className="transition-transform duration-200 group-hover:rotate-180"
                                                />
                                            </Link>

                                            {/* Dropdown Menu */}
                                            {item.sub && (
                                                <div className="absolute left-0 top-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                                    <div className="bg-white border border-border-light rounded shadow-lg py-2 w-64">
                                                        {item.sub.map((subItem) => (
                                                            <Link
                                                                key={subItem.label}
                                                                href={subItem.href || '#'}
                                                                className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-lv-red text-[14px] font-medium transition-colors duration-150"
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href || "#"}
                                            className="text-lv-blue hover:text-lv-red font-bold text-[15px] transition-colors duration-200 whitespace-nowrap block"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden ml-auto text-lv-blue"
                        onClick={() => setMobileOpen(true)}
                    >
                        <FiMenu size={28} />
                    </button>
                </div>
            </div>

            {/* ------------------------------------------------------ */}
            {/* 🔹 MOBILE OVERLAY */}
            {/* ------------------------------------------------------ */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ------------------------------------------------------ */}
            {/* 🔹 MOBILE SIDEBAR */}
            {/* ------------------------------------------------------ */}
            <div
                className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Mobile Header */}
                <div className="bg-lv-blue text-white p-4 flex justify-between items-center shadow-sm">
                    <span className="font-bold text-lg tracking-wide">MENU</span>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="hover:bg-white/10 p-1 rounded transition-colors"
                    >
                        <IoClose size={26} />
                    </button>
                </div>

                {/* Mobile Contact Info */}
                <div className="border-b border-border-light p-4 bg-contact-bar-bg">
                    {contactDetails.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="block py-2 text-[13px] text-gray-600 hover:text-lv-blue font-normal transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Mobile Navigation Links */}
                <div className="overflow-y-auto h-[calc(100%-200px)]">
                    {navLinks.map((item) => (
                        <div key={item.label} className="border-b border-border-light">
                            {item.hasDropdown ? (
                                <>
                                    <div className="flex justify-between items-center">
                                        <Link
                                            href={item.href || "#"}
                                            className="flex-1 px-4 py-3.5 text-lv-blue font-semibold text-[15px] hover:bg-gray-50 transition-colors"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                        <button
                                            className="px-4 py-3.5 hover:bg-gray-50 transition-colors"
                                            onClick={() => toggleDropdown(item.label)}
                                        >
                                            <FiChevronDown
                                                size={16}
                                                className={`transition-transform duration-200 text-lv-blue ${openDropdown === item.label ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    {/* Mobile Dropdown */}
                                    {item.sub && (
                                        <div
                                            className={`overflow-hidden transition-all duration-300 bg-gray-50 ${openDropdown === item.label ? "max-h-96" : "max-h-0"
                                                }`}
                                        >
                                            {item.sub.map((subItem) => (
                                                <Link
                                                    key={subItem.label}
                                                    href={subItem.href || '#'}
                                                    className="block px-6 py-2.5 text-[14px] text-gray-700 hover:text-lv-red hover:bg-gray-100 font-medium transition-colors"
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.href || "#"}
                                    className="block px-4 py-3.5 text-lv-blue font-semibold text-[15px] hover:bg-gray-50 transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
}

