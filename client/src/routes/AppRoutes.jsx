import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import UserList from "../pages/users/UserList";
import Unauthorized from "../pages/unauthorized/Unauthorized";
import NotFound from "../pages/not-found/NotFound";

import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Routes */}

            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected Routes */}

            <Route element={<ProtectedRoute />}>

                <Route element={<DashboardLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        element={<RoleRoute allowedRoles={["Admin"]} />}
                    >
                        <Route
                            path="/users"
                            element={<UserList />}
                        />
                    </Route>

                </Route>

            </Route>

            <Route
                path="/unauthorized"
                element={<Unauthorized />}
            />

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
};

export default AppRoutes;