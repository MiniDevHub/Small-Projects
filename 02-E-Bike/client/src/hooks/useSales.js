import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import billingService from "@/api/billingService";
import toast from "react-hot-toast";

export const useSales = (params = {}) => {
  return useQuery({
    queryKey: ["sales", params],
    queryFn: () => billingService.getSales(params),
  });
};

export const useSale = (id) => {
  return useQuery({
    queryKey: ["sale", id],
    queryFn: () => billingService.getSaleById(id),
    enabled: !!id,
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: billingService.createSale,
    onSuccess: () => {
      queryClient.invalidateQueries(["sales"]);
      queryClient.invalidateQueries(["dealer-inventory"]);
      toast.success("Sale created successfully! Warranty activated.");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create sale");
    },
  });
};
