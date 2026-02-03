import api from "./axios";

const billingService = {
  // Dealer/Employee: Create sale
  createSale: async (data) => {
    const response = await api.post("/billing/sales/create/", data);
    return response.data;
  },

  // Get sales list
  getSales: async (params = {}) => {
    const response = await api.get("/billing/sales/", { params });
    return response.data;
  },

  // Get sale details
  getSaleById: async (id) => {
    const response = await api.get(`/billing/sales/${id}/`);
    return response.data;
  },

  // Customer: Get purchase history (My Bikes)
  getCustomerPurchases: async () => {
    const response = await api.get("/billing/customer/purchases/");
    return response.data;
  },
};

export default billingService;
