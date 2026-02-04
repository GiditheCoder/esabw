import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiBaseUrl = import.meta.env.VITE_BASE_URL ?? "";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useCreateAppointment = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post("/api/v1/appointments", payload);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      options.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useCreateMessage = (options = {}) =>
  useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post("/api/v1/messages", payload);
      return response.data;
    },
    ...options,
  });
