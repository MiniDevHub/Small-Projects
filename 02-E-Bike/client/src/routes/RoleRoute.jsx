import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { LoadingPage } from "@/components/common/LoadingSpinner";

const RoleRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on role
    const roleRoutes = {
      super_admin: "/super-admin/dashboard",
      admin: "/admin/dashboard",
      dealer: "/dealer/dashboard",
      employee: "/employee/dashboard",
      serviceman: "/serviceman/dashboard",
      customer: "/customer/dashboard",
    };

    return <Navigate to={roleRoutes[user.role] || "/"} replace />;
  }

  return children;
};

export default RoleRoute;
