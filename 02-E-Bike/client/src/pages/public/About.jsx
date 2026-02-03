import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  MapPin,
  Zap,
  Target,
  Eye,
  Shield,
  Battery,
  Gauge,
  Wrench,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Efficient Performance",
      description:
        "Optimized power delivery for smooth pickup, stable handling and comfortable city rides.",
      color: "bg-teal-500",
    },
    {
      icon: Battery,
      title: "Reliable Battery",
      description:
        "Battery solutions designed for everyday usage with dependable backup and safety.",
      color: "bg-teal-500",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Better braking confidence, strong chassis, and quality checks for safe mobility.",
      color: "bg-teal-500",
    },
    {
      icon: Wrench,
      title: "Service Support",
      description:
        "Service guidance and genuine spares network for long-term ownership peace of mind.",
      color: "bg-teal-500",
    },
  ];

  const missionPoints = [
    "Build practical EV products for daily use",
    "Maintain quality, safety and consistency",
    "Support customers through service & spares",
  ];

  const visionPoints = [
    "Expand service & dealership coverage",
    "Improve battery technology and range",
    "Create a complete EV ecosystem",
  ];

  const achievements = [
    {
      value: "100%",
      label: "Customer Satisfaction",
      subtitle: "Focus on customer satisfaction",
    },
    {
      value: "Eco",
      label: "Clean Mobility Mission",
      subtitle: "Clean mobility mission",
    },
    {
      value: "Support",
      label: "Service & Spares",
      subtitle: "Service & spares assistance",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Video - Same as Homepage */}
      <section className="relative flex items-center justify-center min-h-screen pt-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e4488] via-[#201b51] to-[#00AFAA]" />

        {/* Social Media Sidebar */}
        <div className="absolute z-20 flex-col hidden gap-4 -translate-y-1/2 left-8 top-1/2 xl:flex">
          <span className="text-white text-xs font-bold tracking-[0.2em] transform -rotate-90 origin-center mb-16 opacity-70">
            FOLLOW US
          </span>
          {[
            { Icon: Facebook, href: "#" },
            { Icon: Instagram, href: "#" },
            { Icon: Youtube, href: "#" },
            { Icon: Linkedin, href: "#" },
          ].map(({ Icon, href }, idx) => (
            <a
              key={idx}
              href={href}
              className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1e4488] transition-all duration-300 hover:scale-110"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Content Container */}
        <div className="container relative z-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center text-white lg:text-left"
              >
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-8">
                  Step Into The{" "}
                  <span className="text-[#00AFAA]">EV Future</span>
                  <br />
                  With <span className="text-[#00AFAA]">E-bike</span>
                </h1>

                <p className="mb-12 text-lg leading-relaxed lg:text-xl text-white/90">
                  Future-ready electric mobility for everyday India. Making
                  sustainable transportation accessible, affordable, and
                  aspirational for every Indian household.
                </p>

                <div className="flex flex-wrap justify-center gap-5 lg:justify-start">
                  <Link to="/auth/register?type=dealer">
                    <Button
                      size="lg"
                      className="bg-[#131419] hover:bg-[#1a1b24] text-white px-10 py-7 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
                    >
                      Become a Dealer
                      <ChevronRight className="w-6 h-6 ml-2" />
                    </Button>
                  </Link>

                  <Link to="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-[#131419] px-10 py-7 rounded-full text-lg font-bold shadow-2xl transition-all hover:scale-105"
                    >
                      Book E-Bike Service
                      <ChevronRight className="w-6 h-6 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Right Video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex items-center justify-center"
              >
                {/* Large Portrait Video Container */}
                <div className="relative w-full max-w-md h-[600px] lg:h-[1000px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-xl">
                  <video
                    className="object-cover w-full h-full"
                    src="/videos/video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/video-poster.jpg"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201b51]/30 via-transparent to-transparent pointer-events-none" />

                  {/* Decorative glow effect */}
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-[#1e4488]/20 via-transparent to-[#00AFAA]/20 pointer-events-none" />
                </div>

                {/* Decorative circles */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#00AFAA]/20 rounded-full blur-3xl animate-pulse" />
                <div
                  className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#1e4488]/20 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-[#00AFAA] font-bold mb-4 tracking-wider text-sm uppercase">
                ⚡ WHO WE ARE
              </h4>
              <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-[#1e4488]">
                Future-ready electric mobility for everyday India
              </h2>

              <div className="mb-8 space-y-5 text-lg leading-relaxed text-gray-700">
                <p>
                  E-Bike is built to make daily commuting smooth, affordable,
                  and eco-friendly. From city roads to long routes, our electric
                  two-wheelers are designed with comfort, performance, and
                  reliability in mind.
                </p>

                <p>
                  We focus on strong build quality, efficient battery systems,
                  safe braking, and service support — so you can ride with
                  confidence every day.
                </p>
              </div>
            </motion.div>

            {/* Right Card - Smart EV Ecosystem */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="overflow-hidden shadow-2xl bg-gradient-to-br from-[#00AFAA] to-[#1e4488]">
                <CardContent className="p-8 text-white lg:p-10">
                  <h3 className="mb-4 text-3xl font-bold">
                    Smart EV Ecosystem
                  </h3>
                  <ul className="mb-8 space-y-2 text-lg">
                    <li>• Quality products</li>
                    <li>• Genuine spares</li>
                    <li>• Battery support</li>
                    <li>• Dealer network</li>
                  </ul>

                  <div className="flex flex-col gap-4">
                    <Link to="/products">
                      <Button
                        size="lg"
                        className="w-full bg-white text-[#1e4488] hover:bg-gray-100 font-bold rounded-xl shadow-xl"
                      >
                        View Products
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>

                    <Link to="/contact">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full text-white border-2 border-white hover:bg-white hover:text-[#1e4488] font-bold rounded-xl"
                      >
                        Contact Us
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-2xl hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl ${feature.color} bg-opacity-10`}
                    >
                      <feature.icon
                        className={`w-10 h-10 ${feature.color.replace("bg-", "text-")}`}
                      />
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-[#1e4488] rounded-2xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Our Mission
                  </h2>
                </div>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                To deliver affordable electric mobility with dependable quality,
                strong after-sales support, and a growing dealer ecosystem —
                making clean commuting accessible for everyone.
              </p>
              <ul className="space-y-3">
                {missionPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="p-1 mt-1 bg-[#1e4488] rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-[#00AFAA] rounded-2xl">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Our Vision
                  </h2>
                </div>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                To become a trusted EV brand in India with strong innovation,
                greener mobility and a wide dealer network — helping cities
                reduce noise and pollution while improving everyday travel.
              </p>
              <ul className="space-y-3">
                {visionPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="p-1 mt-1 bg-[#00AFAA] rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Cards */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <Card className="overflow-hidden shadow-xl bg-gradient-to-br from-[#1e4488] to-[#00AFAA] h-full">
                  <CardContent className="p-10 text-center text-white">
                    <div className="mb-4 text-6xl font-bold">
                      {achievement.value}
                    </div>
                    <div className="mb-2 text-2xl font-bold">
                      {achievement.label}
                    </div>
                    <div className="text-white/80">{achievement.subtitle}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            {[
              { value: "5+", label: "Years of Excellence" },
              { value: "250+", label: "Dealer Network" },
              { value: "15000+", label: "Happy Customers" },
              { value: "Pan India", label: "Presence" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center"
              >
                <h3 className="text-6xl lg:text-7xl font-bold text-[#1e4488] mb-3">
                  {stat.value}
                </h3>
                <h4 className="text-xl font-bold text-gray-900">
                  {stat.label}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#1e4488] to-[#00AFAA]">
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Ready to Join the EV Revolution?
            </h2>
            <p className="mb-10 text-xl text-white/90">
              Partner with India's fastest-growing electric mobility network
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/auth/register?type=dealer">
                <Button
                  size="lg"
                  className="bg-white text-[#1e4488] hover:bg-gray-100 px-10 py-7 rounded-full text-lg font-bold shadow-2xl transition-all hover:scale-105"
                >
                  Become a Dealer
                  <ChevronRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>

              <Link to="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1e4488] px-10 py-7 rounded-full text-lg font-bold transition-all hover:scale-105"
                >
                  Explore Products
                  <ChevronRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
