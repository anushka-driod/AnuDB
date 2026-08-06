const activities = [
  "Created Database 'School'",
  "Added Table 'Students'",
  "Inserted 240 Records",
  "Generated REST API",
  "Storage Increased",
];

export default function RecentActivity() {
  return (
    <div className="dashboard-panel">
      <h3>Recent Activity</h3>

      <ul className="activity-list">
        {activities.map((item) => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}