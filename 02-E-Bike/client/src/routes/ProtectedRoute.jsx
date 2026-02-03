import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { LoadingPage } from "@/components/common/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    // Save the attempted location to redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
