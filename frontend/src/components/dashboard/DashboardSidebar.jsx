import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiDatabase,
  FiTable,
  FiFileText,
  FiCode,
  FiHardDrive,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const menu = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <FiGrid />,
  },
  {
    label: "Databases",
    path: "/databases",
    icon: <FiDatabase />,
  },
  {
    label: "Tables",
    path: "/tables",
    icon: <FiTable />,
  },
  {
    label: "Records",
    path: "/records",
    icon: <FiFileText />,
  },
  {
    label: "API",
    path: "/api",
    icon: <FiCode />,
  },
  {
    label: "Storage",
    path: "/storage",
    icon: <FiHardDrive />,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: <FiBarChart2 />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <FiSettings />,
  },
];

export default function DashboardSidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <aside className="dashboard-sidebar">

      <div className="sidebar-logo">
        <h2>AnuDB</h2>
      </div>

      <nav className="sidebar-nav">

        {menu.map((item) => (

          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-item sidebar-active"
                : "sidebar-item"
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>

        ))}

      </nav>

      <button
        className="sidebar-logout"
        onClick={handleLogout}
      >
        <FiLogOut />
        <span>Logout</span>
      </button>

    </aside>
  );
}