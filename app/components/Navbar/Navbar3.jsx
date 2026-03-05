"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FiChevronDown,
    FiMenu,
    FiMail,
    FiPhone,
    FiMessageCircle,
    FiUser,
    FiShoppingCart,
} from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

const siteLogo = "/assets/images/Las Vegas New logo.png";

export default function Navbar3() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const { count: cartCount } = useCart();

    const navLinks = [
        {
            label: "Embroidery",
            hasDropdown: true,
            dropdownHeading: "EMBROIDERY DIGITIZING",
            sub: [
                { label: "Applique Logo Digitizing", href: "/applique-embroidery" },
                { label: "Hat Logo Digitizing", href: "/hat-embroidery" },
                { label: "Left Chest Digitizing", href: "/left-chest-embroidery" },
                { label: "Jacket Back Logo Digitizing", href: "/jacket-back-embroidery" },
                { label: "Custom Pet Embroidery Digitizing", href: "/pet-portrait-embroidery" },
                { label: "Car & Truck Embroidery Digitizing", href: "/vehicle-embroidery" },
            ],
            subFooter: { label: "Request Free color change", href: "/contact#quote-form" },
        },
        {
            label: "SVG",
            hasDropdown: true,
            dropdownHeading: "SVG & CUT FILES",
            href: "/svg",
            sub: [
                { label: "Single-Color SVG", href: "#" },
                { label: "Full-Color SVG", href: "#" },
                { label: "Silhouette ART", href: "#" },
                { label: "Line Art & Illustrations", href: "#" },
            ],
        },
        {
            label: "Custom vector",
            hasDropdown: true,
            dropdownHeading: "CUSTOM VECTOR",
            href: "/custom-vector",
            sub: [
                { label: "Image to Vector", href: "#" },
                { label: "Color Separation", href: "#" },
                { label: "DTF Printing", href: "#" },
                { label: "Screen Printing", href: "#" },
            ],
        },
        {
            label: "CNC and Laser Cut",
            hasDropdown: true,
            dropdownHeading: "CNC & LASER FILES",
            href: "/cnc-laser-cut",
            sub: [
                { label: "CNC Cut Files", href: "#" },
                { label: "Laser Cut Files", href: "#" },
                { label: "Engraving Files", href: "#" },
                { label: "Stencil Designs", href: "#" },
            ],
        },
        {
            label: "Design Library",
            hasDropdown: true,
            dropdownHeading: "DESIGN LIBRARY",
            href: "/design-library",
            sub: [
                { label: "Free Designs", href: "/design-library?access=free" },
                { label: "Design Gallery", href: "/design-library" },
            ],
        },
        { label: "Pricing", hasDropdown: false, href: "/embroidery-pricing" },
        { label: "Portfolio", hasDropdown: false, href: "/portfolio" },
        { label: "Contact us", hasDropdown: false, href: "/contact" },
        {
            label: "Resources",
            hasDropdown: true,
            dropdownHeading: "RESOURCES",
            href: "#",
            sub: [
                { label: "About Us", href: "/about-us" },
                { label: "Payment", href: "/payment" },
                { label: "Blog", href: "/blog" },
                { label: "FAQs", href: "#" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms-and-conditions" },
            ],
        },
    ];

    const contactBarItems = [
        { icon: "phone", label: "(USA) (725) 300-3797", href: "tel:7253003797" },
        { icon: "uk-phone", label: "(UK) +44 7706 709210", href: "tel:+447706709210" },
        { icon: "text", label: "Text (725) 300-3797", href: "sms:7253003797" },
        { icon: "email", label: "Email:", emailAddr: "Sales@LasVegasDesignsUSA.com", href: "mailto:Sales@LasVegasDesignsUSA.com" },
    ];

    const contactDetails = [
        { label: "(USA) (725) 300-3797", href: "tel:7253003797" },
        { label: "(UK) +44 7706 709210", href: "tel:+447706709210" },
        { label: "Text (725) 300-3797", href: "sms:7253003797" },
        { label: "Email: Sales@Lasvegasdesignsusa.com", href: "mailto:Sales@Lasvegasdesignsusa.com" },
        { label: "Contact us", href: "/contact" },
    ];

    const toggleDropdown = (label) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    return (
        <header className="w-full bg-white overflow-visible">
            {/* ------------------------------------------------------ */}
            {/* 🔹 CONTACT INFO BAR (header middle section) */}
            {/* ------------------------------------------------------ */}
            <div className="hidden lg:block bg-[#F5F7FA] border-b border-gray-200/80 w-full overflow-hidden">
                <div className="w-full px-6 py-3">
                    <div className="flex items-center justify-center gap-4 flex-wrap max-w-[1400px] mx-auto">
                        {contactBarItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-gray-700 hover:text-lv-blue font-medium text-[13px] transition-colors duration-200 whitespace-nowrap rounded-full pl-3 pr-4 py-2 shadow-sm border border-gray-200/60"
                            >
                                {item.icon === "phone" && <FiPhone className="text-lv-blue shrink-0" size={14} />}
                                {item.icon === "uk-phone" && (
                                    <>
                                        <span className="text-[10px] font-semibold text-gray-500 uppercase">GB</span>
                                        <FiPhone className="text-lv-blue shrink-0" size={14} />
                                    </>
                                )}
                                {item.icon === "text" && <FiMessageCircle className="text-gray-500 shrink-0" size={14} />}
                                {item.icon === "email" && (
                                    <>
                                        <FiMail className="text-lv-blue shrink-0" size={14} />
                                        <span>{item.label}</span>
                                        <span className="text-lv-red font-semibold">{item.emailAddr}</span>
                                    </>
                                )}
                                {item.icon !== "email" && <span>{item.label}</span>}
                            </a>
                        ))}
                        <span className="text-gray-600 text-[13px] font-medium whitespace-nowrap">
                            <span className="text-lv-red font-semibold">Free</span> color changes available
                        </span>
                        <Link
                            href="/contact#quote-form"
                            className="inline-flex items-center justify-center bg-lv-red hover:bg-lv-red-dark text-white font-bold text-[13px] px-5 py-2.5 rounded-lg transition-colors duration-200 shadow-sm whitespace-nowrap"
                        >
                            Get a Quote
                        </Link>
                        <Link
                            href="/design-library/cart"
                            className="relative inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white/90 text-gray-500 hover:text-lv-red border border-gray-300 shadow-sm transition-colors duration-200"
                            title="Cart"
                        >
                            <FiShoppingCart size={18} strokeWidth={2} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-lv-red text-white text-[10px] font-bold rounded-full px-1">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <span
                            role="img"
                            aria-label="Account"
                            className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white/90 text-gray-500 border border-gray-300 shadow-sm transition-colors duration-200 cursor-default"
                            title="Account (coming soon)"
                        >
                            <FiUser size={18} strokeWidth={2} />
                        </span>
                    </div>
                </div>
            </div>

            {/* ------------------------------------------------------ */}
            {/* 🔹 MAIN NAVIGATION BAR */}
            {/* ------------------------------------------------------ */}
            <div className="bg-[white] w-full relative">
                <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between w-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0">
                        <Image
                            src={siteLogo}
                            width={200}
                            height={68}
                            alt="Las Vegas Designs USA"
                            className="h-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation - Center Aligned */}
                    <div className="hidden lg:flex flex-1 justify-center items-center min-w-0">
                        <nav className="flex items-center gap-6 bg-white rounded-full px-6 py-3 shadow-md shrink-0">
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

                                            {/* Dropdown Menu - compact width, small category heading */}
                                            {item.sub && (
                                                <div className="absolute left-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-max min-w-[180px] max-w-[320px] py-1 border border-gray-100">
                                                        {item.dropdownHeading && (
                                                            <div className="px-4 pt-3 pb-1.5">
                                                                <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                                                                    {item.dropdownHeading}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div className="pb-1">
                                                            {item.sub.map((subItem) => (
                                                                <Link
                                                                    key={subItem.label}
                                                                    href={subItem.href || "#"}
                                                                    className="block px-4 py-2.5 text-gray-800 hover:bg-gray-50 hover:text-lv-red text-[14px] font-normal transition-colors duration-150 whitespace-nowrap"
                                                                >
                                                                    {subItem.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                        {item.subFooter && (
                                                            <>
                                                                <div className="border-t border-gray-200 my-1" />
                                                                <Link
                                                                    href={item.subFooter.href || "#"}
                                                                    className="block px-4 py-2.5 text-gray-800 hover:bg-gray-50 hover:text-lv-red text-[14px] font-normal transition-colors duration-150 whitespace-nowrap"
                                                                >
                                                                    {item.subFooter.label}
                                                                </Link>
                                                            </>
                                                        )}
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
                                            {item.dropdownHeading && (
                                                <div className="px-6 pt-3 pb-1">
                                                    <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                                                        {item.dropdownHeading}
                                                    </span>
                                                </div>
                                            )}
                                            {item.sub.map((subItem) => (
                                                <Link
                                                    key={subItem.label}
                                                    href={subItem.href || "#"}
                                                    className="block px-6 py-2.5 text-[14px] text-gray-700 hover:text-lv-red hover:bg-gray-100 font-medium transition-colors"
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                            {item.subFooter && (
                                                <>
                                                    <div className="border-t border-gray-200 mx-4 my-1" />
                                                    <Link
                                                        href={item.subFooter.href || "#"}
                                                        className="block px-6 py-2.5 text-[14px] text-gray-700 hover:text-lv-red hover:bg-gray-100 font-medium transition-colors"
                                                        onClick={() => setMobileOpen(false)}
                                                    >
                                                        {item.subFooter.label}
                                                    </Link>
                                                </>
                                            )}
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

