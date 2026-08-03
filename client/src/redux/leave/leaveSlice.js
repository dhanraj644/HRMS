import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as leaveService from "../../services/leave.service.js";

export const fetchLeaveTypes = createAsyncThunk(
    "leave/fetchTypes",
    async (_, { rejectWithValue }) => {
        try {
            const res = await leaveService.getLeaveTypes();
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch leave types");
        }
    }
);

export const createLeaveType = createAsyncThunk(
    "leave/createType",
    async (data, { rejectWithValue }) => {
        try {
            const res = await leaveService.createLeaveType(data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to create leave type");
        }
    }
);

export const updateLeaveType = createAsyncThunk(
    "leave/updateType",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await leaveService.updateLeaveType(id, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to update leave type");
        }
    }
);

export const deleteLeaveType = createAsyncThunk(
    "leave/deleteType",
    async (id, { rejectWithValue }) => {
        try {
            await leaveService.deleteLeaveType(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to delete leave type");
        }
    }
);

export const fetchLeaveRequests = createAsyncThunk(
    "leave/fetchRequests",
    async (_, { rejectWithValue }) => {
        try {
            const res = await leaveService.getLeaveRequests();
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch leave requests");
        }
    }
);

export const fetchMyLeaves = createAsyncThunk(
    "leave/fetchMyLeaves",
    async (_, { rejectWithValue }) => {
        try {
            const res = await leaveService.getMyLeaves();
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch my leaves");
        }
    }
);

export const applyLeave = createAsyncThunk(
    "leave/apply",
    async (data, { rejectWithValue }) => {
        try {
            const res = await leaveService.applyLeave(data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to apply leave");
        }
    }
);

export const updateLeaveStatus = createAsyncThunk(
    "leave/updateStatus",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await leaveService.updateLeaveStatus(id, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to update leave status");
        }
    }
);

export const cancelLeave = createAsyncThunk(
    "leave/cancel",
    async (id, { rejectWithValue }) => {
        try {
            const res = await leaveService.cancelLeave(id);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to cancel leave");
        }
    }
);

const leaveSlice = createSlice({
    name: "leave",
    initialState: {
        leaveTypes: [],
        leaveRequests: [],
        myLeaves: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearLeaveError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaveTypes.pending, (state) => { state.loading = true; })
            .addCase(fetchLeaveTypes.fulfilled, (state, action) => { state.loading = false; state.leaveTypes = action.payload; })
            .addCase(fetchLeaveTypes.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(createLeaveType.fulfilled, (state, action) => { if (action.payload) state.leaveTypes.unshift(action.payload); })
            .addCase(updateLeaveType.fulfilled, (state, action) => {
                if (action.payload) {
                    const idx = state.leaveTypes.findIndex(t => t._id === action.payload._id);
                    if (idx !== -1) state.leaveTypes[idx] = action.payload;
                }
            })
            .addCase(deleteLeaveType.fulfilled, (state, action) => {
                state.leaveTypes = state.leaveTypes.filter(t => t._id !== action.payload);
            })
            .addCase(fetchLeaveRequests.pending, (state) => { state.loading = true; })
            .addCase(fetchLeaveRequests.fulfilled, (state, action) => { state.loading = false; state.leaveRequests = action.payload; })
            .addCase(fetchLeaveRequests.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(fetchMyLeaves.fulfilled, (state, action) => { state.myLeaves = action.payload; })
            .addCase(applyLeave.fulfilled, (state, action) => { if (action.payload) state.myLeaves.unshift(action.payload); })
            .addCase(updateLeaveStatus.fulfilled, (state, action) => {
                if (action.payload) {
                    const idx = state.leaveRequests.findIndex(r => r._id === action.payload._id);
                    if (idx !== -1) state.leaveRequests[idx] = action.payload;
                }
            })
            .addCase(cancelLeave.fulfilled, (state, action) => {
                if (action.payload) {
                    const idx = state.myLeaves.findIndex(r => r._id === action.payload._id);
                    if (idx !== -1) state.myLeaves[idx] = action.payload;
                }
            });
    },
});

export const { clearLeaveError } = leaveSlice.actions;
export default leaveSlice.reducer;
