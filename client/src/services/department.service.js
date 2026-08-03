import api from "./axios.js";

export const getDepartments = () => api.get("/department");

export const getDepartmentById = (id) => api.get(`/department/${id}`);

export const createDepartment = (data) => api.post("/department", data);

export const updateDepartment = (id, data) => api.patch(`/department/${id}`, data);

export const deleteDepartment = (id) => api.delete(`/department/${id}`);
