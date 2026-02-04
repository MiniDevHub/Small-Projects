import api from "./axios";

const orderService = {
  // Dealer: Create order
  createOrder: async (data) => {
    const response = await api.post("/orders/create/", data);
    return response.data;
  },

  // Get orders (filtered by role)
  getOrders: async (params = {}) => {
    const response = await api.get("/orders/", { params });
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}/`);
    return response.data;
  },

  // Admin: Approve order
  approveOrder: async (id, data) => {
    const response = await api.post(`/orders/${id}/approve/`, data);
    return response.data;
  },

  // Admin: Reject order
  rejectOrder: async (id, data) => {
    const response = await api.post(`/orders/${id}/reject/`, data);
    return response.data;
  },

  // Admin: Mark as shipped
  shipOrder: async (id, data) => {
    const response = await api.post(`/orders/${id}/ship/`, data);
    return response.data;
  },
};

export { orderService };
