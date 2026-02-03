import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import authService from "@/api/authService";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, logout: logoutStore } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data) => {
      setUser(data.user);
      toast.success("Login successful!");

      // Redirect based on role
      const roleRoutes = {
        admin: "/admin/dashboard",
        dealer: "/dealer/dashboard",
        employee: "/employee/dashboard",
        serviceman: "/serviceman/dashboard",
        customer: "/customer/dashboard",
      };

      navigate(roleRoutes[data.user.role] || "/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data) => authService.register(data),
    onSuccess: (data) => {
      if (data.tokens) {
        setUser(data.user);
        toast.success("Registration successful! Welcome!");
        navigate("/customer/dashboard");
      } else {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      }
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.response?.data?.email?.[0] ||
        "Registration failed";
      toast.error(message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logoutStore();
      toast.success("Logged out successfully");
      navigate("/login");
    },
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
};
