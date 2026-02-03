import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatters";

const ProductCard = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const primaryImage =
    product.images?.find((img) => img.is_primary)?.url ||
    product.images?.[0]?.url ||
    "/placeholder-bike.jpg";

  const videoUrl = product.videos?.[0];

  // Handle hover to play/pause video
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && videoUrl && !videoError) {
      // Reset video to start
      videoRef.current.currentTime = 0;
      // Try to play
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Video autoplay prevented:", error);
          setVideoError(true);
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && videoUrl) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/products/${product.slug}`}>
        <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-[#1e4488] rounded-2xl">
          {/* Media Container */}
          <div className="relative overflow-hidden bg-gray-100 aspect-square">
            {/* Image - Default View */}
            <img
              src={primaryImage}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered && videoUrl && !videoError
                  ? "opacity-0"
                  : "opacity-100"
              }`}
              onError={(e) => {
                e.target.src = "/placeholder-bike.jpg";
              }}
            />

            {/* Video - Hover View */}
            {videoUrl && !videoError && (
              <video
                ref={videoRef}
                src={videoUrl}
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setVideoError(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}

            {/* Badges */}
            <div className="absolute z-10 flex flex-col gap-2 top-4 left-4">
              {product.is_featured && (
                <Badge className="font-bold text-yellow-900 border-2 border-yellow-500 shadow-lg bg-gradient-to-r from-yellow-400 to-amber-400">
                  ⭐ Featured
                </Badge>
              )}
              {!product.is_available && (
                <Badge variant="destructive" className="font-bold shadow-lg">
                  Out of Stock
                </Badge>
              )}
              {product.mrp > product.base_price && (
                <Badge className="font-bold text-white bg-green-500 shadow-lg">
                  Save {formatCurrency(product.mrp - product.base_price)}
                </Badge>
              )}
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />

            {/* View Details Button */}
            <div className="absolute left-0 right-0 z-10 px-4 transition-opacity duration-300 opacity-0 bottom-4 group-hover:opacity-100">
              <div className="bg-white text-[#1e4488] font-bold py-3 px-6 rounded-xl text-center shadow-xl hover:bg-[#1e4488] hover:text-white transition-colors">
                View Details →
              </div>
            </div>

            {/* Video indicator */}
            {videoUrl && !videoError && (
              <div className="absolute z-10 px-2 py-1 text-xs font-medium text-white rounded-full top-4 right-4 bg-black/60 backdrop-blur-sm">
                🎥 Hover to play
              </div>
            )}
          </div>

          {/* Card Content */}
          <CardContent className="p-6">
            {/* Model Badge */}
            <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
              {product.model}
            </div>

            {/* Product Name */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1e4488] transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Description */}
            <p className="mb-4 text-sm text-gray-600 line-clamp-2">
              {product.description || "High-performance electric bike"}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold text-[#1e4488]">
                {formatCurrency(product.base_price)}
              </span>
              {product.mrp > product.base_price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(product.mrp)}
                </span>
              )}
            </div>

            {/* Specs */}
            <div className="flex flex-wrap gap-2 text-xs">
              {product.specifications?.range_km && (
                <span className="px-2 py-1 text-gray-700 bg-gray-100 rounded-full">
                  🔋 {product.specifications.range_km}
                </span>
              )}
              {product.specifications?.top_speed && (
                <span className="px-2 py-1 text-gray-700 bg-gray-100 rounded-full">
                  ⚡ {product.specifications.top_speed}
                </span>
              )}
              {product.specifications?.motor_power && (
                <span className="px-2 py-1 text-gray-700 bg-gray-100 rounded-full">
                  💪 {product.specifications.motor_power}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
