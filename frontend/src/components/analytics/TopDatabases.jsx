export default function TopDatabases({ data = [] }) {

  return (
    <div className="dashboard-panel">

      <h3>Top Databases</h3>

      {data.length === 0 ? (

        <p>No databases found.</p>

      ) : (

        <table className="database-table">

          <thead>

            <tr>
              <th>Database</th>
              <th>Tables</th>
              <th>Records</th>
            </tr>

          </thead>

          <tbody>

            {data.map((database) => (

              <tr key={database.id}>

                <td>
                  {database.name}
                </td>

                <td>
                  {database.tables}
                </td>

                <td>
                  {database.records}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}