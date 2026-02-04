import React from "react";
import { Link } from "react-router-dom";
import { Home, Info, Phone, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const MinimalHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg"
    >
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-gray-400 transition-transform group-hover:-translate-x-1" />
            <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white rounded-xl bg-gradient-to-br from-[#1e4488] to-[#00AFAA] shadow-md">
              EB
            </div>
            <span className="text-xl font-bold text-gray-900">
              E-Bike Point
            </span>
          </Link>

          {/* Quick Links */}
          <nav className="items-center hidden gap-6 md:flex">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#1e4488]"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#1e4488]"
            >
              <Info className="w-4 h-4" />
              About
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#1e4488]"
            >
              <Phone className="w-4 h-4" />
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default MinimalHeader;
