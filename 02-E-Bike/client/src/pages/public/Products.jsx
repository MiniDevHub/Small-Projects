import React, { useState } from "react";
import {
  Search,
  Filter,
  X,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/common/ProductCard";
import EmptyState from "@/components/common/EmptyState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    featured: false,
    available: true,
  });

  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    data: products = [],
    isLoading,
    error,
  } = useProducts({
    search: debouncedSearch,
    category: filters.category,
    featured: filters.featured || undefined,
  });

  // Available models for filter
  const models = ["LIGHTNING", "RABBITOR", "SSUP", "JV", "MARIUM", "MAKI"];

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section with Video - Like Homepage */}
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
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-block px-6 py-3 mb-6 text-sm font-bold rounded-full bg-white/20 backdrop-blur"
                >
                  ⚡ Eco-Friendly Transport
                </motion.div>

                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-8">
                  Discover Our <span className="text-[#00AFAA]">Electric</span>
                  <br />
                  Bike Collection
                </h1>

                <p className="mb-12 text-lg leading-relaxed lg:text-xl text-white/90">
                  Explore our range of high-performance electric bikes designed
                  for the future. From city commutes to long rides, find your
                  perfect e-bike match.
                </p>

                {/* Search Bar */}
                <div className="mb-8">
                  <div className="relative">
                    <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-5 top-1/2" />
                    <Input
                      type="text"
                      placeholder="Search for your perfect e-bike..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-12 text-base bg-white border-0 shadow-2xl pl-14 h-14 rounded-2xl focus:ring-2 focus:ring-white/50"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute p-2 transition-colors -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-gray-100"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: "15+", label: "Models" },
                    { value: "5000+", label: "Happy Riders" },
                    { value: "100%", label: "Eco-Friendly" },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-4 text-center rounded-2xl bg-white/10 backdrop-blur"
                    >
                      <div className="mb-1 text-2xl font-bold lg:text-3xl">
                        {stat.value}
                      </div>
                      <div className="text-xs font-medium lg:text-sm text-white/80">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-5 lg:justify-start">
                  <a href="#products">
                    <Button
                      size="lg"
                      className="bg-[#131419] hover:bg-[#1a1b24] text-white px-10 py-7 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
                    >
                      View All Bikes
                      <ChevronRight className="w-6 h-6 ml-2" />
                    </Button>
                  </a>

                  <Link to="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-[#131419] px-10 py-7 rounded-full text-lg font-bold shadow-2xl transition-all hover:scale-105"
                    >
                      Contact Us
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

      {/* Main Content */}
      <div
        id="products"
        className="container px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8"
      >
        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card className="p-6 border-0 shadow-2xl bg-white/90 backdrop-blur rounded-3xl lg:p-8">
            <div className="space-y-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#1e4488]/10 rounded-2xl">
                    <Filter className="w-6 h-6 text-[#1e4488]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                    <p className="text-sm text-gray-600">Refine your search</p>
                  </div>
                </div>

                {(filters.featured || filters.category || searchTerm) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({
                        category: "",
                        featured: false,
                        available: true,
                      });
                      setSearchTerm("");
                    }}
                    className="text-red-600 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>

              {/* Filter Options */}
              <div className="space-y-4">
                {/* Quick Filters */}
                <div>
                  <label className="block mb-3 text-sm font-semibold text-gray-700">
                    Quick Filters
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant={filters.featured ? "default" : "outline"}
                      onClick={() =>
                        setFilters((f) => ({ ...f, featured: !f.featured }))
                      }
                      className={
                        filters.featured
                          ? "bg-gradient-to-r from-[#1e4488] to-[#00AFAA] text-white border-0 shadow-lg hover:shadow-xl rounded-xl"
                          : "border-2 rounded-xl hover:border-[#1e4488]"
                      }
                    >
                      ⭐ Featured
                    </Button>

                    <Button
                      variant={filters.available ? "default" : "outline"}
                      onClick={() =>
                        setFilters((f) => ({ ...f, available: !f.available }))
                      }
                      className={
                        filters.available
                          ? "bg-gradient-to-r from-[#1e4488] to-[#00AFAA] text-white border-0 shadow-lg hover:shadow-xl rounded-xl"
                          : "border-2 rounded-xl hover:border-[#1e4488]"
                      }
                    >
                      ✓ In Stock
                    </Button>
                  </div>
                </div>

                {/* Model Filter */}
                <div>
                  <label className="block mb-3 text-sm font-semibold text-gray-700">
                    Select Model
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={filters.category === "" ? "default" : "outline"}
                      onClick={() =>
                        setFilters((f) => ({ ...f, category: "" }))
                      }
                      size="sm"
                      className={
                        filters.category === ""
                          ? "bg-[#1e4488] text-white rounded-full"
                          : "rounded-full hover:bg-gray-100"
                      }
                    >
                      All Models
                    </Button>
                    {models.map((model) => (
                      <Button
                        key={model}
                        variant={
                          filters.category === model ? "default" : "outline"
                        }
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            category: f.category === model ? "" : model,
                          }))
                        }
                        size="sm"
                        className={
                          filters.category === model
                            ? "bg-[#1e4488] text-white rounded-full"
                            : "rounded-full hover:bg-gray-100"
                        }
                      >
                        {model}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <LoadingSpinner size="xl" />
              <p className="mt-6 text-lg font-medium text-gray-600">
                Loading amazing e-bikes...
              </p>
            </div>
          </div>
        ) : error ? (
          <Card className="p-16 shadow-2xl rounded-3xl">
            <EmptyState
              title="Failed to load products"
              description="Please try again later or contact support"
            />
          </Card>
        ) : products.length === 0 ? (
          <Card className="p-16 shadow-2xl rounded-3xl">
            <EmptyState
              title="No products found"
              description="Try adjusting your search or filters to find what you're looking for"
            />
          </Card>
        ) : (
          <>
            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between px-2 mb-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Available E-Bikes
                </h2>
                <p className="mt-1 text-gray-600">
                  Showing{" "}
                  <span className="font-bold text-[#1e4488]">
                    {products.length}
                  </span>{" "}
                  {products.length === 1 ? "bike" : "bikes"}
                </p>
              </div>
            </motion.div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#1e4488] to-[#00AFAA]">
        <div className="container max-w-4xl px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Can't Find What You're Looking For?
            </h2>
            <p className="mb-10 text-xl text-white/90">
              Contact our team for personalized recommendations
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <a href="tel:+917980598210">
                <Button
                  size="lg"
                  className="bg-white text-[#1e4488] hover:bg-gray-100 px-10 py-7 rounded-full text-lg font-bold shadow-2xl transition-all hover:scale-105"
                >
                  📞 Call Us Now
                </Button>
              </a>
              <a href="mailto:enicontrol@yahoo.com">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1e4488] px-10 py-7 rounded-full text-lg font-bold transition-all hover:scale-105"
                >
                  ✉️ Email Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
