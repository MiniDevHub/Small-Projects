import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/utils/constants";

const Footer = () => {
  return (
    <footer className="relative py-16 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-30 animate-gradient"
        style={{
          background:
            "linear-gradient(120deg, #0ea5e9, #22c55e, #8b5cf6, #f97316)",
          backgroundSize: "300% 300%",
        }}
      />

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e4488] to-[#00AFAA] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                EB
              </div>
              <span className="text-2xl font-bold text-white">
                E-Bike Point
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-300">
              India's leading electric bike dealership network. Transforming
              urban mobility with cutting-edge technology and sustainable
              solutions.
            </p>
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
              <Phone className="w-4 h-4 text-[#00AFAA]" />
              <a
                href="tel:+917980598210"
                className="transition-colors hover:text-white"
              >
                +91 7980598210
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Mail className="w-4 h-4 text-[#00AFAA]" />
              <a
                href="mailto:enicontrol@yahoo.com"
                className="transition-colors hover:text-white"
              >
                enicontrol@yahoo.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="/#faqs"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/auth/register?type=dealer"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Become a Dealer
                </Link>
              </li>
              <li>
                <Link
                  to="/service-booking"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Service Booking
                </Link>
              </li>
              <li>
                <Link
                  to="/warranty"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Warranty Information
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">
              Connect With Us
            </h3>
            <p className="mb-4 text-sm text-gray-300">
              Follow us on social media for updates and offers
            </p>
            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white transition-all border rounded-full shadow-lg w-11 h-11 bg-white/10 backdrop-blur border-white/20 hover:bg-white hover:text-gray-900 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white transition-all border rounded-full shadow-lg w-11 h-11 bg-white/10 backdrop-blur border-white/20 hover:bg-white hover:text-gray-900 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white transition-all border rounded-full shadow-lg w-11 h-11 bg-white/10 backdrop-blur border-white/20 hover:bg-white hover:text-gray-900 hover:-translate-y-1"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white transition-all border rounded-full shadow-lg w-11 h-11 bg-white/10 backdrop-blur border-white/20 hover:bg-white hover:text-gray-900 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div className="text-sm text-white/80">
              © {new Date().getFullYear()} E-Bike Point. All Rights Reserved
            </div>

            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/privacy-policy"
                className="transition-colors text-white/60 hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="transition-colors text-white/60 hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                to="/refund-policy"
                className="transition-colors text-white/60 hover:text-white"
              >
                Refund Policy
              </Link>
            </div>

            <div className="text-sm text-white/60">
              Designed & Developed by{" "}
              <a
                href="https://digitalmarketing.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-[#00AFAA] transition-colors"
              >
                Digital Marketing INC
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 15s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
