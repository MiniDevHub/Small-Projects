import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/api/adminService";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: adminService.getDashboardStats,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAllUsers = (params = {}) => {
  return useQuery({
    queryKey: ["admin", "users", params],
    queryFn: () => adminService.getAllUsers(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useAllOrders = (params = {}) => {
  return useQuery({
    queryKey: ["admin", "orders", params],
    queryFn: () => adminService.getAllOrders(params),
    staleTime: 2 * 60 * 1000,
  });
};
