import api from "./axios";

export const superAdminService = {
  // Get dashboard stats (for Super Admin)
  getDashboard: async () => {
    // Don't call admin analytics - Super Admin has different permissions
    const admins = await superAdminService.getAllAdmins();
    return {
      admins_count: admins?.admins?.length || 0,
      system_health: 100,
      active_sessions: 1,
      alerts: 0,
    };
  },

  // Get all admins
  getAllAdmins: async () => {
    const response = await api.get("/auth/admins/");
    return response.data;
  },

  // Create admin
  createAdmin: async (data) => {
    const response = await api.post("/auth/admins/register/", data);
    return response.data;
  },

  // Update admin
  updateAdmin: async (adminId, data) => {
    const response = await api.put(`/auth/admins/${adminId}/`, data);
    return response.data;
  },

  // Delete admin
  deleteAdmin: async (adminId) => {
    const response = await api.delete(`/auth/admins/${adminId}/delete/`);
    return response.data;
  },

  // System settings
  getSystemSettings: async () => {
    const response = await api.get("/system/settings/");
    return response.data;
  },

  updateSystemSettings: async (data) => {
    const response = await api.put("/system/settings/", data);
    return response.data;
  },

  // Activity logs
  getActivityLogs: async (params = {}) => {
    const response = await api.get("/system/logs/", { params });
    return response.data;
  },
};
