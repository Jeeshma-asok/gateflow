import axiosInstance from "../services/axiosInstance";


export const roleApi = {
  getAll: () => axiosInstance.get("/roles/"),
  create: (data) => axiosInstance.post("/roles/", data),
  update: (id, data) => axiosInstance.put(`/roles/${id}/`, data),
  partialUpdate: (id, data) => axiosInstance.patch(`/roles/${id}/`, data),
  delete: (id) => axiosInstance.delete(`/roles/${id}/`),
};
