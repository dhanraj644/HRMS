import api from "./axios.js";

export const login = (data) => api.post("/auth/login", data);

export const logout = () => api.post("/auth/logout");

export const refreshToken = () => api.post("/auth/refresh-token");

export const getProfile = () => api.get("/auth/me");

export const changePassword = (data) => api.patch("/auth/change-password", data);

export const forgotPassword = (data) => api.post("/auth/forgot-password", data);

export const resetPassword = (token, data) => api.post(`/auth/reset-password/${token}`, data);