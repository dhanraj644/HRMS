import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaUserTie,
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaCalendarAlt,
} from "react-icons/fa";

export const sidebarItems = [

  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
    roles: ["Admin", "HR", "Manager", "Employee"],
  },

  {
    title: "Users",
    path: "/users",
    icon: FaUsers,
    roles: ["Admin"],
  },

  {
    title: "Departments",
    path: "/departments",
    icon: FaBuilding,
    roles: ["Admin", "HR"],
  },

  {
    title: "Employees",
    path: "/employees",
    icon: FaUserTie,
    roles: ["Admin", "HR", "Manager"],
  },

  {
    title: "Attendance",
    path: "/attendance",
    icon: FaCalendarCheck,
    roles: ["Admin", "HR", "Manager", "Employee"],
  },

  {
    title: "Payroll",
    path: "/payroll",
    icon: FaMoneyCheckAlt,
    roles: ["Admin", "HR"],
  },

  {
    title: "Holiday",
    path: "/holiday",
    icon: FaCalendarAlt,
    roles: ["Admin", "HR", "Employee"],
  },

];