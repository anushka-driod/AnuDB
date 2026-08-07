import { FiBell } from "react-icons/fi";

const notifications = [
  {
    title: "Database Created",
    time: "2 min ago",
  },
  {
    title: "Table Imported",
    time: "10 min ago",
  },
  {
    title: "Backup Completed",
    time: "1 hour ago",
  },
  {
    title: "API Generated",
    time: "Yesterday",
  },
];

export default function NotificationDropdown() {
  return (
    <div className="dashboard-panel">

      <h3>Notifications</h3>

      {notifications.map((item, index) => (
        <div
          key={index}
          className="notification-item"
        >
          <FiBell />

          <div>
            <h4>{item.title}</h4>
            <small>{item.time}</small>
          </div>
        </div>
      ))}

    </div>
  );
}