import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  FileText,
  Settings,
  Wrench,
  Calendar,
  Bike,
  UserCog,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import useAuthStore from "@/store/authStore";

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();
  const { user } = useAuthStore();
  const [hoveredItem, setHoveredItem] = useState(null);

  const isActive = (path) => location.pathname === path;

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname, setIsMobileOpen]);

  // Close sidebar on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileOpen, setIsMobileOpen]);

  // Role-based sidebar items
  const getSidebarItems = () => {
    switch (user?.role) {
      case "super_admin":
        return [
          {
            label: "Dashboard",
            path: "/super-admin/dashboard",
            icon: LayoutDashboard,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Admins",
            path: "/super-admin/admins",
            icon: Users,
            color: "from-purple-500 to-pink-500",
          },
          {
            label: "System Settings",
            path: "/super-admin/system",
            icon: Settings,
            color: "from-orange-500 to-red-500",
          },
          {
            label: "Activity Logs",
            path: "/super-admin/logs",
            icon: FileText,
            color: "from-indigo-500 to-purple-500",
          },
          {
            label: "Analytics",
            path: "/super-admin/analytics",
            icon: BarChart3,
            color: "from-teal-500 to-cyan-500",
          },
        ];

      case "admin":
        return [
          {
            label: "Dashboard",
            path: "/admin/dashboard",
            icon: LayoutDashboard,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Products",
            path: "/admin/products",
            icon: Package,
            color: "from-purple-500 to-pink-500",
          },
          {
            label: "Orders",
            path: "/admin/orders",
            icon: ShoppingBag,
            color: "from-orange-500 to-red-500",
          },
          {
            label: "Users",
            path: "/admin/users",
            icon: Users,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Analytics",
            path: "/admin/analytics",
            icon: BarChart3,
            color: "from-indigo-500 to-purple-500",
          },
          {
            label: "Settings",
            path: "/admin/settings",
            icon: Settings,
            color: "from-gray-500 to-slate-500",
          },
        ];

      case "dealer":
        return [
          {
            label: "Dashboard",
            path: "/dealer/dashboard",
            icon: LayoutDashboard,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Orders",
            path: "/dealer/orders",
            icon: ShoppingBag,
            color: "from-orange-500 to-red-500",
          },
          {
            label: "Sales",
            path: "/dealer/sales",
            icon: FileText,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Inventory",
            path: "/dealer/inventory",
            icon: Package,
            color: "from-purple-500 to-pink-500",
          },
          {
            label: "Employees",
            path: "/dealer/employees",
            icon: Users,
            color: "from-indigo-500 to-blue-500",
          },
          {
            label: "Attendance",
            path: "/dealer/attendance",
            icon: Calendar,
            color: "from-yellow-500 to-orange-500",
          },
          {
            label: "Services",
            path: "/dealer/services",
            icon: Wrench,
            color: "from-teal-500 to-cyan-500",
          },
        ];

      case "employee":
        return [
          {
            label: "Dashboard",
            path: "/employee/dashboard",
            icon: LayoutDashboard,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Sales",
            path: "/employee/sales",
            icon: FileText,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Attendance",
            path: "/employee/attendance",
            icon: Calendar,
            color: "from-yellow-500 to-orange-500",
          },
          {
            label: "Profile",
            path: "/employee/profile",
            icon: UserCog,
            color: "from-purple-500 to-pink-500",
          },
        ];

      case "serviceman":
        return [
          {
            label: "Dashboard",
            path: "/serviceman/dashboard",
            icon: LayoutDashboard,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Services",
            path: "/serviceman/services",
            icon: Wrench,
            color: "from-teal-500 to-cyan-500",
          },
          {
            label: "Attendance",
            path: "/serviceman/attendance",
            icon: Calendar,
            color: "from-yellow-500 to-orange-500",
          },
          {
            label: "Profile",
            path: "/serviceman/profile",
            icon: UserCog,
            color: "from-purple-500 to-pink-500",
          },
        ];

      case "customer":
        return [
          {
            label: "Dashboard",
            path: "/customer/dashboard",
            icon: LayoutDashboard,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "My Orders",
            path: "/customer/orders",
            icon: ShoppingBag,
            color: "from-orange-500 to-red-500",
          },
          {
            label: "My Bikes",
            path: "/customer/bikes",
            icon: Bike,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Services",
            path: "/customer/services",
            icon: Wrench,
            color: "from-teal-500 to-cyan-500",
          },
          {
            label: "Profile",
            path: "/customer/profile",
            icon: UserCog,
            color: "from-purple-500 to-pink-500",
          },
        ];

      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobileOpen || window.innerWidth >= 1024 ? 0 : -300,
        }}
        transition={{ duration: 0.3, type: "spring", damping: 30 }}
        className="fixed bottom-0 left-0 z-50 w-64 overflow-y-auto bg-white border-r border-gray-200 shadow-2xl top-20 lg:translate-x-0"
      >
        <div className="relative p-6">
          {/* Decorative gradient blob */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#1e4488]/10 to-[#00AFAA]/10 rounded-full blur-3xl"
          />

          {/* Mobile Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileOpen(false)}
            className="absolute p-2 transition-colors rounded-xl hover:bg-red-50 top-4 right-4 lg:hidden group"
          >
            <X className="w-5 h-5 text-gray-600 transition-colors group-hover:text-red-600" />
          </motion.button>

          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#1e4488]/10 via-[#00AFAA]/5 to-transparent border border-[#1e4488]/20 overflow-hidden"
          >
            {/* Animated background particles */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, rgba(30, 68, 136, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 175, 170, 0.3) 0%, transparent 50%)",
                backgroundSize: "200% 200%",
              }}
            />

            <div className="relative flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#1e4488] to-[#00AFAA] flex items-center justify-center text-white font-bold text-lg shadow-lg"
              >
                {user?.first_name?.[0] || "U"}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1e4488] to-[#00AFAA]"
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.full_name || user?.first_name}
                </p>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-[#1e4488] to-[#00AFAA] text-white mt-1 shadow-sm"
                >
                  <Sparkles className="w-3 h-3" />
                  {user?.role?.toUpperCase()}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              const isHovered = hoveredItem === index;

              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 * index,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  onHoverStart={() => setHoveredItem(index)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden ${
                      active
                        ? "bg-gradient-to-r from-[#1e4488] to-[#00AFAA] text-white shadow-lg shadow-[#1e4488]/30"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50"
                    }`}
                  >
                    {/* Ripple effect on click */}
                    {active && (
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    )}

                    {/* Hover gradient background */}
                    {!active && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-xl`}
                        initial={false}
                        animate={{ opacity: isHovered ? 0.1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Icon with rotation animation */}
                    <motion.div
                      animate={{
                        rotate: isHovered && !active ? [0, -10, 10, 0] : 0,
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors ${
                          active
                            ? "text-white"
                            : "text-gray-500 group-hover:text-[#1e4488]"
                        }`}
                      />
                    </motion.div>

                    <span className="relative z-10 flex-1 font-medium">
                      {item.label}
                    </span>

                    {/* Active indicator dot with pulse */}
                    {active && (
                      <motion.div
                        className="relative"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                        }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.7, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-white rounded-full"
                          animate={{
                            scale: [1, 2],
                            opacity: [0.5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                      </motion.div>
                    )}

                    {/* Hover arrow */}
                    {!active && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          x: isHovered ? 0 : -10,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4 text-[#1e4488]" />
                      </motion.div>
                    )}

                    {/* Shine effect on hover */}
                    {isHovered && !active && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Quick Stats Section */}
          {user?.role === "admin" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative p-4 mt-8 overflow-hidden border rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-purple-200/50"
            >
              {/* Animated gradient background */}
              <motion.div
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, transparent 30%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)",
                  backgroundSize: "200% 200%",
                }}
              />

              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </motion.div>
                  <p className="text-xs font-semibold text-gray-600">
                    QUICK STATS
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Total Users", value: "0" },
                    { label: "Products", value: "0" },
                    { label: "Orders", value: "0" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/60 backdrop-blur-sm"
                    >
                      <span className="text-sm text-gray-600">
                        {stat.label}
                      </span>
                      <motion.span
                        className="font-bold text-gray-900"
                        whileHover={{ scale: 1.2 }}
                      >
                        {stat.value}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Decorative Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="pt-6 mt-8 border-t border-gray-200"
          >
            <div className="flex items-center justify-center gap-1">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="w-3 h-3 text-[#00AFAA]" />
              </motion.div>
              <p className="text-xs font-medium text-center text-gray-500">
                E-Bike Point © 2026
              </p>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
