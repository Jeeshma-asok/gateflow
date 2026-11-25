import axiosInstance from "../services/axiosInstance";

export const policyApi = {
  getPermissions: () => axiosInstance.get("/policies/permission-modules/"),
  getAll: () => axiosInstance.get("/policies/"),
  create: (data) => axiosInstance.post("/policies/", data),
  update: (id, data) => axiosInstance.put(`/policies/${id}/`, data),
  partialUpdate: (id, data) => axiosInstance.patch(`/policies/${id}/`, data),
  delete: (id) => axiosInstance.delete(`/policies/${id}/`),
};
