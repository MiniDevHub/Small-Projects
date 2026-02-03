import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import orderService from "@/api/orderService";
import toast from "react-hot-toast";

export const useOrders = (params = {}) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => orderService.getOrders(params),
  });
};

export const useOrder = (id) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order created successfully! Waiting for admin approval.");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create order");
    },
  });
};
