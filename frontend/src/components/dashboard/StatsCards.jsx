import {
  FiDatabase,
  FiTable,
  FiActivity,
  FiHardDrive,
} from "react-icons/fi";

const stats = [
  {
    title: "Databases",
    value: "12",
    icon: <FiDatabase />,
  },
  {
    title: "Tables",
    value: "84",
    icon: <FiTable />,
  },
  {
    title: "API Requests",
    value: "1.8M",
    icon: <FiActivity />,
  },
  {
    title: "Storage",
    value: "128 GB",
    icon: <FiHardDrive />,
  },
];

export default function StatsCards() {
  return (
    <div className="stats-grid">
      {stats.map((item) => (
        <div className="stats-card" key={item.title}>
          <div className="stats-icon">
            {item.icon}
          </div>

          <h2>{item.value}</h2>

          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}