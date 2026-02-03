// Currency formatting
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Compact currency (for large numbers: 1000 -> 1K, 1000000 -> 1M)
export const formatCurrencyCompact = (amount) => {
  if (amount === null || amount === undefined) return "₹0";

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)}Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(2)}K`;
  }
  return formatCurrency(amount);
};

// Date formatting
export const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Date and time formatting
export const formatDateTime = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Relative time (e.g., "2 hours ago", "3 days ago")
export const formatRelativeTime = (date) => {
  if (!date) return "-";

  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;

  return formatDate(date);
};

// Phone number formatting
export const formatPhone = (phone) => {
  if (!phone) return "-";
  // Format: +91 98765 43210
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
};

// Text truncation
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// Number formatting (with commas)
export const formatNumber = (num) => {
  if (num === null || num === undefined) return "0";
  return new Intl.NumberFormat("en-IN").format(num);
};

// Percentage formatting
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return "0%";
  return `${parseFloat(value).toFixed(decimals)}%`;
};

// File size formatting
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Status badge color utility
export const getStatusColor = (status) => {
  const colors = {
    // Order statuses
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    approved: "bg-green-100 text-green-800 border-green-300",
    rejected: "bg-red-100 text-red-800 border-red-300",
    shipped: "bg-blue-100 text-blue-800 border-blue-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
    completed: "bg-green-100 text-green-800 border-green-300",
    cancelled: "bg-gray-100 text-gray-800 border-gray-300",

    // Service statuses
    requested: "bg-blue-100 text-blue-800 border-blue-300",
    in_progress: "bg-blue-100 text-blue-800 border-blue-300",
    assigned: "bg-purple-100 text-purple-800 border-purple-300",
    on_hold: "bg-orange-100 text-orange-800 border-orange-300",

    // General statuses
    active: "bg-green-100 text-green-800 border-green-300",
    inactive: "bg-gray-100 text-gray-800 border-gray-300",
    available: "bg-green-100 text-green-800 border-green-300",
    unavailable: "bg-red-100 text-red-800 border-red-300",
    low_stock: "bg-orange-100 text-orange-800 border-orange-300",
    out_of_stock: "bg-red-100 text-red-800 border-red-300",

    // Payment statuses
    paid: "bg-green-100 text-green-800 border-green-300",
    unpaid: "bg-red-100 text-red-800 border-red-300",
    partial: "bg-yellow-100 text-yellow-800 border-yellow-300",
    refunded: "bg-purple-100 text-purple-800 border-purple-300",
  };

  return (
    colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-300"
  );
};

// Status icon utility
export const getStatusIcon = (status) => {
  const icons = {
    pending: "⏳",
    approved: "✅",
    rejected: "❌",
    shipped: "🚚",
    delivered: "📦",
    completed: "✅",
    cancelled: "🚫",
    in_progress: "⚙️",
    assigned: "👤",
    active: "🟢",
    inactive: "⚫",
    low_stock: "⚠️",
    out_of_stock: "❌",
  };

  return icons[status?.toLowerCase()] || "•";
};

// Capitalize first letter
export const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Convert snake_case to Title Case
export const snakeToTitle = (str) => {
  if (!str) return "";
  return str
    .split("_")
    .map((word) => capitalizeFirst(word))
    .join(" ");
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Random color generator (for avatars, charts, etc.)
export const getRandomColor = (seed = "") => {
  const colors = [
    "from-red-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-orange-500",
    "from-purple-500 to-pink-500",
    "from-indigo-500 to-purple-500",
    "from-teal-500 to-cyan-500",
    "from-orange-500 to-red-500",
  ];

  if (seed) {
    const hash = seed
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  }

  return colors[Math.floor(Math.random() * colors.length)];
};

// Duration formatting (seconds to readable format)
export const formatDuration = (seconds) => {
  if (!seconds || seconds < 0) return "0s";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
};

// Calculate discount percentage
export const calculateDiscount = (mrp, price) => {
  if (!mrp || !price || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
};

// Format discount
export const formatDiscount = (mrp, price) => {
  const discount = calculateDiscount(mrp, price);
  return discount > 0 ? `${discount}% OFF` : null;
};

// Validate email
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate phone (Indian)
export const isValidPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  return (
    cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith("91"))
  );
};

// Generate order number
export const generateOrderNumber = (prefix = "ORD") => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Color classes for charts/stats
export const getColorClass = (index) => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-teal-500",
  ];
  return colors[index % colors.length];
};

// Export all utilities
export default {
  formatCurrency,
  formatCurrencyCompact,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatPhone,
  truncateText,
  formatNumber,
  formatPercentage,
  formatFileSize,
  getStatusColor,
  getStatusIcon,
  capitalizeFirst,
  snakeToTitle,
  getInitials,
  getRandomColor,
  formatDuration,
  calculateDiscount,
  formatDiscount,
  isValidEmail,
  isValidPhone,
  generateOrderNumber,
  getColorClass,
};
