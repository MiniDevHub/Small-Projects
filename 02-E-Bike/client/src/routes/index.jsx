import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadingPage } from "@/components/common/LoadingSpinner";
import PublicLayout from "@/components/layout/PublicLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import { USER_ROLES } from "@/utils/constants";

// Eager load critical routes
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Home from "@/pages/public/Home";

// Lazy load public pages (code splitting)
const Products = lazy(() => import("@/pages/public/Products"));
const ProductDetail = lazy(() => import("@/pages/public/ProductDetail"));
const About = lazy(() => import("@/pages/public/About"));
const Contact = lazy(() => import("@/pages/public/Contact"));

// Lazy load super-admin pages
const SuperAdminDashboard = lazy(() => import("@/pages/super-admin/Dashboard"));
const SuperAdminAdmins = lazy(() => import("@/pages/super-admin/Admins"));
const SuperAdminSystem = lazy(() => import("@/pages/super-admin/System"));
const SuperAdminLogs = lazy(() => import("@/pages/super-admin/Logs"));
const SuperAdminAnalytics = lazy(() => import("@/pages/super-admin/Analytics"));

// Lazy load admin pages
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("@/pages/admin/Products"));
const AdminOrders = lazy(() => import("@/pages/admin/Orders"));
const AdminUsers = lazy(() => import("@/pages/admin/Users"));
const AdminSettings = lazy(() => import("@/pages/admin/Settings"));
const AdminAnalytics = lazy(() => import("@/pages/admin/Analytics"));

// Lazy load dealer pages
const DealerDashboard = lazy(() => import("@/pages/dealer/Dashboard"));
const DealerOrders = lazy(() => import("@/pages/dealer/Orders"));
const DealerSales = lazy(() => import("@/pages/dealer/Sales"));
const DealerInventory = lazy(() => import("@/pages/dealer/Inventory"));
const DealerEmployees = lazy(() => import("@/pages/dealer/Employees"));
const DealerAttendance = lazy(() => import("@/pages/dealer/Attendance"));
const DealerServices = lazy(() => import("@/pages/dealer/Services"));

// Lazy load employee pages
const EmployeeDashboard = lazy(() => import("@/pages/employee/Dashboard"));
const EmployeeSales = lazy(() => import("@/pages/employee/Sales"));
const EmployeeAttendance = lazy(() => import("@/pages/employee/Attendance"));
const EmployeeProfile = lazy(() => import("@/pages/employee/Profile"));

// Lazy load serviceman pages
const ServicemanDashboard = lazy(() => import("@/pages/serviceman/Dashboard"));
const ServicemanServices = lazy(() => import("@/pages/serviceman/Services"));
const ServicemanAttendance = lazy(
  () => import("@/pages/serviceman/Attendance"),
);
const ServicemanProfile = lazy(() => import("@/pages/serviceman/Profile"));

// Lazy load customer pages
const CustomerDashboard = lazy(() => import("@/pages/customer/Dashboard"));
const CustomerBikes = lazy(() => import("@/pages/customer/Bikes"));
const CustomerServices = lazy(() => import("@/pages/customer/Services"));
const CustomerOrders = lazy(() => import("@/pages/customer/Orders"));
const CustomerProfile = lazy(() => import("@/pages/customer/Profile"));

// 404 Not Found Component
const NotFound = lazy(() => import("@/pages/NotFound"));

// Suspense wrapper component
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingPage />}>{children}</Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with suspense */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <SuspenseWrapper>
              <Products />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/products/:slug"
          element={
            <SuspenseWrapper>
              <ProductDetail />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <SuspenseWrapper>
              <About />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <SuspenseWrapper>
              <Contact />
            </SuspenseWrapper>
          }
        />
      </Route>

      {/* Auth routes (no lazy loading for critical auth pages) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Super Admin routes */}
      <Route
        path="/super-admin/*"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[USER_ROLES.SUPER_ADMIN]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Navigate to="/super-admin/dashboard" replace />}
        />
        <Route
          path="dashboard"
          element={
            <SuspenseWrapper>
              <SuperAdminDashboard />
            </SuspenseWrapper>
          }
        />
        <Route
          path="admins"
          element={
            <SuspenseWrapper>
              <SuperAdminAdmins />
            </SuspenseWrapper>
          }
        />
        <Route
          path="system"
          element={
            <SuspenseWrapper>
              <SuperAdminSystem />
            </SuspenseWrapper>
          }
        />
        <Route
          path="logs"
          element={
            <SuspenseWrapper>
              <SuperAdminLogs />
            </SuspenseWrapper>
          }
        />
        <Route
          path="analytics"
          element={
            <SuspenseWrapper>
              <SuperAdminAnalytics />
            </SuspenseWrapper>
          }
        />
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[USER_ROLES.ADMIN]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <SuspenseWrapper>
              <AdminDashboard />
            </SuspenseWrapper>
          }
        />
        <Route
          path="products"
          element={
            <SuspenseWrapper>
              <AdminProducts />
            </SuspenseWrapper>
          }
        />
        <Route
          path="orders"
          element={
            <SuspenseWrapper>
              <AdminOrders />
            </SuspenseWrapper>
          }
        />
        <Route
          path="users"
          element={
            <SuspenseWrapper>
              <AdminUsers />
            </SuspenseWrapper>
          }
        />
        <Route
          path="analytics"
          element={
            <SuspenseWrapper>
              <AdminAnalytics />
            </SuspenseWrapper>
          }
        />
        <Route
          path="settings"
          element={
            <SuspenseWrapper>
              <AdminSettings />
            </SuspenseWrapper>
          }
        />
      </Route>

      {/* Dealer routes */}
      <Route
        path="/dealer/*"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[USER_ROLES.DEALER]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dealer/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <SuspenseWrapper>
              <DealerDashboard />
            </SuspenseWrapper>
          }
        />
        <Route
          path="orders"
          element={
            <SuspenseWrapper>
              <DealerOrders />
            </SuspenseWrapper>
          }
        />
        <Route
          path="sales"
          element={
            <SuspenseWrapper>
              <DealerSales />
            </SuspenseWrapper>
          }
        />
        <Route
          path="inventory"
          element={
            <SuspenseWrapper>
              <DealerInventory />
            </SuspenseWrapper>
          }
        />
        <Route
          path="employees"
          element={
            <SuspenseWrapper>
              <DealerEmployees />
            </SuspenseWrapper>
          }
        />
        <Route
          path="attendance"
          element={
            <SuspenseWrapper>
              <DealerAttendance />
            </SuspenseWrapper>
          }
        />
        <Route
          path="services"
          element={
            <SuspenseWrapper>
              <DealerServices />
            </SuspenseWrapper>
          }
        />
      </Route>

      {/* Employee routes */}
      <Route
        path="/employee/*"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[USER_ROLES.EMPLOYEE]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/employee/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <SuspenseWrapper>
              <EmployeeDashboard />
            </SuspenseWrapper>
          }
        />
        <Route
          path="sales"
          element={
            <SuspenseWrapper>
              <EmployeeSales />
            </SuspenseWrapper>
          }
        />
        <Route
          path="attendance"
          element={
            <SuspenseWrapper>
              <EmployeeAttendance />
            </SuspenseWrapper>
          }
        />
        <Route
          path="profile"
          element={
            <SuspenseWrapper>
              <EmployeeProfile />
            </SuspenseWrapper>
          }
        />
      </Route>

      {/* Serviceman routes */}
      <Route
        path="/serviceman/*"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[USER_ROLES.SERVICEMAN]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Navigate to="/serviceman/dashboard" replace />}
        />
        <Route
          path="dashboard"
          element={
            <SuspenseWrapper>
              <ServicemanDashboard />
            </SuspenseWrapper>
          }
        />
        <Route
          path="services"
          element={
            <SuspenseWrapper>
              <ServicemanServices />
            </SuspenseWrapper>
          }
        />
        <Route
          path="attendance"
          element={
            <SuspenseWrapper>
              <ServicemanAttendance />
            </SuspenseWrapper>
          }
        />
        <Route
          path="profile"
          element={
            <SuspenseWrapper>
              <ServicemanProfile />
            </SuspenseWrapper>
          }
        />
      </Route>

      {/* Customer routes */}
      <Route
        path="/customer/*"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[USER_ROLES.CUSTOMER]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/customer/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <SuspenseWrapper>
              <CustomerDashboard />
            </SuspenseWrapper>
          }
        />
        <Route
          path="bikes"
          element={
            <SuspenseWrapper>
              <CustomerBikes />
            </SuspenseWrapper>
          }
        />
        <Route
          path="services"
          element={
            <SuspenseWrapper>
              <CustomerServices />
            </SuspenseWrapper>
          }
        />
        <Route
          path="orders"
          element={
            <SuspenseWrapper>
              <CustomerOrders />
            </SuspenseWrapper>
          }
        />
        <Route
          path="profile"
          element={
            <SuspenseWrapper>
              <CustomerProfile />
            </SuspenseWrapper>
          }
        />
      </Route>

      {/* 404 Not Found */}
      <Route
        path="*"
        element={
          <SuspenseWrapper>
            <NotFound />
          </SuspenseWrapper>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
