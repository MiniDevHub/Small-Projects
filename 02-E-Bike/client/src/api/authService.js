import api from "./axios";

const authService = {
  // Register customer
  register: async (data) => {
    const response = await api.post("/auth/register/", data);
    return response.data;
  },

  // Register dealer (admin only)
  registerDealer: async (data) => {
    const response = await api.post("/auth/register-dealer/", data);
    return response.data;
  },

  // Login
  login: async (email, password) => {
    const response = await api.post("/auth/login/", { email, password });
    const { access, refresh, user } = response.data;

    // Store tokens and user info
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  },

  // Logout
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await api.post("/auth/logout/", { refresh: refreshToken });
      }
    } finally {
      // Clear local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    }
  },

  // Get current user
  getProfile: async () => {
    const response = await api.get("/auth/me/");
    return response.data;
  },

  // Update profile
  updateProfile: async (data) => {
    const response = await api.put("/auth/profile/", data);

    // Update stored user data
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, ...response.data.user }),
    );

    return response.data;
  },

  // Change password
  changePassword: async (data) => {
    const response = await api.post("/auth/change-password/", data);
    return response.data;
  },

  // Delete account
  deleteAccount: async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await api.delete("/auth/delete-account/", {
      data: { refresh: refreshToken },
    });

    // Clear local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await api.post("/auth/token/refresh/", {
      refresh: refreshToken,
    });

    const { access } = response.data;
    localStorage.setItem("access_token", access);

    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("access_token");
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
};

export default authService;
