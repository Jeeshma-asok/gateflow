
import { create } from "zustand";
import { loginApi } from "../api/authApi"

const getStoredTokens = () => ({
  access: localStorage.getItem("access_token"),
  refresh: localStorage.getItem("refresh_token"),
});

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: getStoredTokens().access,
  isAuthenticated: !!getStoredTokens().access,
  loading: false,

  login: async (credentials) => {
    set({ loading: true });

    try {
      const data = await loginApi(credentials);

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      set({
        user: data.user,
        accessToken: data.access,
        isAuthenticated: true,
        loading: false,
      });

      return data;

    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },

  setUser: (user) => set({ user }),

  setAccessToken: (token) => {
    localStorage.setItem("access_token", token);
    set({ accessToken: token, isAuthenticated: true });
  },
}));
