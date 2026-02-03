import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  Battery,
  Gauge,
  Zap,
  Video,
  ChevronRight,
  Phone,
  Mail,
  Shield,
  Truck,
  Headphones,
  TrendingUp,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { formatCurrency } from "@/utils/formatters";
import ProductsGrid from "@/components/products/ProductsGrid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const HomePage = () => {
  const [activeModel, setActiveModel] = useState("LIGHTNING");
  const [activeColor, setActiveColor] = useState(0);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(2);

  // Model data
  const bikeModels = {
    LIGHTNING: {
      colors: [
        {
          name: "Midnight Black",
          hex: "#1f1f1f",
          images: [
            "/images/bikes/lightning/black-1.jpg",
            "/images/bikes/lightning/black-2.jpg",
            "/images/bikes/lightning/black-3.jpg",
          ],
        },
      ],
    },
    RABBITOR: {
      colors: [
        {
          name: "Ocean Blue",
          hex: "#1565c0",
          images: [
            "/images/bikes/rabbitor/blue-1.jpg",
            "/images/bikes/rabbitor/blue-2.jpg",
            "/images/bikes/rabbitor/blue-3.jpg",
          ],
        },
        {
          name: "Racing Red",
          hex: "#c62828",
          images: [
            "/images/bikes/rabbitor/red-1.jpg",
            "/images/bikes/rabbitor/red-2.jpg",
            "/images/bikes/rabbitor/red-3.jpg",
          ],
        },
      ],
    },
    SSUP: {
      colors: [
        {
          name: "Arctic White",
          hex: "#c62828",
          images: [
            "/images/bikes/ssup/red-white-1.jpg",
            "/images/bikes/ssup/red-white-2.jpg",
            "/images/bikes/ssup/red-white-3.jpg",
          ],
        },
        {
          name: "Stealth Black",
          hex: "#1f1f1f",
          images: [
            "/images/bikes/ssup/black-1.jpg",
            "/images/bikes/ssup/black-2.jpg",
            "/images/bikes/ssup/black-3.jpg",
          ],
        },
        {
          name: "Sky Blue",
          hex: "#1565c0",
          images: [
            "/images/bikes/ssup/blue-1.jpg",
            "/images/bikes/ssup/blue-2.jpg",
            "/images/bikes/ssup/blue-3.jpg",
          ],
        },
      ],
    },
    JV: {
      colors: [
        {
          name: "Sea Green",
          hex: "#9aa3ad",
          images: [
            "/images/bikes/jv/sea-green-1.jpg",
            "/images/bikes/jv/sea-green-2.jpg",
            "/images/bikes/jv/sea-green-3.jpg",
          ],
        },
        {
          name: "Sport Red",
          hex: "#c62828",
          images: [
            "/images/bikes/jv/red-white-1.jpg",
            "/images/bikes/jv/red-white-2.jpg",
            "/images/bikes/jv/red-white-3.jpg",
          ],
        },
      ],
    },
    MARIUM: { colors: [] },
    MAKI: { colors: [] },
  };

  const currentBike = bikeModels[activeModel];

  // FAQ data
  const faqItems = [
    {
      question: "What's the real-world range of E-bikes on a single charge?",
      answer:
        "Our E-bikes deliver 60-120 km range depending on the model, riding conditions, and assist level. City riding typically yields 80-100 km, while highway speeds may reduce it to 60-80 km. Factors like rider weight, terrain, and weather also play a role.",
    },
    {
      question: "How fast can I charge my E-bike battery?",
      answer:
        "Standard charging takes 4-6 hours for a full charge. We also offer fast-charging options on select models that can charge up to 80% in just 2 hours. All our chargers are portable and work with standard home outlets (15A).",
    },
    {
      question: "Do I need a license to ride an E-bike?",
      answer:
        "Yes, you need a valid driving license for E-bikes above 25 km/h speed. Models with speeds up to 25 km/h don't require a license. All our high-speed models require registration and insurance as per government regulations.",
    },
    {
      question: "What's the battery life and replacement cost?",
      answer:
        "Our lithium-ion batteries are designed for 800-1000 charge cycles (3-5 years of regular use). Battery performance remains above 80% for the first 2 years. Replacement costs range from ₹15,000 to ₹25,000 depending on the model.",
    },
    {
      question: "Can I ride my E-bike in the rain?",
      answer:
        "Yes! All our E-bikes have IP67 water resistance rating. They're safe in heavy rain, puddles, and regular washing. However, avoid submerging the battery or motor in deep water. The charging port has a waterproof cover for added protection.",
    },
    {
      question: "What warranty and service support do you offer?",
      answer:
        "We provide 2-year warranty on battery and motor, 1-year on controller and charger. Free service for first 4 services or 1 year. We have 250+ service centers across India with trained technicians and genuine spare parts availability.",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Video */}
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
                  Accelerate Into The{" "}
                  <span className="text-[#00AFAA]">Electric</span>
                  <br />
                  Revolution With <span className="text-[#00AFAA]">E-bike</span>
                </h1>

                <p className="mb-12 text-lg leading-relaxed lg:text-xl text-white/90">
                  Join India's fastest-growing electric mobility network.
                  Experience cutting-edge technology, unmatched performance, and
                  sustainable transportation that powers your future.
                </p>

                <div className="flex flex-wrap justify-center gap-5 lg:justify-start">
                  <Link to="/auth/register?type=dealer">
                    <Button
                      size="lg"
                      className="bg-[#131419] hover:bg-[#1a1b24] text-white px-10 py-7 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
                    >
                      Partner With Us
                      <ChevronRight className="w-6 h-6 ml-2" />
                    </Button>
                  </Link>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-[#131419] px-10 py-7 rounded-full text-lg font-bold shadow-2xl transition-all hover:scale-105"
                    onClick={() => setShowServiceModal(true)}
                  >
                    Book Service
                    <ChevronRight className="w-6 h-6 ml-2" />
                  </Button>
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

      {/* Enquiry Form Section */}
      <section className="py-24 bg-gradient-to-r from-[#1e4488] to-[#00AFAA]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h4 className="text-sm font-bold mb-3 text-[#00AFAA] tracking-wider uppercase">
                Start Your Journey
              </h4>
              <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Transform Your Business With India's #1 EV Brand
              </h2>
              <p className="mb-10 text-lg leading-relaxed lg:text-xl text-white/90">
                Join 250+ successful dealerships across India. Get exclusive
                territory rights, marketing support, and industry-leading profit
                margins.
              </p>

              <div className="space-y-5">
                <a
                  href="tel:+917980598210"
                  className="flex items-center gap-5 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-white group-hover:text-[#1e4488] transition-all group-hover:scale-110">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/70">
                      Call us directly
                    </p>
                    <p className="text-2xl font-bold">+91 7980598210</p>
                  </div>
                </a>

                <a
                  href="mailto:enicontrol@yahoo.com"
                  className="flex items-center gap-5 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-white group-hover:text-[#1e4488] transition-all group-hover:scale-110">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/70">
                      Email us
                    </p>
                    <p className="text-2xl font-bold break-all">
                      enicontrol@yahoo.com
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-white shadow-2xl rounded-3xl lg:p-10"
            >
              <h4 className="mb-2 text-3xl font-bold">Dealership Enquiry</h4>
              <p className="mb-8 text-gray-600">
                Fill the form and our team will contact you within 24 hours.
              </p>

              <form className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1e4488] focus:outline-none transition-colors text-base"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1e4488] focus:outline-none transition-colors text-base"
                    required
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1e4488] focus:outline-none transition-colors text-base"
                    required
                  />
                  <input
                    type="text"
                    placeholder="City/Location *"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1e4488] focus:outline-none transition-colors text-base"
                    required
                  />
                </div>

                <select
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1e4488] focus:outline-none transition-colors text-base"
                  required
                >
                  <option value="">Investment Capacity *</option>
                  <option>₹5-10 Lakhs</option>
                  <option>₹10-20 Lakhs</option>
                  <option>₹20-50 Lakhs</option>
                  <option>₹50 Lakhs+</option>
                </select>

                <textarea
                  rows={4}
                  placeholder="Tell us about your business experience (Optional)"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1e4488] focus:outline-none resize-none transition-colors text-base"
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1e4488] to-[#00AFAA] hover:opacity-90 text-white py-6 rounded-xl text-lg font-bold shadow-xl transition-all hover:scale-[1.02]"
                >
                  Submit Enquiry
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid items-center gap-20 lg:gap-32 lg:grid-cols-2">
            {/* Left Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative lg:pr-8"
            >
              <img
                src="/images/about/bike1.png"
                alt="E-bike Performance"
                className="w-full max-w-md shadow-2xl rounded-3xl"
                onError={(e) => (e.target.style.display = "none")}
              />
              <img
                src="/images/about/bike2.png"
                alt="E-bike Lifestyle"
                className="absolute w-full max-w-sm border-8 border-white shadow-2xl -bottom-10 -right-4 lg:-right-8 rounded-3xl"
                onError={(e) => (e.target.style.display = "none")}
              />
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:pl-8"
            >
              <h4 className="text-[#00AFAA] font-bold mb-4 tracking-wider text-sm uppercase">
                About E-Bike
              </h4>
              <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Powering India's
                <br />
                <span className="text-[#1e4488]">Electric Dreams</span>
              </h2>

              <div className="mb-10 space-y-5 text-lg leading-relaxed text-gray-700">
                <p>
                  E-bike isn't just an electric vehicle brand — it's a movement
                  revolutionizing how India commutes. With cutting-edge
                  technology, superior build quality, and an unwavering
                  commitment to sustainability, we're creating the future of
                  urban mobility.
                </p>

                <p>
                  Our network of 250+ dealers across India stands testament to
                  our vision of making electric mobility accessible, affordable,
                  and aspirational for every Indian household.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { value: "5+", label: "Years of Excellence" },
                  { value: "15+", label: "Award-Winning Models" },
                  { value: "98%", label: "Customer Satisfaction" },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <h3 className="text-4xl lg:text-5xl font-bold text-[#1e4488] mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link to="/about">
                <Button
                  size="lg"
                  className="bg-[#1e4488] hover:bg-[#2a5199] text-white px-8 py-6 rounded-xl font-bold shadow-lg"
                >
                  Learn More About Us
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                value: "250+",
                title: "Dealer Network",
                desc: "Trusted partners driving the EV revolution across India",
              },
              {
                value: "15000+",
                title: "Happy Riders",
                desc: "Families choosing sustainable mobility every day",
              },
              {
                value: "Pan India",
                title: "Presence",
                desc: "From metros to tier-3 cities, we're everywhere",
              },
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
                <h4 className="mb-2 text-2xl font-bold lg:text-3xl">
                  {stat.title}
                </h4>
                <p className="text-lg text-gray-600">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-end justify-between gap-6 mb-12 md:flex-row">
            <div>
              <h4 className="text-[#00AFAA] font-bold mb-3 tracking-wider text-sm uppercase">
                Our Fleet
              </h4>
              <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                Latest Electric Bikes
              </h2>
            </div>
            <Link to="/products">
              <Button
                variant="outline"
                size="lg"
                className="font-bold transition-transform border-2 rounded-xl hover:scale-105"
              >
                View All Models
                <ChevronRight className="ml-2" />
              </Button>
            </Link>
          </div>

          {/* Enhanced Products Grid */}
          <FeaturedProductsGrid />
        </div>
      </section>

      {/* Explore Models */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-5 text-4xl font-bold md:text-5xl lg:text-6xl">
              Explore Our Models
            </h2>
            <p className="text-xl text-gray-600">
              Experience our range with advanced features and cutting-edge
              technology
            </p>
          </div>

          {/* Model Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {Object.keys(bikeModels).map((model) => (
              <button
                key={model}
                onClick={() => {
                  setActiveModel(model);
                  setActiveColor(0);
                }}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${
                  activeModel === model
                    ? "bg-[#1e4488] text-white shadow-xl scale-105"
                    : bikeModels[model].colors.length === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                }`}
                disabled={bikeModels[model].colors.length === 0}
              >
                {model}
              </button>
            ))}
          </div>

          {/* Model Display */}
          <div className="max-w-6xl mx-auto">
            {currentBike.colors.length > 0 ? (
              <div className="grid items-center gap-10 lg:grid-cols-12">
                {/* Color Selector */}
                <div className="flex justify-center gap-5 lg:col-span-2 lg:flex-col">
                  {currentBike.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveColor(index)}
                      className={`relative w-16 h-16 rounded-full transition-all ${
                        activeColor === index ? "scale-125" : "hover:scale-110"
                      }`}
                      title={color.name}
                    >
                      <span
                        className="absolute inset-0 border-4 rounded-full"
                        style={{
                          borderColor:
                            activeColor === index ? "#1e4488" : "#e5e7eb",
                        }}
                      />
                      <span
                        className="absolute rounded-full inset-2"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>

                {/* Bike Images */}
                <div className="grid grid-cols-3 gap-6 lg:col-span-10">
                  {currentBike.colors[activeColor].images.map((img, index) => (
                    <div
                      key={index}
                      className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all ${
                        index === 1 ? "scale-110 z-10" : "hover:scale-105"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${activeModel} ${currentBike.colors[activeColor].name} view ${index + 1}`}
                        className="object-cover w-full h-full"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/400x300?text=Bike+Image")
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-32 text-center text-gray-400">
                <p className="mb-3 text-3xl font-bold">Coming Soon</p>
                <p className="text-xl">This model will be available soon</p>
              </div>
            )}

            {/* Model Info */}
            {currentBike.colors.length > 0 && (
              <div className="mt-12 text-center">
                <h3 className="mb-6 text-3xl font-bold">
                  {activeModel} - {currentBike.colors[activeColor].name}
                </h3>
                <Link to={`/products?model=${activeModel}`}>
                  <Button
                    size="lg"
                    className="px-10 py-6 text-lg font-bold rounded-xl"
                  >
                    View Details
                    <ChevronRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h4 className="text-[#00AFAA] font-bold mb-4 tracking-wider text-sm uppercase">
              Our Promise
            </h4>
            <h2 className="mb-5 text-4xl font-bold md:text-5xl lg:text-6xl">
              Why Dealers Choose E-bike?
            </h2>
            <p className="text-xl text-gray-600">
              Building successful partnerships with transparency and trust
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                Icon: Headphones,
                title: "24/7 Dealer Support",
                desc: "Dedicated account managers, technical training, and round-the-clock assistance for all your needs.",
              },
              {
                Icon: Truck,
                title: "Quick Delivery",
                desc: "Efficient logistics network ensures stock availability within 48 hours across India.",
              },
              {
                Icon: Shield,
                title: "Comprehensive Warranty",
                desc: "Industry-leading warranty terms with genuine spare parts and certified service network.",
              },
              {
                Icon: TrendingUp,
                title: "Best Profit Margins",
                desc: "Attractive dealer margins with additional incentives and performance-based rewards.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 text-center transition-all bg-white rounded-2xl hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-20 h-20 bg-[#1e4488]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.Icon className="w-10 h-10 text-[#1e4488]" />
                </div>
                <h4 className="mb-4 text-2xl font-bold">{feature.title}</h4>
                <p className="text-lg leading-relaxed text-gray-600">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white" id="faqs">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <h4 className="text-[#00AFAA] font-bold mb-4 tracking-wider text-sm uppercase">
              Have Questions?
            </h4>
            <h2 className="mb-5 text-4xl font-bold md:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about E-bikes
            </p>
          </div>

          <div className="space-y-5">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden transition-all bg-white shadow-lg rounded-2xl hover:shadow-2xl"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="flex items-center justify-between w-full text-left transition-colors p-7 hover:bg-gray-50"
                >
                  <span className="pr-6 text-lg font-bold lg:text-xl">
                    {faq.question}
                  </span>
                  <span
                    className={`w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-transform ${
                      expandedFaq === index
                        ? "rotate-45 bg-[#1e4488] text-white"
                        : ""
                    }`}
                  >
                    <Plus className="w-6 h-6" />
                  </span>
                </button>

                {expandedFaq === index && (
                  <div className="px-7 pb-7">
                    <p className="text-lg leading-relaxed text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Choice Modal */}
      <Dialog open={showServiceModal} onOpenChange={setShowServiceModal}>
        <DialogContent className="sm:max-w-lg bg-gradient-to-br from-[#0b1220] to-[#121a2e] text-white border-0 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Book Your Service
            </DialogTitle>
            <p className="text-lg text-white/70">
              Choose your customer type to continue
            </p>
          </DialogHeader>

          <div className="mt-6 space-y-4">
            {[
              {
                to: "/auth/login?redirect=/service-booking",
                Icon: Shield,
                title: "Purchase Customer",
                desc: "Already bought from us? Quick booking available.",
                color: "#00AFAA",
              },
              {
                to: "/service-booking/manual",
                Icon: Plus,
                title: "New Customer",
                desc: "First time? Book service manually.",
                color: "#1e4488",
              },
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className="flex items-center gap-5 p-5 transition-all border rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 group"
              >
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-2xl"
                  style={{
                    backgroundColor: `${item.color}20`,
                    borderColor: `${item.color}30`,
                    borderWidth: "1px",
                  }}
                >
                  <item.Icon
                    className="w-7 h-7"
                    style={{ color: item.color }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 text-lg font-bold">{item.title}</h4>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
                <ChevronRight className="w-6 h-6 transition-colors text-white/40 group-hover:text-white" />
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={() => setShowServiceModal(false)}
            className="w-full py-6 mt-6 font-bold border text-white/70 hover:text-white border-white/10 hover:bg-white/10 rounded-xl"
          >
            Not Now
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const FeaturedProductsGrid = () => {
  const { data: products, isLoading } = useProducts({
    featured: true,
    limit: 6,
  });

  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});

  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
    const video = videoRefs.current[productId];
    if (video) {
      video.play().catch(() => {
        // Handle autoplay policy
        console.log("Video autoplay prevented");
      });
      setPlayingVideo(productId);
    }
  };

  const handleMouseLeave = (productId) => {
    setHoveredProduct(null);
    const video = videoRefs.current[productId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setPlayingVideo(null);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-3xl h-[500px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  const displayProducts = products.slice(0, 6);

  if (displayProducts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-2xl text-gray-500">No featured products available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {displayProducts.map((product, index) => {
        const primaryImage =
          product.images?.find((img) => img.is_primary)?.url ||
          product.images?.[0]?.url ||
          "/placeholder-bike.jpg";
        const videoUrl = product.videos?.[0];

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <Link to={`/products/${product.slug}`}>
              <div
                className="relative overflow-hidden transition-all duration-500 bg-white shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2"
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={() => handleMouseLeave(product.id)}
              >
                {/* Media Container */}
                <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-50">
                  {/* Video (Hidden by default, shown on hover) */}
                  {videoUrl && (
                    <video
                      ref={(el) => (videoRefs.current[product.id] = el)}
                      src={videoUrl}
                      muted
                      loop
                      playsInline
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        hoveredProduct === product.id
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0"
                      }`}
                    />
                  )}

                  {/* Primary Image */}
                  <img
                    src={primaryImage}
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      hoveredProduct === product.id
                        ? "scale-110 opacity-0"
                        : "scale-100 opacity-100"
                    }`}
                    onError={(e) => {
                      e.target.src = "/placeholder-bike.jpg";
                    }}
                  />

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 ${
                      hoveredProduct === product.id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {/* Quick View Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: hoveredProduct === product.id ? 1 : 0,
                          opacity: hoveredProduct === product.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="px-6 py-3 text-white border-2 rounded-full bg-white/20 backdrop-blur-md border-white/50"
                      >
                        {playingVideo === product.id ? (
                          <span className="flex items-center gap-2">
                            <Video className="w-5 h-5" />
                            Watch Video
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Eye className="w-5 h-5" />
                            Quick View
                          </span>
                        )}
                      </motion.div>
                    </div>

                    {/* Image Thumbnails on Hover */}
                    {product.images?.length > 1 && (
                      <div className="absolute flex gap-2 bottom-4 left-4 right-4">
                        {product.images.slice(0, 3).map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="w-16 h-16 overflow-hidden bg-white rounded-lg shadow-lg"
                          >
                            <img
                              src={img.url}
                              alt={`View ${imgIndex + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                        {product.images.length > 3 && (
                          <div className="flex items-center justify-center w-16 h-16 font-semibold text-gray-700 bg-white rounded-lg shadow-lg">
                            +{product.images.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="absolute z-20 flex flex-col gap-2 top-4 right-4">
                    {product.is_featured && (
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-yellow-500 to-amber-500"
                      >
                        ⭐ Featured
                      </motion.div>
                    )}
                    {!product.is_available && (
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full shadow-lg"
                      >
                        Out of Stock
                      </motion.div>
                    )}
                    {product.mrp > product.base_price && (
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-full shadow-lg"
                      >
                        {Math.round(
                          ((product.mrp - product.base_price) / product.mrp) *
                            100,
                        )}
                        % OFF
                      </motion.div>
                    )}
                  </div>

                  {/* Model Badge */}
                  <div className="absolute z-20 top-4 left-4">
                    <div className="px-4 py-2 text-sm font-bold text-[#1e4488] bg-white/90 backdrop-blur rounded-full shadow-lg">
                      {product.model}
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  {/* Name & Category */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-[#1e4488]">
                      {product.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 capitalize">
                      {product.category?.replace(/-/g, " ")}
                    </p>
                  </div>

                  {/* Specifications Preview */}
                  <div className="flex flex-wrap gap-4">
                    {product.specifications?.range_km && (
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Battery className="w-4 h-4 text-green-600" />
                        <span>{product.specifications.range_km}</span>
                      </div>
                    )}
                    {product.specifications?.top_speed && (
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Gauge className="w-4 h-4 text-blue-600" />
                        <span>{product.specifications.top_speed}</span>
                      </div>
                    )}
                    {product.specifications?.motor_power && (
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Zap className="w-4 h-4 text-yellow-600" />
                        <span>{product.specifications.motor_power}</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-3xl font-bold text-[#1e4488]">
                          {formatCurrency(product.base_price)}
                        </span>
                        {product.mrp > product.base_price && (
                          <span className="ml-2 text-lg text-gray-500 line-through">
                            {formatCurrency(product.mrp)}
                          </span>
                        )}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChevronRight className="w-8 h-8 p-1.5 text-white bg-[#1e4488] rounded-full group-hover:bg-[#00AFAA] transition-colors" />
                      </motion.div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Ex-showroom + {product.tax_rate}% GST
                    </p>
                  </div>
                </div>

                {/* Hover Animation Border */}
                <div
                  className={`absolute inset-0 rounded-3xl border-2 transition-all duration-500 pointer-events-none ${
                    hoveredProduct === product.id
                      ? "border-[#1e4488] opacity-100"
                      : "border-transparent opacity-0"
                  }`}
                />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HomePage;
