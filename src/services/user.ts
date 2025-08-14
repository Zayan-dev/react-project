import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../components/utils/axiosInstance";
import { addToast } from "@heroui/react";

export const useChangePassword = (data: any) => {
  const onError = (err: any) => {
    addToast({
      description: err?.response.data.message || "An error occurred",
    });
  };
  const onSuccess = () => {
    addToast({
      description: "Password Changed SuccessFully",
    });
  };
  return useMutation({
    mutationFn: () => axiosInstance.post("/user/password", data),
    onSuccess,
    onError,
  });
};
