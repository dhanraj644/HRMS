import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Siderbar";

const DashboardLayout = () => {

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-5">

                    <Outlet />

                </main>

            </div>

        </div>

    );
};

export default DashboardLayout;