import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { sidebarItems } from "../../config/sidebarConfig";

const Sidebar = () => {

    const user = useSelector(
        (state) => state.auth.user
    );

    return (

        <aside className="w-64 h-screen bg-slate-900 text-white">

            <div className="text-2xl font-bold p-5">

                HRMS

            </div>

            <div>

                {

                    sidebarItems

                        .filter(item =>
                            item.roles.includes(user?.role_id?.name)
                        )

                        .map(item => {

                            const Icon = item.icon;

                            return (

                                <NavLink

                                    key={item.path}

                                    to={item.path}

                                    className={({ isActive }) =>

                                        `flex items-center gap-3 px-5 py-3 hover:bg-slate-800

                                        ${isActive ? "bg-blue-600" : ""}`

                                    }

                                >

                                    <Icon />

                                    {item.title}

                                </NavLink>

                            );

                        })

                }

            </div>

        </aside>

    );

};

export default Sidebar;