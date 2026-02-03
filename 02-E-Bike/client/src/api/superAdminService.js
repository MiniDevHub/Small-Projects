import api from "./axios";

export const superAdminService = {
  // Dashboard
  getDashboard: async () => {
    const response = await api.get("/analytics/admin/dashboard/");
    return response.data;
  },

  // Admin Management
  getAllAdmins: async (params = {}) => {
    const response = await api.get("/auth/users/", {
      params: { ...params, role: "admin" },
    });
    return response.data;
  },

  createAdmin: async (data) => {
    const response = await api.post("/auth/admin/create/", data);
    return response.data;
  },

  updateAdmin: async (adminId, data) => {
    const response = await api.patch(`/auth/users/${adminId}/`, data);
    return response.data;
  },

  deleteAdmin: async (adminId) => {
    const response = await api.delete(`/auth/users/${adminId}/`);
    return response.data;
  },

  // System Management
  getSystemStats: async () => {
    const response = await api.get("/system/stats/");
    return response.data;
  },

  getActivityLogs: async (params = {}) => {
    const response = await api.get("/system/logs/", { params });
    return response.data;
  },

  // All Dealers
  getAllDealers: async (params = {}) => {
    const response = await api.get("/auth/users/", {
      params: { ...params, role: "dealer" },
    });
    return response.data;
  },
};
