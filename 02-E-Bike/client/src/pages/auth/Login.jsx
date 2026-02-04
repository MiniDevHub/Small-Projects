import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Bike,
  Shield,
  Zap,
  TrendingUp,
  Users,
  ChevronRight,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Crown,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import useAuthStore from "@/store/authStore";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { SOCIAL_LINKS } from "@/utils/constants";
import MinimalHeader from "@/components/layout/MinimalHeader";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { login, isLoggingIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = (data) => {
    login(data);
  };

  // Regular user role cards (Customer, Dealer, Employee)
  const regularRoleCards = [
    {
      role: "customer",
      title: "Customer Login",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      features: ["Order Tracking", "Service Booking", "Warranty Status"],
    },
    {
      role: "dealer",
      title: "Dealer Portal",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      features: ["Inventory Management", "Sales Dashboard", "Employee Portal"],
    },
    {
      role: "employee",
      title: "Staff Login",
      icon: Bike,
      color: "from-green-500 to-emerald-500",
      features: ["Attendance", "Sales Entry", "Performance"],
    },
  ];

  // Admin role cards (Admin, Super Admin)
  const adminRoleCards = [
    {
      role: "admin",
      title: "Admin Portal",
      icon: ShieldCheck,
      color: "from-orange-500 to-red-500",
      features: ["Product Management", "Order Approval", "User Management"],
    },
    {
      role: "super_admin",
      title: "Super Admin",
      icon: Crown,
      color: "from-purple-600 to-pink-600",
      features: ["Admin Management", "System Settings", "Full Access"],
    },
  ];

  const currentRoleCards = showAdminPortal ? adminRoleCards : regularRoleCards;

  return (
    <>
      <MinimalHeader />
      <div className="flex min-h-screen pt-20">
        {/* Left Side - Form */}
        <div className="relative flex items-center justify-center w-full px-6 py-12 lg:w-1/2 xl:w-2/5">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e4488' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-md">
            {/* Logo & Welcome */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white rounded-2xl bg-gradient-to-br from-[#1e4488] to-[#00AFAA] shadow-lg">
                  EB
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  E-Bike Point
                </span>
              </div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {showAdminPortal ? "Administrative Access" : "Welcome Back!"}
              </h1>
              <p className="text-gray-600">
                {showAdminPortal
                  ? "Secure login for system administrators"
                  : "Login to access your dashboard and manage your account"}
              </p>
            </motion.div>

            {/* Role Selection */}
            {!selectedRole ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                <p className="mb-6 text-sm font-medium text-center text-gray-700">
                  {showAdminPortal
                    ? "Select administrative access level"
                    : "Select your account type to continue"}
                </p>

                {/* Role Cards */}
                <div className="space-y-4">
                  {currentRoleCards.map((card, index) => (
                    <motion.button
                      key={card.role}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => setSelectedRole(card.role)}
                      className="relative w-full p-6 overflow-hidden text-left transition-all bg-white border-2 border-gray-200 shadow-sm group rounded-2xl hover:border-[#1e4488] hover:shadow-lg"
                    >
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {card.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {card.features.join(" • ")}
                            </p>
                          </div>
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                          >
                            <card.icon className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="absolute text-gray-400 transition-all top-6 right-6 group-hover:translate-x-1 group-hover:text-[#1e4488]" />
                    </motion.button>
                  ))}
                </div>

                {/* Toggle Admin Portal */}
                <div className="pt-6 text-center border-t">
                  <button
                    onClick={() => {
                      setShowAdminPortal(!showAdminPortal);
                      setSelectedRole(null);
                    }}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#1e4488]"
                  >
                    {showAdminPortal ? (
                      <>
                        <ArrowLeft className="w-4 h-4" />
                        Back to User Login
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        Administrative Access
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                {/* Login Form */}
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedRole(null)}
                    className="flex items-center gap-2 mb-6 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Back to role selection
                  </button>

                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-medium bg-gray-100 rounded-full">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                          [...regularRoleCards, ...adminRoleCards].find(
                            (r) => r.role === selectedRole,
                          )?.color
                        } flex items-center justify-center text-white`}
                      >
                        {React.createElement(
                          [...regularRoleCards, ...adminRoleCards].find(
                            (r) => r.role === selectedRole,
                          )?.icon,
                          { className: "w-4 h-4" },
                        )}
                      </div>
                      {
                        [...regularRoleCards, ...adminRoleCards].find(
                          (r) => r.role === selectedRole,
                        )?.title
                      }
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="mt-1.5 h-12"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 pr-12"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#1e4488] border-gray-300 rounded focus:ring-[#1e4488]"
                      />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-[#1e4488] hover:text-[#2a5199]"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#1e4488] to-[#00AFAA] hover:opacity-90 transition-opacity"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>

                  {!showAdminPortal && (
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 text-gray-500 bg-white">
                            Or
                          </span>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-gray-600">
                          Don't have an account?{" "}
                          <Link
                            to="/register"
                            className="font-semibold text-[#1e4488] hover:text-[#2a5199]"
                          >
                            Register here
                          </Link>
                        </p>
                      </div>
                    </>
                  )}
                </motion.form>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Right Side - Hero Section */}
        <div className="relative items-center justify-center hidden w-1/2 overflow-hidden lg:flex xl:w-3/5">
          {/* Video Background */}
          <div className="absolute inset-0">
            <video
              className="object-cover w-full h-full"
              src="/videos/video.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e4488]/80 via-[#201b51]/70 to-[#00AFAA]/80" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 max-w-2xl px-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                {showAdminPortal ? (
                  <motion.div
                    key="admin"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="mb-6 text-5xl font-bold leading-tight">
                      Secure Admin
                      <br />
                      <span className="text-[#00AFAA]">Portal Access</span>
                    </h2>
                    <p className="mb-12 text-xl leading-relaxed text-white/90">
                      Manage your E-Bike Point network with powerful
                      administrative tools and insights.
                    </p>

                    <div className="space-y-4">
                      {[
                        {
                          icon: ShieldCheck,
                          text: "Secure & Encrypted Access",
                        },
                        { icon: Crown, text: "Full System Control" },
                        { icon: Zap, text: "Real-time Analytics" },
                      ].map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                            <feature.icon className="w-5 h-5 text-[#00AFAA]" />
                          </div>
                          <span>{feature.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="regular"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h2 className="mb-6 text-5xl font-bold leading-tight">
                      Powering India's
                      <br />
                      <span className="text-[#00AFAA]">
                        Electric Revolution
                      </span>
                    </h2>
                    <p className="mb-12 text-xl leading-relaxed text-white/90">
                      Join 250+ dealers and 15,000+ happy customers in the
                      sustainable mobility movement.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mb-12">
                      {[
                        { value: "250+", label: "Dealer Network" },
                        { value: "15K+", label: "Happy Riders" },
                        { value: "5+", label: "Years Excellence" },
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                        >
                          <h3 className="mb-1 text-3xl font-bold text-[#00AFAA]">
                            {stat.value}
                          </h3>
                          <p className="text-sm text-white/70">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      {[
                        { icon: Zap, text: "Advanced Battery Technology" },
                        { icon: Shield, text: "2 Year Comprehensive Warranty" },
                        { icon: Bike, text: "15+ Award-Winning Models" },
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                            <feature.icon className="w-5 h-5 text-[#00AFAA]" />
                          </div>
                          <span className="text-white/90">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="absolute flex gap-4 bottom-8 right-8">
            {[
              {
                icon: Facebook,
                href: SOCIAL_LINKS.facebook,
                label: "Facebook",
              },
              {
                icon: Instagram,
                href: SOCIAL_LINKS.instagram,
                label: "Instagram",
              },
              { icon: Youtube, href: SOCIAL_LINKS.youtube, label: "YouTube" },
              {
                icon: Linkedin,
                href: SOCIAL_LINKS.linkedin,
                label: "LinkedIn",
              },
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                  className="flex items-center justify-center text-white transition-all border rounded-full w-11 h-11 bg-white/10 backdrop-blur border-white/20 hover:bg-white hover:text-[#1e4488] hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
