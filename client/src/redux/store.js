import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import departmentReducer from "./department/departmentSlice";
import designationReducer from "./designation/designationSlice";
import employeeReducer from "./employee/employeeSlice";
import attendanceReducer from "./attendance/attendanceSlice";
import leaveReducer from "./leave/leaveSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        department: departmentReducer,
        designation: designationReducer,
        employee: employeeReducer,
        attendance: attendanceReducer,
        leave: leaveReducer,
    },
});