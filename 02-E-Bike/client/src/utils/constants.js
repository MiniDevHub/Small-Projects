// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// ============================================
// USER ROLES
// ============================================
export const USER_ROLES = {
  SUPER_ADMIN: "super_admin", // ✅ ADDED
  ADMIN: "admin",
  DEALER: "dealer",
  EMPLOYEE: "employee",
  SERVICEMAN: "serviceman",
  CUSTOMER: "customer",
};

// ============================================
// PERMISSIONS MATRIX (Based on Backend)
// ============================================
export const PERMISSIONS = {
  // Super Admin Permissions
  super_admin: {
    canManageAdmins: true, // ✅ Only super_admin
    canViewAllData: true,
    canManageSystem: true,
    canViewLogs: true,
    canManageProducts: false, // ❌ Admin's job
    canApproveOrders: false, // ❌ Admin's job
  },

  // Admin Permissions
  admin: {
    canManageProducts: true, // ✅ Only admin
    canApproveOrders: true, // ✅ Only admin
    canManageDealers: true, // ✅ Only admin
    canManageEmployees: true, // ✅ Admin + Dealer
    canManageServicemen: true, // ✅ Admin + Dealer
    canViewAllData: true,
    canManageAdmins: false, // ❌ Super Admin's job
  },

  // Dealer Permissions
  dealer: {
    canOrderProducts: true, // ✅ Only dealer
    canSellProducts: true, // ✅ Dealer + Employee
    canManageEmployees: true, // ✅ Admin + Dealer
    canManageServicemen: true, // ✅ Admin + Dealer
    canEditAttendance: true, // ✅ Only dealer
    canAssignServices: true, // ✅ Only dealer
    canManageInventory: true,
    canViewSales: true,
  },

  // Employee Permissions
  employee: {
    canSellProducts: true, // ✅ Dealer + Employee
    canViewOwnAttendance: true,
    canClockInOut: true,
  },

  // Serviceman Permissions
  serviceman: {
    canUpdateServices: true, // ✅ Only serviceman
    canViewOwnAttendance: true,
    canClockInOut: true,
  },

  // Customer Permissions
  customer: {
    canBookServices: true, // ✅ Only customer
    canPlaceOrders: true, // ✅ Only customer
    canViewOwnOrders: true,
    canViewOwnBikes: true,
  },
};

// ============================================
// ROLE-BASED NAVIGATION ITEMS
// ============================================
export const NAVIGATION = {
  super_admin: [
    { label: "Dashboard", path: "/super-admin/dashboard", key: "dashboard" },
    { label: "Admins", path: "/super-admin/admins", key: "admins" },
    { label: "All Dealers", path: "/super-admin/dealers", key: "dealers" },
    { label: "System", path: "/super-admin/system", key: "system" },
    { label: "Logs", path: "/super-admin/logs", key: "logs" },
    { label: "Analytics", path: "/super-admin/analytics", key: "analytics" },
  ],

  admin: [
    { label: "Dashboard", path: "/admin/dashboard", key: "dashboard" },
    { label: "Products", path: "/admin/products", key: "products" },
    { label: "Orders", path: "/admin/orders", key: "orders" },
    { label: "Users", path: "/admin/users", key: "users" },
    { label: "Analytics", path: "/admin/analytics", key: "analytics" },
    { label: "Settings", path: "/admin/settings", key: "settings" },
  ],

  dealer: [
    { label: "Dashboard", path: "/dealer/dashboard", key: "dashboard" },
    { label: "Orders", path: "/dealer/orders", key: "orders" },
    { label: "Sales", path: "/dealer/sales", key: "sales" },
    { label: "Inventory", path: "/dealer/inventory", key: "inventory" },
    { label: "Employees", path: "/dealer/employees", key: "employees" },
    { label: "Attendance", path: "/dealer/attendance", key: "attendance" },
    { label: "Services", path: "/dealer/services", key: "services" },
  ],

  employee: [
    { label: "Dashboard", path: "/employee/dashboard", key: "dashboard" },
    { label: "Sales", path: "/employee/sales", key: "sales" },
    { label: "Attendance", path: "/employee/attendance", key: "attendance" },
    { label: "Profile", path: "/employee/profile", key: "profile" },
  ],

  serviceman: [
    { label: "Dashboard", path: "/serviceman/dashboard", key: "dashboard" },
    { label: "Services", path: "/serviceman/services", key: "services" },
    { label: "Attendance", path: "/serviceman/attendance", key: "attendance" },
    { label: "Profile", path: "/serviceman/profile", key: "profile" },
  ],

  customer: [
    { label: "Dashboard", path: "/customer/dashboard", key: "dashboard" },
    { label: "My Orders", path: "/customer/orders", key: "orders" },
    { label: "My Bikes", path: "/customer/bikes", key: "bikes" },
    { label: "Services", path: "/customer/services", key: "services" },
    { label: "Profile", path: "/customer/profile", key: "profile" },
  ],

  public: [
    { label: "Home", path: "/", key: "home" },
    { label: "Products", path: "/products", key: "products" },
    { label: "About", path: "/about", key: "about" },
    { label: "Contact", path: "/contact", key: "contact" },
  ],
};

// ============================================
// STATUS CONSTANTS
// ============================================
export const ORDER_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
};

export const SERVICE_STATUS = {
  PENDING: "pending",
  ASSIGNED: "assigned",
  IN_PROGRESS: "in_progress",
  WAITING_PARTS: "waiting_parts",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const PAYMENT_METHODS = {
  CASH: "cash",
  CARD: "card",
  UPI: "upi",
  EMI: "emi",
  BANK_TRANSFER: "bank_transfer",
};

export const ATTENDANCE_STATUS = {
  PRESENT: "present",
  ABSENT: "absent",
  HALF_DAY: "half_day",
  LEAVE: "leave",
  OFF_DAY: "off_day",
};

// ============================================
// BRAND COLORS
// ============================================
export const COLORS = {
  primaryBlue: "#1e4488",
  darkBlue: "#201b51",
  teal: "#00AFAA",
  darkBg: "#131419",

  heroGradient: "linear-gradient(90deg, #1e4488 0%, #201b51 50%, #00AFAA 100%)",
  ctaGradient: "linear-gradient(135deg, #1e4488 0%, #00AFAA 100%)",
  footerGradient: "linear-gradient(120deg, #0ea5e9, #22c55e, #8b5cf6, #f97316)",

  bikeColors: {
    black: "#1f1f1f",
    blue: "#1565c0",
    red: "#c62828",
    seaGreen: "#9aa3ad",
    white: "#ffffff",
  },
};

// ============================================
// BUSINESS CONSTANTS
// ============================================
export const FREE_SERVICES_COUNT =
  Number(import.meta.env.VITE_FREE_SERVICES_COUNT) || 4;
export const WARRANTY_MONTHS =
  Number(import.meta.env.VITE_WARRANTY_MONTHS) || 24;

// ============================================
// CONTACT & SOCIAL
// ============================================
export const CONTACT = {
  phone: "+91 7980598210",
  email: "enicontrol@yahoo.com",
  website: "https://ebikepoint.co.in",
};

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/ebikepoint",
  instagram: "https://instagram.com/ebikepoint",
  youtube: "https://youtube.com/@ebikepoint",
  linkedin: "https://linkedin.com/company/ebikepoint",
  whatsapp: "https://wa.me/917980598210",
};

// ============================================
// BIKE MODELS
// ============================================
export const BIKE_MODELS = {
  LIGHTNING: "LIGHTNING",
  MARIUM: "MARIUM",
  RABBITOR: "RABBITOR",
  SSUP: "SSUP",
  JV: "JV",
  MAKI: "MAKI",
};

// ============================================
// PAGINATION
// ============================================
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ============================================
// HELPER FUNCTIONS
// ============================================
export const hasPermission = (userRole, permission) => {
  return PERMISSIONS[userRole]?.[permission] || false;
};

export const getNavigationForRole = (userRole) => {
  return NAVIGATION[userRole] || NAVIGATION.public;
};

export const isRoleAuthorized = (userRole, allowedRoles = []) => {
  return allowedRoles.includes(userRole);
};
