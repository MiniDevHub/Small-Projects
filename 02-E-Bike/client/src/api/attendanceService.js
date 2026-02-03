import api from "./axios";

const attendanceService = {
  // Employee/Serviceman: Clock in
  clockIn: async () => {
    const response = await api.post("/attendance/clock-in/");
    return response.data;
  },

  // Employee/Serviceman: Clock out
  clockOut: async () => {
    const response = await api.post("/attendance/clock-out/");
    return response.data;
  },

  // Get own attendance
  getMyAttendance: async (params = {}) => {
    const response = await api.get("/attendance/my/", { params });
    return response.data;
  },

  // Dealer: Edit attendance
  editAttendance: async (id, data) => {
    const response = await api.put(`/attendance/${id}/edit/`, data);
    return response.data;
  },
};

export default attendanceService;
