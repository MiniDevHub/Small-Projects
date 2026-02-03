import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/api/analyticsService";

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: analyticsService.getAdminDashboard,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSalesAnalytics = (params) => {
  return useQuery({
    queryKey: ["analytics", "sales", params],
    queryFn: () => analyticsService.getSalesAnalytics(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSalesDashboard = () => {
  return useQuery({
    queryKey: ["sales", "dashboard"],
    queryFn: analyticsService.getSalesDashboard,
    staleTime: 5 * 60 * 1000,
  });
};
