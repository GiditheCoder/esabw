import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiBaseUrl = import.meta.env.VITE_BASE_URL ?? "";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const authorizeedApiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

authorizeedApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useCreateAppointment = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const isFormData = payload instanceof FormData;
      const response = await apiClient.post("/api/v1/appointments", payload, {
        headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
      });
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

export const useAdminLogin = () =>
  useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await apiClient.post("/api/v1/admin/login", {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
      }
    },
  });

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, rejectionReason = "" }) => {
      const response = await authorizeedApiClient.patch(
        `/api/v1/appointments/${id}`,
        {
          status,
          rejectionReason,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await authorizeedApiClient.delete(
        `/api/v1/appointments/${id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};
