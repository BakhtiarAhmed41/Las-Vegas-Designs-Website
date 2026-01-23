"use client";

import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import { FaPinterestP } from "react-icons/fa";
import Image from "next/image";
import paymentLogos from "@/public/assets/footer/payment.png";

export default function FooterSection() {
  return (
    <footer className="w-full mt-16">
      {/* ===================================== */}
      {/* 1️⃣ TOP STATS BAR */}
      {/* ===================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-6 py-10 bg-lv-blueGreen justify-center items-center">
        <div className="text-center p-6 rounded-xl bg-white">
          <p className="text-3xl font-bold">19+</p>
          <p className="text-sm">Years in Business</p>
        </div>

        <div className="text-center p-6 rounded-xl bg-white">
          <p className="text-3xl font-bold">4833+</p>
          <p className="text-sm">5-Star Reviews on Etsy</p>
        </div>

        <div className="text-center p-6 rounded-xl bg-white">
          <p className="text-3xl font-bold">95%</p>
          <p className="text-sm">Customer Satisfaction</p>
        </div>

        <div className="text-center p-6 rounded-xl bg-white">
          <p className="text-3xl font-bold">24hrs</p>
          <p className="text-sm">Rush Service Available</p>
        </div>
      </div>

      {/* ===================================== */}
      {/* 2️⃣ CTA SECTION CENTERED */}
      {/* ===================================== */}
      <div className="flex justify-center px-6 pb-8 bg-lv-blueGreen">
        <div className="flex items-center bg-gray-100 rounded-full shadow-lg overflow-hidden p-1">
          {/* Green tick circle */}
          <div className="flex items-center justify-center bg-teal-600 w-12 h-12 rounded-full ml-1">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Text area */}
          <div className="flex-1 px-4 py-2 text-left">
            <p className="font-bold text-base md:text-lg text-gray-800">
              Need an Instant Quote?
            </p>
            <p className="text-sm md:text-base text-gray-700">
              Text on <span className="font-bold">725 300-3797</span>
            </p>
          </div>
        </div>
      </div>

      {/* ===================================== */}
      {/* 3️⃣ MAIN FOOTER */}
      {/* ===================================== */}
      <div className="bg-[#2C3E50] text-gray-300 py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Column 1 */}
          <div>
            <h3 className="text-white font-semibold mb-3">ABOUT US</h3>
            <p className="text-sm leading-relaxed">
              Las Vegas Designs USA is a professional embroidery digitizing and
              vector art service provider, proudly serving clients worldwide
              since 2015. We specialize in high-quality digitizing and custom
              vector artwork, trusted for precision, creativity, and reliable
              service.
            </p>

            <div className="py-6">
              <h3 className="text-white font-semibold mb-3">CONTACT US</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FiPhone />
                  725 300-3797
                </li>
                <li className="flex items-center gap-2">
                  <FiMail />
                  Sales@Lasvegasdesignsusa.com
                </li>
              </ul>
            </div>

            <div className="flex gap-4 mt-4 text-white text-xl">
              <FiFacebook className="hover:text-teal-300 cursor-pointer transition" />
              <FiInstagram className="hover:text-teal-300 cursor-pointer transition" />
              <FiTwitter className="hover:text-teal-300 cursor-pointer transition" />
              <FaPinterestP className="hover:text-teal-300 cursor-pointer transition" />
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <div>
              <h3 className="text-white font-semibold mb-3">
                DIGITIZING SERVICES
              </h3>
              <ul className="space-y-2 text-sm">
                <li>Hat Logo Digitizing</li>
                <li>Applique Logo Digitizing</li>
                <li>Left Chest Logo Digitizing</li>
                <li>Pet & Portrait Digitizing</li>
                <li>Vehicle Logo Digitizing</li>
              </ul>
            </div>
            <div className="pt-8">
              <h3 className="text-white font-semibold mb-3">VECTOR SERVICES</h3>
              <ul className="space-y-2 text-sm">
                <li>One Color SVG</li>
                <li>Full Color SVG</li>
                <li>CNC & Laser Cut Files</li>
                <li>Custom Engraving Files</li>
                <li>Custom Vector Art</li>
              </ul>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <div>
              <h3 className="text-white font-semibold mb-3">
                CNC & LASER CUT SERVICES
              </h3>
              <ul className="space-y-2 text-sm">
                <li>CNC Cut Files</li>
                <li>Engraving Files</li>
                <li>Laser Cut Files</li>
                <li>Stencil Designs</li>
              </ul>
            </div>
            <div className="pt-8">
              <h3 className="text-white font-semibold mb-3">
                CUSTOM VECTOR SERVICES
              </h3>
              <ul className="space-y-2 text-sm">
                <li>Image to Vector</li>
                <li>Color Separation</li>
                <li>DTF Printing</li>
                <li>Screen Printing</li>
              </ul>
            </div>
          </div>
          {/* Column 4 */}
          <div>
            <h3 className="text-white font-semibold mb-3">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/refund" className="hover:text-white">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===================================== */}
      {/* 4️⃣ BOTTOM COPYRIGHT BAR */}
      {/* ===================================== */}
      <div className="bg-[#253544] text-gray-400 text-xs py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© 2025 Las Vegas Designs USA. All rights reserved.</p>

          <div className="flex">
            <Image
              src={paymentLogos}
              width={350}
              height={60}
              alt="Payment Methods"
              className="rounded-3xl object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
