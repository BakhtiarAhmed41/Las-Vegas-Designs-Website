import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa6";
import { FiPhone, FiMail } from "react-icons/fi";
import paymentLogos from "@/public/assets/footer/payment.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Main Footer Section */}
      <footer className="w-full bg-[#2E4255] text-white py-12 px-6 md:px-12 overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto w-full">
      {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
            {/* Column 1: About Us */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-4 tracking-wide">
                ABOUT US
          </h3>
              <p className="text-sm leading-relaxed text-white/70 mb-6">
            Las Vegas Designs USA is a professional embroidery digitizing and
                vector art service provider, proudly serving clients worldwide
                since 2015. We specialize in high-quality digitizing and custom
                SVG/vector artwork, trusted for precision, creativity, and
                reliable service.
              </p>

              {/* Contact Info */}
              <div className="mb-4">
                <h4 className="text-sm font-bold uppercase mb-3 tracking-wide">
                  CONTACT US
                </h4>
                <div className="space-y-2">
                  <a
                    href="tel:7253003797"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <FiPhone size={16} />
                    <span>725-300-3797</span>
                  </a>
                  <a
                    href="mailto:Sales@Lasvegasdesignsusa.com"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <FiMail size={16} />
                    <span>Sales@Lasvegasdesignsusa.com</span>
                  </a>
                </div>
              </div>

          {/* Social Icons */}
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FaFacebookF size={18} />
            </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FaXTwitter size={18} />
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FaPinterestP size={18} />
            </a>
          </div>
        </div>

            {/* Column 2: Digitizing Services */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-4 tracking-wide">
                DIGITIZING SERVICES
          </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/hat-embroidery"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
              Hat Logo Digitizing
                  </Link>
            </li>
                <li>
                  <Link
                    href="/applique-embroidery"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
              Applique Logo Digitizing
                  </Link>
            </li>
                <li>
                  <Link
                    href="/services/left-chest-logo-digitizing"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
              Left Chest Logo Digitizing
                  </Link>
            </li>
                <li>
                  <Link
                    href="/services/pet-portrait-digitizing"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
              Pet & Portrait Digitizing
                  </Link>
            </li>
                <li>
                  <Link
                    href="/vehicle-embroidery"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
              Vehicle Logo Digitizing
                  </Link>
            </li>
          </ul>
            </div>

            {/* Column 3: Vector Services & CNC & Laser Cut Services */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-4 tracking-wide">
                VECTOR SERVICES
          </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/svg"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
              One Color SVG
                  </Link>
            </li>
                <li>
                  <Link
                    href="/svg"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
              Full Color SVG
                  </Link>
            </li>
              </ul>

              <h3 className="text-sm font-bold uppercase mb-4 tracking-wide mt-8">
                CNC & LASER CUT SERVICES
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/cnc-laser-cut"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    CNC Cut Files
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cnc-laser-cut"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Engraving Files
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cnc-laser-cut"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Laser Cut Files
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cnc-laser-cut"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Stencil Designs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Custom Vector Services */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-4 tracking-wide">
                CUSTOM VECTOR SERVICES
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/custom-vector"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Image to Vector
                  </Link>
                </li>
                <li>
                  <Link
                    href="/custom-vector"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Color Separation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/custom-vector"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    DTF Printing
                  </Link>
                </li>
            </ul>
        </div>

            {/* Column 4: Quick Links */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-4 tracking-wide">
                QUICK LINKS
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
            Contact Us
                  </Link>
            </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
            </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </Link>
            </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
            </li>
                <li>
                  <Link
                    href="/refund"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Refund Policy
                  </Link>
            </li>
          </ul>
        </div>
      </div>

        </div>
      </footer>

      {/* Bottom Footer Section - Full Width */}
      <div className="w-full bg-[#233241] text-white py-3">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © 2025-26 Las Vegas Designs USA. All rights reserved.
            </p>

        {/* Payment Icons */}
            <div className="flex items-center gap-3">
          <Image
            src={paymentLogos}
                width={280}
                height={50}
                alt="Payment Methods: PayPal, Mastercard, Visa"
                className="max-w-full h-auto"
          />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
