import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Mobile Sidebar Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMobileSidebarOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden z-40 p-4 bg-gradient-to-r from-[#1e4488] to-[#00AFAA] text-white rounded-full shadow-2xl"
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />

        {/* Main Content with responsive spacing */}
        <main className="flex-1 p-4 lg:ml-64 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
