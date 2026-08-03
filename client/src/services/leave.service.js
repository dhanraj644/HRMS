import api from "./axios.js";

// Leave Types
export const getLeaveTypes = () => api.get("/leave-type");

export const getLeaveTypeById = (id) => api.get(`/leave-type/${id}`);

export const createLeaveType = (data) => api.post("/leave-type", data);

export const updateLeaveType = (id, data) => api.patch(`/leave-type/${id}`, data);

export const deleteLeaveType = (id) => api.delete(`/leave-type/${id}`);

// Leave Requests
export const getLeaveRequests = () => api.get("/leave-request");

export const getMyLeaves = () => api.get("/leave-request/my-leaves");

export const applyLeave = (data) => api.post("/leave-request", data);

export const updateLeaveStatus = (id, data) => api.patch(`/leave-request/${id}/status`, data);

export const cancelLeave = (id) => api.patch(`/leave-request/${id}/cancel`);
