import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="overflow-hidden bg-white shadow-lg rounded-2xl animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-6">
        <div className="w-3/4 h-6 mb-3 bg-gray-200 rounded" />

        <div className="flex items-center justify-between mb-3">
          <div className="w-24 h-8 bg-gray-200 rounded" />
          <div className="w-16 h-4 bg-gray-200 rounded" />
        </div>

        <div className="mb-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="w-5/6 h-4 bg-gray-200 rounded" />
        </div>

        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-gray-200 rounded" />
          <div className="flex-1 h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
