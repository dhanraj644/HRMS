import api from "./axios.js";

export const getEmployees = () => api.get("/employee");

export const getEmployeeById = (id) => api.get(`/employee/${id}`);

export const createEmployee = (data) => api.post("/employee", data);

export const updateEmployee = (id, data) => api.patch(`/employee/${id}`, data);

export const deleteEmployee = (id) => api.delete(`/employee/${id}`);

export const getMyProfile = () => api.get("/employee/profile/me");

export const updateMyProfile = (data) => api.patch("/employee/profile/me", data);
