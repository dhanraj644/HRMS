import {
  FaUsers,
  FaBuilding,
  FaUserTie,
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaCalendarAlt,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menu = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      title: "Users",
      icon: <FaUsers />,
      path: "/users",
    },
    {
      title: "Departments",
      icon: <FaBuilding />,
      path: "/departments",
    },
    {
      title: "Employees",
      icon: <FaUserTie />,
      path: "/employees",
    },
    {
      title: "Attendance",
      icon: <FaCalendarCheck />,
      path: "/attendance",
    },
    {
      title: "Payroll",
      icon: <FaMoneyCheckAlt />,
      path: "/payroll",
    },
    {
      title: "Holiday",
      icon: <FaCalendarAlt />,
      path: "/holiday",
    },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0">

      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        HRMS
      </div>

      <div className="mt-5">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 hover:bg-slate-700 ${
                isActive ? "bg-slate-700" : ""
              }`
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}

      </div>

      <button className="absolute bottom-5 left-6 flex items-center gap-2">

        <FaSignOutAlt />

        Logout

      </button>

    </aside>
  );
};

export default Sidebar;