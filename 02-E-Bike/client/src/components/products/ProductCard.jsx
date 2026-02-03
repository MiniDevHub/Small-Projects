import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/400x300?text=E-Bike";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:8000${imagePath}`;
  };

  const productImages = product.images || [];
  const hasImages = productImages.length > 0;

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1,
    );
  };

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-2xl group">
      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={
            hasImages
              ? getImageUrl(productImages[currentImageIndex]?.url)
              : getImageUrl(null)
          }
          alt={hasImages ? productImages[currentImageIndex]?.alt : product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=E-Bike";
          }}
        />

        {/* Image Navigation */}
        {productImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute z-10 flex items-center justify-center w-8 h-8 transition-opacity -translate-y-1/2 rounded-full opacity-0 left-2 top-1/2 bg-white/80 backdrop-blur group-hover:opacity-100 hover:bg-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute z-10 flex items-center justify-center w-8 h-8 transition-opacity -translate-y-1/2 rounded-full opacity-0 right-2 top-1/2 bg-white/80 backdrop-blur group-hover:opacity-100 hover:bg-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {productImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute flex flex-col gap-2 top-3 left-3">
          <span className="px-3 py-1 bg-[#1e4488] text-white text-xs font-bold rounded-full">
            E-Bike
          </span>
          {product.is_available ? (
            <span className="px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              Out of Stock
            </span>
          )}
          {product.is_featured && (
            <span className="px-3 py-1 text-xs font-bold text-white bg-yellow-500 rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* View Details Overlay */}
        <Link
          to={`/products/${product.slug || product.id}`}
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black/0 group-hover:bg-black/40"
        >
          <span className="px-6 py-3 font-bold text-gray-900 transition-all transform scale-90 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-100">
            View Details
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold line-clamp-1">{product.name}</h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-[#1e4488]">
            ₹{product.base_price?.toLocaleString("en-IN")}
          </span>
          {product.total_stock !== undefined && (
            <span
              className={`text-sm font-medium ${
                product.total_stock > product.low_stock_threshold
                  ? "text-green-600"
                  : product.total_stock > 0
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              Stock: {product.total_stock}
            </span>
          )}
        </div>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {product.description || "High-performance electric bike"}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-[#1e4488] hover:bg-[#2a5199] text-white font-semibold"
            disabled={!product.is_available}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Link
            to={`/products/${product.slug || product.id}`}
            className="flex-1"
          >
            <Button
              variant="outline"
              className="w-full border-2 border-[#1e4488] text-[#1e4488] hover:bg-[#1e4488] hover:text-white font-semibold"
            >
              Buy Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
