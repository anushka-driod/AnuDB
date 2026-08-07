const databases = [
  {
    name: "School",
    queries: "1.2M",
  },
  {
    name: "Hospital",
    queries: "950K",
  },
  {
    name: "CRM",
    queries: "620K",
  },
];

export default function TopDatabases() {
  return (
    <div className="dashboard-panel">

      <h3>Top Databases</h3>

      <table className="database-table">

        <thead>
          <tr>
            <th>Database</th>
            <th>Queries</th>
          </tr>
        </thead>

        <tbody>
          {databases.map((db) => (
            <tr key={db.name}>
              <td>{db.name}</td>
              <td>{db.queries}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}