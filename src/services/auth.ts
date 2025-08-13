import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../components/utils/axiosInstance";
import { addToast } from "@heroui/react";

export function useLogin() {
  return useMutation({
    mutationFn: (data: any) => axiosInstance.post("/auth/login", data),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: (data: any) => axiosInstance.post("/auth/tokens", data),
  });
}

export function useForgotPassword() {
  const onError = (error: any) => {
    addToast({
      description: error?.response?.data?.message || "An error occurred",
    });
  };
  return useMutation({
    mutationFn: (data: any) =>
      axiosInstance.post("/auth/forgot-password", data),
    onError,
  });
}
