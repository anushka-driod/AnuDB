import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const tables = [
  {
    name: "Students",
    database: "School",
    records: 240,
    columns: 6,
  },
  {
    name: "Teachers",
    database: "School",
    records: 42,
    columns: 8,
  },
  {
    name: "Patients",
    database: "Hospital",
    records: 1250,
    columns: 12,
  },
];

export default function TableList() {
  return (

    <div className="dashboard-panel">

      <table className="database-table">

        <thead>

          <tr>
            <th>Table Name</th>
            <th>Database</th>
            <th>Records</th>
            <th>Columns</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {tables.map((table) => (

            <tr key={table.name}>

              <td>{table.name}</td>

              <td>{table.database}</td>

              <td>{table.records}</td>

              <td>{table.columns}</td>

              <td>

                <div className="table-actions">

                  <button className="table-action-btn view-btn">
                    <FiEye />
                  </button>

                  <button className="table-action-btn edit-btn">
                    <FiEdit2 />
                  </button>

                  <button className="table-action-btn delete-btn">
                    <FiTrash2 />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}