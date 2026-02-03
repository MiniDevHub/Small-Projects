import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export const LoadingSpinner = ({ size = "default", className }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <Loader2
      className={cn(
        "animate-spin text-primary-600",
        sizeClasses[size],
        className,
      )}
    />
  );
};

export const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
