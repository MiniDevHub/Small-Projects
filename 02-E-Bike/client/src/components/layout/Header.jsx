import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Home,
  Phone,
  Info,
  Sparkles,
  Bell,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { logout } = useAuth();

  // Check if we're on a dashboard page
  const isDashboardPage = location.pathname.match(
    /^\/(admin|dealer|employee|serviceman|customer)\//,
  );

  // Compute header style
  const headerStyle = useMemo(() => {
    // If on dashboard, always use light background
    if (isDashboardPage) return "light";

    const darkBackgroundPages = ["/", "/about", "/contact"];
    if (isScrolled) return "scrolled";
    if (darkBackgroundPages.includes(location.pathname)) return "transparent";
    return "light";
  }, [location.pathname, isScrolled, isDashboardPage]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  // Header styles
  const headerStyles = {
    transparent: {
      bg: "bg-transparent",
      text: "text-white",
      textHover: "hover:text-[#00AFAA]",
      activeText: "text-[#00AFAA]",
      button: "bg-white text-[#1e4488] hover:bg-gray-100",
      buttonGhost: "text-white hover:bg-white/10 border-white/20",
      dropdown: "bg-white/10 backdrop-blur-lg border-white/20 text-white",
      mobile: "bg-white/10 text-white backdrop-blur",
    },
    light: {
      bg: "bg-white shadow-sm border-b border-gray-100",
      text: "text-gray-700",
      textHover: "hover:text-[#1e4488]",
      activeText: "text-[#1e4488]",
      button: "bg-[#1e4488] text-white hover:bg-[#2a5199]",
      buttonGhost: "text-gray-700 hover:bg-gray-100 border-gray-200",
      dropdown: "bg-gray-100 hover:bg-gray-200 text-gray-700",
      mobile: "bg-gray-100 text-gray-700",
    },
    scrolled: {
      bg: "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100",
      text: "text-gray-700",
      textHover: "hover:text-[#1e4488]",
      activeText: "text-[#1e4488]",
      button: "bg-[#1e4488] text-white hover:bg-[#2a5199]",
      buttonGhost: "text-gray-700 hover:bg-gray-100 border-gray-200",
      dropdown: "bg-gray-100 hover:bg-gray-200 text-gray-700",
      mobile: "bg-gray-100 text-gray-700",
    },
  };

  const currentStyle = headerStyles[headerStyle];

  // Navigation items based on context
  const getNavigationItems = () => {
    // On dashboard pages, show dashboard-specific nav
    if (isDashboardPage && isAuthenticated) {
      // Super Admin navigation (✅ NEW!)
      if (user?.role === "super_admin") {
        return [
          {
            label: "Dashboard",
            path: "/super-admin/dashboard",
            icon: LayoutDashboard,
          },
          { label: "Admins", path: "/super-admin/admins", icon: Users },
          { label: "System", path: "/super-admin/system", icon: Settings },
          { label: "Logs", path: "/super-admin/logs", icon: FileText },
        ];
      }

      // Admin navigation (existing, but updated paths)
      if (user?.role === "admin") {
        return [
          {
            label: "Dashboard",
            path: "/admin/dashboard",
            icon: LayoutDashboard,
          },
          { label: "Products", path: "/admin/products", icon: Package },
          { label: "Orders", path: "/admin/orders", icon: FileText },
          { label: "Users", path: "/admin/users", icon: Users },
          { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
        ];
      }

      // Dealer navigation (✅ NEW!)
      if (user?.role === "dealer") {
        return [
          {
            label: "Dashboard",
            path: "/dealer/dashboard",
            icon: LayoutDashboard,
          },
          { label: "Orders", path: "/dealer/orders", icon: FileText },
          { label: "Sales", path: "/dealer/sales", icon: ShoppingBag },
          { label: "Inventory", path: "/dealer/inventory", icon: Package },
        ];
      }

      // Other roles return empty for now
      return [];
    }

    // Public navigation (when NOT on dashboard)
    return [
      { label: "Home", path: "/", icon: Home },
      { label: "Products", path: "/products", icon: Package },
      { label: "About", path: "/about", icon: Info },
      { label: "Contact", path: "/contact", icon: Phone },
    ];
  };

  const navigationItems = getNavigationItems();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3" : "py-4"
      } ${currentStyle.bg}`}
    >
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to={
              isAuthenticated
                ? user?.role === "super_admin"
                  ? "/super-admin/dashboard"
                  : `/${user?.role}/dashboard`
                : "/"
            }
            className="flex items-center gap-3"
          >
            <motion.div
              className={`transition-all duration-300 ${
                isScrolled ? "w-12 h-12" : "w-14 h-14"
              }`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/images/logo.png"
                alt="E-bike Point"
                className="object-contain w-full h-full drop-shadow-lg"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="hidden w-full h-full rounded-xl bg-gradient-to-br from-[#1e4488] to-[#00AFAA] items-center justify-center text-white font-bold text-xl shadow-lg">
                EB
              </div>
            </motion.div>
            {!isDashboardPage && (
              <span className={`text-xl font-bold ${currentStyle.text}`}>
                E-Bike Point
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden gap-1 lg:flex">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const itemActive = isActive(item.path);

              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="relative block px-4 py-2 group"
                  >
                    <span
                      className={`font-medium transition-all flex items-center gap-2 ${
                        currentStyle.text
                      } ${
                        itemActive ? currentStyle.activeText : ""
                      } ${currentStyle.textHover}`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {item.label}
                    </span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#1e4488] to-[#00AFAA] origin-left"
                      initial={{ scaleX: itemActive ? 1 : 0 }}
                      animate={{ scaleX: itemActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Notifications (admin/dealer) */}
                {["super_admin", "admin", "dealer"].includes(user?.role) && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative p-2.5 rounded-xl transition-all ${
                      isDashboardPage
                        ? "bg-gray-100 hover:bg-gray-200"
                        : currentStyle.dropdown
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1" />
                  </motion.button>
                )}

                {/* User Menu */}
                <div className="relative hidden lg:block">
                  <motion.button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all ${
                      isDashboardPage
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        : currentStyle.dropdown
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e4488] to-[#00AFAA] flex items-center justify-center text-white font-bold text-sm">
                      {user?.first_name?.[0] || "U"}
                    </div>
                    <div className="text-left">
                      <p className="text-sm leading-none">
                        {user?.first_name || "Account"}
                      </p>
                      <p
                        className={`text-xs ${
                          isDashboardPage ? "text-gray-500" : "text-white/70"
                        }`}
                      >
                        {user?.role?.charAt(0).toUpperCase() +
                          user?.role?.slice(1)}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 w-64 mt-3 overflow-hidden bg-white shadow-2xl rounded-2xl"
                      >
                        <div className="p-5 bg-gradient-to-br from-[#1e4488]/10 to-transparent">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e4488] to-[#00AFAA] flex items-center justify-center text-white font-bold text-lg">
                              {user?.first_name?.[0] || "U"}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {user?.full_name || user?.first_name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                          <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-[#1e4488] to-[#00AFAA] text-white">
                            {user?.role?.toUpperCase()}
                          </span>
                        </div>

                        <div className="p-2">
                          <Link
                            to={
                              user?.role === "super_admin"
                                ? "/super-admin/dashboard"
                                : `/${user?.role}/dashboard`
                            }
                            className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-gray-100 rounded-xl"
                          >
                            <LayoutDashboard className="w-5 h-5" />
                            Dashboard
                          </Link>
                          <Link
                            to={`/${user?.role}/settings`}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl"
                          >
                            <Settings className="w-5 h-5" />
                            Settings
                          </Link>
                        </div>

                        <div className="p-2 border-t">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full gap-3 px-4 py-3 font-medium text-left text-red-600 hover:bg-red-50 rounded-xl"
                          >
                            <LogOut className="w-5 h-5" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className={`rounded-full px-6 font-semibold border ${currentStyle.buttonGhost}`}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    className={`rounded-full px-6 font-semibold shadow-lg ${currentStyle.button}`}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl ${currentStyle.mobile}`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden bg-white shadow-2xl lg:hidden rounded-2xl"
            >
              <nav className="flex flex-col p-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-gray-100 rounded-xl"
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      {item.label}
                    </Link>
                  );
                })}

                {isAuthenticated && (
                  <div className="pt-2 mt-2 border-t">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full gap-3 px-4 py-3 font-medium text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
