import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../components/utils/axiosInstance";
import { addToast } from "@heroui/react";

export function useLogin() {
  const onError = (err: any) => {
    addToast({
      description: err?.response.data.message || "An error occurred",
    });
    console.log("err: ", err);
  };
  return useMutation({
    mutationFn: (data: any) => axiosInstance.post("/auth/login", data),
    onError,
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

export function useChangePassword() {
  const onError = (error: any) => {
    addToast({
      description: error?.response?.data?.message || "An error occurred",
    });
  };
  return useMutation({
    mutationFn: (data: any) =>
      axiosInstance.post("/auth/change-password", data),
    onError,
  });
}
