import api from "./axios.js";

export const getDesignations = () => api.get("/designation");

export const getDesignationById = (id) => api.get(`/designation/${id}`);

export const createDesignation = (data) => api.post("/designation", data);

export const updateDesignation = (id, data) => api.patch(`/designation/${id}`, data);

export const deleteDesignation = (id) => api.delete(`/designation/${id}`);
