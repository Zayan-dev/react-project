import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../components/utils/axiosInstance";

export function useGetAllDocuments(
  page: number,
  limit: number,
  watchSearchQuery?: string
) {
  return useQuery({
    queryKey: ["allDocuments", page, limit, watchSearchQuery],
    queryFn: () => {
      const searchParam = watchSearchQuery
        ? `&searchQuery=${watchSearchQuery}`
        : "";
      return axiosInstance.get(
        `/document/all?page=${page}&limit=${limit}${searchParam}`
      );
    },
    refetchOnWindowFocus: false,
  });
}

export function useGetDocById(id: string) {
  return useQuery({
    queryKey: ["document", id],
    queryFn: () => axiosInstance.get(`/document?documentId=${id}`),
    refetchOnWindowFocus: false,
  });
}

export function useDocStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => axiosInstance.get(`document/stats`),
    refetchOnWindowFocus: false,
  });
}
