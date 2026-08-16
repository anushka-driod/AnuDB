import {
  FiDatabase,
  FiTable,
  FiFileText,
  FiActivity,
} from "react-icons/fi";

export default function AnalyticsCards({ cards }) {

  const data = cards || {};

  const items = [
    {
      title: "Databases",
      value: data.databases ?? 0,
      icon: <FiDatabase />,
    },
    {
      title: "Tables",
      value: data.tables ?? 0,
      icon: <FiTable />,
    },
    {
      title: "Records",
      value: data.records ?? 0,
      icon: <FiFileText />,
    },
    {
      title: "API Calls",
      value: data.apiCalls ?? 0,
      icon: <FiActivity />,
    },
  ];

  return (
    <div className="stats-grid">

      {items.map((item) => (

        <div
          className="stats-card"
          key={item.title}
        >

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