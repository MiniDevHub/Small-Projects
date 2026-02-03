import api from "./axios";

const serviceService = {
  // Customer: Create service request
  createServiceRequest: async (data) => {
    const response = await api.post("/service/request/create/", data);
    return response.data;
  },

  // Get service requests
  getServiceRequests: async (params = {}) => {
    const response = await api.get("/service/requests/", { params });
    return response.data;
  },

  // Get service request details
  getServiceRequestById: async (id) => {
    const response = await api.get(`/service/requests/${id}/`);
    return response.data;
  },

  // Dealer: Assign service to serviceman
  assignService: async (id, data) => {
    const response = await api.post(`/service/requests/${id}/assign/`, data);
    return response.data;
  },

  // Serviceman: Update service status
  updateServiceStatus: async (id, data) => {
    const response = await api.post(
      `/service/requests/${id}/update-status/`,
      data,
    );
    return response.data;
  },

  // Get warranty status
  getWarrantyStatus: async (invoiceId) => {
    const response = await api.get(`/service/warranty/${invoiceId}/`);
    return response.data;
  },
};

export default serviceService;
