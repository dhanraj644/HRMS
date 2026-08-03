import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as attendanceService from "../../services/attendance.service.js";

export const fetchAttendances = createAsyncThunk(
    "attendance/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await attendanceService.getAttendances();
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch attendance");
        }
    }
);

export const fetchMyAttendance = createAsyncThunk(
    "attendance/fetchMine",
    async (_, { rejectWithValue }) => {
        try {
            const res = await attendanceService.getMyAttendance();
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch my attendance");
        }
    }
);

export const performCheckIn = createAsyncThunk(
    "attendance/checkIn",
    async (_, { rejectWithValue }) => {
        try {
            const res = await attendanceService.checkIn();
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Check-in failed");
        }
    }
);

export const performCheckOut = createAsyncThunk(
    "attendance/checkOut",
    async (_, { rejectWithValue }) => {
        try {
            const res = await attendanceService.checkOut();
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Check-out failed");
        }
    }
);

const attendanceSlice = createSlice({
    name: "attendance",
    initialState: {
        attendances: [],
        myAttendance: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearAttendanceError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendances.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAttendances.fulfilled, (state, action) => { state.loading = false; state.attendances = action.payload; })
            .addCase(fetchAttendances.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(fetchMyAttendance.fulfilled, (state, action) => { state.myAttendance = action.payload; })
            .addCase(performCheckIn.fulfilled, (state, action) => {
                if (action.payload) state.myAttendance.unshift(action.payload);
            })
            .addCase(performCheckOut.fulfilled, (state, action) => {
                if (action.payload) {
                    const idx = state.myAttendance.findIndex(a => a._id === action.payload._id);
                    if (idx !== -1) state.myAttendance[idx] = action.payload;
                }
            });
    },
});

export const { clearAttendanceError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
