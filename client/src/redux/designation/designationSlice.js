import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as designationService from "../../services/designation.service.js";

export const fetchDesignations = createAsyncThunk(
    "designation/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await designationService.getDesignations();
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch designations");
        }
    }
);

export const createDesignation = createAsyncThunk(
    "designation/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = await designationService.createDesignation(data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to create designation");
        }
    }
);

export const updateDesignation = createAsyncThunk(
    "designation/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await designationService.updateDesignation(id, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to update designation");
        }
    }
);

export const deleteDesignation = createAsyncThunk(
    "designation/delete",
    async (id, { rejectWithValue }) => {
        try {
            await designationService.deleteDesignation(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to delete designation");
        }
    }
);

const designationSlice = createSlice({
    name: "designation",
    initialState: {
        designations: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearDesignationError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDesignations.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchDesignations.fulfilled, (state, action) => { state.loading = false; state.designations = action.payload; })
            .addCase(fetchDesignations.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(createDesignation.fulfilled, (state, action) => { state.designations.unshift(action.payload); })
            .addCase(updateDesignation.fulfilled, (state, action) => {
                const idx = state.designations.findIndex(d => d._id === action.payload._id);
                if (idx !== -1) state.designations[idx] = action.payload;
            })
            .addCase(deleteDesignation.fulfilled, (state, action) => {
                state.designations = state.designations.filter(d => d._id !== action.payload);
            });
    },
});

export const { clearDesignationError } = designationSlice.actions;
export default designationSlice.reducer;
