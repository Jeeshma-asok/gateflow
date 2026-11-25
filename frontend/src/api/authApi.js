
import axiosInstance from "../services/axiosInstance";

export const loginApi = async (credentials) => {
  const response = await axiosInstance.post("/login/", credentials);
  return response.data;
};

export const refreshTokenApi = async (refresh) => {
  const response = await axiosInstance.post("/token/refresh/", {
    refresh,
  });
  return response.data;
};
