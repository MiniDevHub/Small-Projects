import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/api/notificationService";
import toast from "react-hot-toast";

export const useNotifications = (params = {}) => {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: () => notificationService.getMyNotifications(params),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useUnreadCount = () => {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: notificationService.getUnreadCount,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      toast.success("All notifications marked as read");
    },
  });
};
