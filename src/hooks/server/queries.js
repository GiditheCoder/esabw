import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const apiBaseUrl = import.meta.env.VITE_BASE_URL ?? "";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useGetAllAppointments = (params = {}) =>
  useQuery({
    queryKey: ["appointments", params],
    queryFn: async () => {
      const response = await apiClient.get("/api/v1/appointments", {
        params,
      });
      return response.data.data;
    },
  });
