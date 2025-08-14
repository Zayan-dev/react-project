import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../components/utils/axiosInstance";
import { addToast } from "@heroui/react";
import Cookies from "js-cookie";
export function useLogin() {
  const onError = (err: any) => {
    addToast({
      description: err?.response.data.message || "An error occurred",
    });
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

export function useRefreshToken(options?: any) {
  const data: any = {
    authorization: JSON.stringify(Cookies.get("refresh-token")),
  };
  return useQuery({
    queryKey: ["refreshToken"],
    queryFn: () => axiosInstance.get("/auth/tokens", { headers: data }),
    refetchOnWindowFocus: false,
    enabled: options?.enabled ?? true, // allow disabling
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
  const onSuccess = () => {
    addToast({
      description: "Password Changed Successfully",
    });

  };
  return useMutation({
    mutationFn: (data: any) => axiosInstance.put("/user/password", data),
    onError,
    onSuccess,
  });
}
