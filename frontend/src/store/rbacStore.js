
import { create } from "zustand";

import { userApi } from "../api/userApi";
import { roleApi } from "../api/roleApi";
import { policyApi } from "../api/policyApi";

export const useRBACStore = create((set) => ({
  users: [],
  roles: [],
  policies: [],
  permissions: [],

  loading: false,
  error: null,

  // USERS
  fetchUsers: async () => {
    set({ loading: true, error: null });

    try {
      const res = await userApi.getAll();
      set({ users: res.data.results || res.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addUser: async (data) => {
    try {
      const res = await userApi.create(data);
      set((state) => ({
        users: [...state.users, res.data],
      }));
      return res.data;
    } catch (error) {
      return error;
    }
      
  },

  updateUser: async (id, data) => {
    const res = await userApi.update(id, data);

    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? res.data : user
      ),
    }));

    return res.data;
  },

  deleteUser: async (id) => {
    try {
      await userApi.delete(id);
  
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      set({ error: error.response?.data?.message, loading: false });
    }
  },

  toggleUserStatus: async (id) => {
    try {
      console.log(1, "entry")
      const response = await userApi.toggleStatus(id);

      set((state) => ({
        users: state.users.map((user) =>
          user.id === id
            ? { ...user, is_active: response.data.is_active }
            : user
        ),
        error: null,
      }));

      return response.data;

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to update user status";

      set({ error: message });

      throw error;
    }
  },

  // ROLES
  fetchRoles: async () => {
    set({ loading: true, error: null });

    try {
      const res = await roleApi.getAll();
      set({ roles: res.data.results || res.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addRole: async (data) => {
    try{
      const res = await roleApi.create(data);
      set((state) => ({
        roles: [...state.roles, res.data],
      }));
      return res.data;
    } catch (error){
      return error.response?.data;
    }
  },

  updateRole: async (id, data) => {
    const res = await roleApi.update(id, data);

    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === id ? res.data : role
      ),
    }));

    return res.data;
  },

  deleteRole: async (id) => {
    await roleApi.delete(id);

    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    }));
  },

  // POLICIES
  fetchPermissions: async () => {
    set({ loading: true, error: null });
  
    try {
      const res = await policyApi.getPermissions();
      set({ permissions: res.data.results || res.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPolicies: async () => {
    set({ loading: true, error: null });
  
    try {
      const res = await policyApi.getAll();
      set({ policies: res.data.results || res.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addPolicy: async (data) => {
    const res = await policyApi.create(data);
    set((state) => ({
      policies: [...state.policies, res.data],
    }));
    return res.data;
  },

  updatePolicy: async (id, data) => {
    const res = await policyApi.update(id, data);

    set((state) => ({
      policies: state.policies.map((policy) =>
        policy.id === id ? res.data : policy
      ),
    }));

    return res.data;
  },

  deletePolicy: async (id) => {
    await policyApi.delete(id);

    set((state) => ({
      policies: state.policies.filter(
        (policy) => policy.id !== id
      ),
    }));
  },
}));
