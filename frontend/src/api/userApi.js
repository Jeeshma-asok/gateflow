import axiosInstance from "../services/axiosInstance";

export const userApi = {
  getAll: (params) => axiosInstance.get("/users/", { params }),
  create: (data) => axiosInstance.post("/users/", data),
  update: (id, data) => axiosInstance.put(`/users/${id}/`, data),
  toggleStatus: (id) => axiosInstance.patch(`/users/${id}/toggle-status/`),
  delete: (id) => axiosInstance.delete(`/users/${id}/`),
};
