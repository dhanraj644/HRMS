import api from "./axios.js";

export const getAttendances = () => api.get("/attandance");

export const getAttendanceById = (id) => api.get(`/attandance/${id}`);

export const createAttendance = (data) => api.post("/attandance", data);

export const updateAttendance = (id, data) => api.patch(`/attandance/${id}`, data);

export const deleteAttendance = (id) => api.delete(`/attandance/${id}`);

export const checkIn = () => api.post("/attandance/check-in");

export const checkOut = () => api.patch("/attandance/check-out");

export const getMyAttendance = () => api.get("/attandance/me");
