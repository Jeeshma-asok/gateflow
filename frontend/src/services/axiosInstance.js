import axios from "axios";

const API_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("token/refresh/")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        const response = await axiosInstance.post(
          "/api/token/refresh/",
          {
            refresh: refreshToken,
          }
        );

        const newAccessToken = response.data.access;

        localStorage.setItem("access", newAccessToken);

        if (response.data.refresh) {
          localStorage.setItem("refresh_token", response.data.refresh);
        }

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        window.location.href = "/login";

        return Promise.reject(refreshError);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;