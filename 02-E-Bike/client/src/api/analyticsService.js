import api from "./axios";

export const analyticsService = {
  // Admin Dashboard
  getAdminDashboard: async () => {
    const response = await api.get("/analytics/admin/dashboard/");
    return response.data;
  },

  // Sales Analytics
  getSalesAnalytics: async (params = {}) => {
    const response = await api.get("/analytics/sales/", { params });
    return response.data;
  },

  // Sales Dashboard (for dealers/employees)
  getSalesDashboard: async () => {
    const response = await api.get("/analytics/sales/dashboard/");
    return response.data;
  },

  // Revenue Trends
  getRevenueTrends: async (params = {}) => {
    const response = await api.get("/analytics/revenue-trends/", { params });
    return response.data;
  },

  // Top Products
  getTopProducts: async (params = {}) => {
    const response = await api.get("/analytics/top-products/", { params });
    return response.data;
  },

  // Top Dealers
  getTopDealers: async (params = {}) => {
    const response = await api.get("/analytics/top-dealers/", { params });
    return response.data;
  },

  // Payment Methods Stats
  getPaymentMethodsStats: async (params = {}) => {
    const response = await api.get("/analytics/payment-methods/", { params });
    return response.data;
  },
};
