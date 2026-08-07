import {
  FiDatabase,
  FiActivity,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

const cards = [
  {
    title: "Databases",
    value: "12",
    icon: <FiDatabase />,
  },
  {
    title: "API Calls",
    value: "1.8M",
    icon: <FiActivity />,
  },
  {
    title: "Users",
    value: "842",
    icon: <FiUsers />,
  },
  {
    title: "Growth",
    value: "+18%",
    icon: <FiTrendingUp />,
  },
];

export default function AnalyticsCards() {
  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <div className="stats-card" key={card.title}>
          <div className="stats-icon">
            {card.icon}
          </div>

          <h2>{card.value}</h2>

          <p>{card.title}</p>
        </div>
      ))}
    </div>
  );
}