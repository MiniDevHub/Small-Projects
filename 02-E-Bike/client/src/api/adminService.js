import api from "./axios";

export const adminService = {
  // Dashboard stats
  getDashboardStats: async () => {
    const response = await api.get("/analytics/admin/dashboard/");
    return response.data;
  },

  // Users
  getAllUsers: async (params = {}) => {
    const response = await api.get("/auth/users/", { params });
    return response.data;
  },

  createDealer: async (data) => {
    const response = await api.post("/auth/register-dealer/", data);
    return response.data;
  },

  updateUser: async (userId, data) => {
    const response = await api.patch(`/auth/users/${userId}/`, data);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/auth/users/${userId}/`);
    return response.data;
  },

  // Orders
  getAllOrders: async (params = {}) => {
    const response = await api.get("/orders/dealer/", { params });
    return response.data;
  },

  getOrderDetails: async (orderId) => {
    const response = await api.get(`/orders/dealer/${orderId}/`);
    return response.data;
  },

  approveOrder: async (orderId, data) => {
    const response = await api.post(`/orders/dealer/${orderId}/approve/`, data);
    return response.data;
  },

  rejectOrder: async (orderId, data) => {
    const response = await api.post(`/orders/dealer/${orderId}/reject/`, data);
    return response.data;
  },

  markAsShipped: async (orderId, data) => {
    const response = await api.post(`/orders/dealer/${orderId}/ship/`, data);
    return response.data;
  },
};
