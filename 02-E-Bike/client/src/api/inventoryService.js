import api from "./axios";

const inventoryService = {
  // Dealer: Get inventory
  getInventory: async (params = {}) => {
    const response = await api.get("/inventory/", { params });
    return response.data;
  },

  // Dealer: Get low stock items
  getLowStockItems: async () => {
    const response = await api.get("/inventory/low-stock/");
    return response.data;
  },
};

export default inventoryService;
