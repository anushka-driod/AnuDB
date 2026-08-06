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
  { icon: <FiGrid />, label: "Dashboard" },
  { icon: <FiDatabase />, label: "Databases" },
  { icon: <FiTable />, label: "Tables" },
  { icon: <FiFileText />, label: "Records" },
  { icon: <FiCode />, label: "API" },
  { icon: <FiHardDrive />, label: "Storage" },
  { icon: <FiBarChart2 />, label: "Analytics" },
  { icon: <FiSettings />, label: "Settings" },
];

export default function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-logo">
        <span>AnuDB</span>
      </div>

      <nav>
        {menu.map((item) => (
          <button
            key={item.label}
            className="sidebar-item"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="sidebar-logout">
        <FiLogOut />
        Logout
      </button>
    </aside>
  );
}