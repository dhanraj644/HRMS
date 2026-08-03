import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as employeeService from "../../services/employee.service.js";

export const fetchEmployees = createAsyncThunk(
    "employee/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await employeeService.getEmployees();
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch employees");
        }
    }
);

export const fetchEmployeeById = createAsyncThunk(
    "employee/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await employeeService.getEmployeeById(id);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Employee not found");
        }
    }
);

export const createEmployee = createAsyncThunk(
    "employee/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = await employeeService.createEmployee(data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to create employee");
        }
    }
);

export const updateEmployee = createAsyncThunk(
    "employee/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await employeeService.updateEmployee(id, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to update employee");
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    "employee/delete",
    async (id, { rejectWithValue }) => {
        try {
            await employeeService.deleteEmployee(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to delete employee");
        }
    }
);

export const fetchMyProfile = createAsyncThunk(
    "employee/fetchMyProfile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await employeeService.getMyProfile();
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
        }
    }
);

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employees: [],
        selectedEmployee: null,
        myProfile: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearEmployeeError: (state) => { state.error = null; },
        clearSelectedEmployee: (state) => { state.selectedEmployee = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchEmployees.fulfilled, (state, action) => { state.loading = false; state.employees = action.payload; })
            .addCase(fetchEmployees.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(fetchEmployeeById.pending, (state) => { state.loading = true; })
            .addCase(fetchEmployeeById.fulfilled, (state, action) => { state.loading = false; state.selectedEmployee = action.payload; })
            .addCase(fetchEmployeeById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(createEmployee.fulfilled, (state, action) => { if (action.payload) state.employees.unshift(action.payload); })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                if (action.payload) {
                    const idx = state.employees.findIndex(e => e._id === action.payload._id);
                    if (idx !== -1) state.employees[idx] = action.payload;
                    if (state.selectedEmployee?._id === action.payload._id) state.selectedEmployee = action.payload;
                }
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(e => e._id !== action.payload);
            })
            .addCase(fetchMyProfile.fulfilled, (state, action) => { state.myProfile = action.payload; });
    },
});

export const { clearEmployeeError, clearSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
