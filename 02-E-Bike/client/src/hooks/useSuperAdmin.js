import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { superAdminService } from "@/api/superAdminService";
import toast from "react-hot-toast";

export const useSuperAdminDashboard = () => {
  return useQuery({
    queryKey: ["super-admin", "dashboard"],
    queryFn: superAdminService.getDashboard,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAllAdmins = (params = {}) => {
  return useQuery({
    queryKey: ["super-admin", "admins", params],
    queryFn: () => superAdminService.getAllAdmins(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: superAdminService.createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(["super-admin", "admins"]);
      toast.success("Admin created successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create admin");
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: superAdminService.deleteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(["super-admin", "admins"]);
      toast.success("Admin deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete admin");
    },
  });
};

export const useAllDealers = (params = {}) => {
  return useQuery({
    queryKey: ["super-admin", "dealers", params],
    queryFn: () => superAdminService.getAllDealers(params),
    staleTime: 2 * 60 * 1000,
  });
};
