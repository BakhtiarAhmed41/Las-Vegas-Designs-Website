import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

import paymentLogos from "@/public/assets/footer/payment.png";

export default function Footer() {
  return (
    <>
      {/* Main Footer Section - 6 columns */}
      <footer className="w-full bg-[#34404C] text-white py-12 px-6 md:px-12 overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1fr_1fr] gap-x-8 gap-y-8 lg:gap-x-10 lg:gap-y-8">
            {/* Column 1: Brand, tagline, address, social */}
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-3">
                LAS VEGAS DESIGNS USA
              </h3>
              <p className="text-sm leading-relaxed text-white/90 mb-4">
                Providing custom embroidery digitizing and vector art solutions for businesses and creators..
              </p>
              <h4 className="text-xs font-bold uppercase tracking-wide mb-2 mt-6">
                ADDRESS
              </h4>
              <p className="text-sm text-white/90 leading-relaxed">
                1502 New Combes Hwy #530064<br />
                Harlingen, TX 78550
              </p>
              <div className="flex gap-3 mt-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="YouTube"
                >
                  <FaYoutube size={16} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={16} />
                </a>
              </div>
            </div>

            {/* Column 2: COMPANY */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide mb-4">
                COMPANY
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/about-us" className="text-sm text-white/90 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-sm text-white/90 hover:text-white transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-white/90 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/embroidery-pricing" className="text-sm text-white/90 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-white/90 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: EMBROIDERY DIGITIZING */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide mb-4">
                EMBROIDERY DIGITIZING
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/left-chest-embroidery" className="text-sm text-white/90 hover:text-white transition-colors">
                    Left Chest Digitizing
                  </Link>
                </li>
                <li>
                  <Link href="/hat-embroidery" className="text-sm text-white/90 hover:text-white transition-colors">
                    Hats & Caps Digitizing
                  </Link>
                </li>
                <li>
                  <Link href="/jacket-back-embroidery" className="text-sm text-white/90 hover:text-white transition-colors">
                    Jacket Back Digitizing
                  </Link>
                </li>
                <li>
                  <Link href="/pet-portrait-embroidery" className="text-sm text-white/90 hover:text-white transition-colors">
                    Pet Digitizing
                  </Link>
                </li>
                <li>
                  <Link href="/applique-embroidery" className="text-sm text-white/90 hover:text-white transition-colors">
                    Appliqué Digitizing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: VECTOR AND SVG */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide mb-4">
                VECTOR AND SVG
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/svg" className="text-sm text-white/90 hover:text-white transition-colors">
                    One Color SVG
                  </Link>
                </li>
                <li>
                  <Link href="/svg" className="text-sm text-white/90 hover:text-white transition-colors">
                    Full Color SVG
                  </Link>
                </li>
                <li>
                  <Link href="/custom-vector" className="text-sm text-white/90 hover:text-white transition-colors">
                    Image to Vector
                  </Link>
                </li>
                <li>
                  <Link href="/custom-vector" className="text-sm text-white/90 hover:text-white transition-colors">
                    Color Separation
                  </Link>
                </li>
                <li>
                  <Link href="/custom-vector" className="text-sm text-white/90 hover:text-white transition-colors">
                    DTF Print Files
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: CNC AND LASER */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide mb-4">
                CNC AND LASER
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/cnc-laser-cut" className="text-sm text-white/90 hover:text-white transition-colors">
                    CNC Cut Files
                  </Link>
                </li>
                <li>
                  <Link href="/cnc-laser-cut" className="text-sm text-white/90 hover:text-white transition-colors">
                    Engraving Files
                  </Link>
                </li>
                <li>
                  <Link href="/cnc-laser-cut" className="text-sm text-white/90 hover:text-white transition-colors">
                    Laser Cut Files
                  </Link>
                </li>
                <li>
                  <Link href="/cnc-laser-cut" className="text-sm text-white/90 hover:text-white transition-colors">
                    Stencil Designs
                  </Link>
                </li>
                <li>
                  <Link href="/cnc-laser-cut" className="text-sm text-white/90 hover:text-white transition-colors">
                    Plasma Cut Files
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 6: SUPPORT + Payment logos */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide mb-4">
                SUPPORT
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/contact" className="text-sm text-white/90 hover:text-white transition-colors">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-white/90 hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-white/90 hover:text-white transition-colors">
                    Upload Files
                  </Link>
                </li>
                <li>
                  <Link href="/design-library" className="text-sm text-white/90 hover:text-white transition-colors">
                    Design Library
                  </Link>
                </li>
                <li>
                  <Link href="/design-library" className="text-sm text-white/90 hover:text-white transition-colors">
                    Free Designs
                  </Link>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Image
                  src={paymentLogos}
                  width={280}
                  height={50}
                  alt="Payment Methods: PayPal, Discover, Mastercard, Visa"
                  className="max-w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright Bar */}
      <div className="w-full bg-[#2a3540] text-white border-t border-white/20 py-4">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/90">
              Copyright © 2026 Las Vegas Designs USA. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/privacy-policy" className="text-white/90 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="text-white/90 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="text-white/90 hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
