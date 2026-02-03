import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Battery,
  Gauge,
  Zap,
  Clock,
  Weight,
  Package,
  Shield,
  Wrench,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingPage } from "@/components/common/LoadingSpinner";
import { useProductBySlug } from "@/hooks/useProducts";
import { formatCurrency } from "@/utils/formatters";
import useAuthStore from "@/store/authStore";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const { data, isLoading, error } = useProductBySlug(slug);
  const product = data?.product || data;

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange,
      );
    };
  }, []);

  if (isLoading) return <LoadingPage />;
  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Product not found
          </h2>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const primaryImage =
    images.find((img) => img.is_primary)?.url ||
    images[0]?.url ||
    "/placeholder-bike.jpg";
  const videoUrl = product.videos?.[0];
  const specs = product.specifications || {};

  const formatSpecValue = (label, value) => {
    if (!value) return null;

    if (
      typeof value === "string" &&
      (value.includes("km") ||
        value.includes("KM") ||
        value.includes("V") ||
        value.includes("Ah") ||
        value.includes("W") ||
        value.includes("kg") ||
        value.includes("hours") ||
        value.includes("h"))
    ) {
      return value;
    }

    switch (label.toLowerCase()) {
      case "weight":
        return value.includes("kg") ? value : `${value} kg`;
      case "load capacity":
        return value.includes("kg") ? value : `${value} kg`;
      default:
        return value;
    }
  };

  const specificationsList = [
    {
      icon: Battery,
      label: "Range",
      value: formatSpecValue("Range", specs.range_km),
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Gauge,
      label: "Top Speed",
      value: formatSpecValue("Top Speed", specs.top_speed),
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Zap,
      label: "Motor Power",
      value: formatSpecValue("Motor Power", specs.motor_power),
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: Battery,
      label: "Battery",
      value:
        specs.battery_type && specs.battery_capacity
          ? `${specs.battery_type} - ${specs.battery_capacity}`
          : specs.battery_type || specs.battery_capacity,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Clock,
      label: "Charging Time",
      value: formatSpecValue("Charging Time", specs.charging_time),
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Weight,
      label: "Weight",
      value: formatSpecValue("Weight", specs.weight),
      color: "bg-gray-100 text-gray-600",
    },
    {
      icon: Package,
      label: "Load Capacity",
      value: formatSpecValue("Load Capacity", specs.load_capacity),
      color: "bg-orange-100 text-orange-600",
    },
  ].filter((spec) => spec.value);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("/contact");
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    const container = videoContainerRef.current;

    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (container?.requestFullscreen) {
        container.requestFullscreen();
      } else if (container?.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container?.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Back button */}
      <div className="bg-white border-b shadow-sm">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Link to="/products">
            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Media Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Media Display */}
            <Card className="overflow-hidden shadow-xl">
              <div className="relative bg-gray-100 aspect-square">
                <AnimatePresence mode="wait">
                  {showVideo && videoUrl ? (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      ref={videoContainerRef}
                      className="relative w-full h-full bg-black"
                    >
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        className="object-contain w-full h-full"
                        loop
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />

                      {/* Video Controls Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/30 hover:opacity-100">
                        <button
                          onClick={togglePlayPause}
                          className="p-4 text-white transition-transform rounded-full bg-black/50 hover:scale-110 backdrop-blur-sm"
                        >
                          {isPlaying ? (
                            <Pause className="w-8 h-8" />
                          ) : (
                            <Play className="w-8 h-8 ml-1" />
                          )}
                        </button>
                      </div>

                      {/* Control Buttons */}
                      <div className="absolute flex gap-2 bottom-4 right-4">
                        <button
                          onClick={toggleMute}
                          className="p-2 text-white transition-all rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm hover:scale-110"
                          title={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>

                        <button
                          onClick={toggleFullscreen}
                          className="p-2 text-white transition-all rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm hover:scale-110"
                          title={
                            isFullscreen ? "Exit Fullscreen" : "Fullscreen"
                          }
                        >
                          {isFullscreen ? (
                            <Minimize className="w-5 h-5" />
                          ) : (
                            <Maximize className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.img
                      key="image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={images[currentImageIndex]?.url || primaryImage}
                      alt={product.name}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.src = "/placeholder-bike.jpg";
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute z-10 flex flex-col gap-2 top-4 right-4">
                  {product.is_featured && (
                    <div className="px-4 py-2 text-sm font-bold text-yellow-900 shadow-lg bg-gradient-to-r from-yellow-400 to-amber-400 rounded-xl">
                      ⭐ Featured
                    </div>
                  )}
                  {!product.is_available && (
                    <div className="px-4 py-2 text-sm font-bold text-white bg-red-500 shadow-lg rounded-xl">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Navigation arrows for images */}
                {!showVideo && images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute p-3 transition-all -translate-y-1/2 bg-white shadow-lg left-4 top-1/2 rounded-xl hover:bg-gray-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute p-3 transition-all -translate-y-1/2 bg-white shadow-lg right-4 top-1/2 rounded-xl hover:bg-gray-100"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </Card>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto">
              {/* Video Thumbnail */}
              {videoUrl && (
                <button
                  onClick={() => setShowVideo(true)}
                  className={`relative flex-shrink-0 w-24 h-24 overflow-hidden transition-all border-4 rounded-xl ${
                    showVideo
                      ? "border-[#1e4488] scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <img
                    src={primaryImage}
                    alt="Video thumbnail"
                    className="object-cover w-full h-full opacity-50"
                  />
                </button>
              )}

              {/* Image Thumbnails */}
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setShowVideo(false);
                    setCurrentImageIndex(index);
                  }}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-4 transition-all ${
                    !showVideo && index === currentImageIndex
                      ? "border-[#1e4488] scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Model Badge */}
            <div className="inline-block px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 text-[#1e4488]">
              {product.model}
            </div>

            {/* Name */}
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-lg leading-relaxed text-gray-600">
              {product.description}
            </p>

            {/* Price Card */}
            <Card className="overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 border-[#1e4488]/20">
              <CardContent className="p-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl font-bold text-[#1e4488]">
                    {formatCurrency(product.base_price)}
                  </span>
                  {product.mrp > product.base_price && (
                    <span className="text-2xl text-gray-500 line-through">
                      {formatCurrency(product.mrp)}
                    </span>
                  )}
                </div>
                <p className="mb-3 text-sm text-gray-600">
                  + {product.tax_rate}% GST • Ex-showroom price
                </p>
                {product.mrp > product.base_price && (
                  <div className="inline-block px-4 py-2 text-lg font-bold text-green-700 bg-green-100 rounded-xl">
                    Save {formatCurrency(product.mrp - product.base_price)} 🎉
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Warranty Card */}
            <Card className="overflow-hidden border-2 border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-500 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                      {product.warranty?.warranty_period_months} Months Warranty
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium">
                          {product.warranty?.free_services} Free Services
                          Included
                        </span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <Wrench className="w-5 h-5 text-green-600" />
                        <span className="font-medium">
                          Comprehensive Service Coverage
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="flex-1 text-lg shadow-lg bg-gradient-to-r from-[#1e4488] to-[#00AFAA] hover:from-[#1a3a70] hover:to-[#008f8a]"
                onClick={handleBuyNow}
                disabled={!product.is_available}
              >
                {product.is_available ? "Contact to Buy" : "Out of Stock"}
              </Button>
              <Link to="/contact" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full text-lg border-2 shadow-lg border-[#1e4488] hover:bg-[#1e4488] hover:text-white"
                >
                  Inquire Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <Card className="overflow-hidden shadow-xl">
            <CardHeader className="bg-gradient-to-r from-[#1e4488] to-[#00AFAA] text-white">
              <CardTitle className="text-3xl">
                Technical Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {specificationsList.map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 transition-all rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-lg border-2 border-gray-100 hover:border-[#1e4488]/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${spec.color}`}>
                        <spec.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="mb-2 text-sm font-medium text-gray-600">
                          {spec.label}
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Colors */}
              {specs.colors && specs.colors.length > 0 && (
                <div className="pt-8 mt-8 border-t">
                  <p className="mb-4 text-lg font-semibold text-gray-700">
                    Available Colors
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {specs.colors.map((color, index) => (
                      <span
                        key={index}
                        className="px-5 py-2 font-medium text-gray-700 transition-all bg-white border-2 border-gray-200 rounded-xl hover:border-[#1e4488] hover:text-[#1e4488] hover:shadow-md"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Service Charges */}
        {product.service_charges && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <Card className="overflow-hidden shadow-xl">
              <CardHeader className="text-white bg-gradient-to-r from-purple-600 to-pink-600">
                <CardTitle className="text-3xl">Service Charges</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(product.service_charges).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="p-6 transition-all border-2 border-purple-100 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg"
                      >
                        <p className="mb-2 text-sm font-medium text-gray-600 capitalize">
                          {key.replace(/_/g, " ")}
                        </p>
                        <p className="text-2xl font-bold text-purple-900">
                          {formatCurrency(value)}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
