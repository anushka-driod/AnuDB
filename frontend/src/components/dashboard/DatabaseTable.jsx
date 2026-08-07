import { useState } from "react";
import {
  FiDatabase,
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { useDatabase } from "../../context/DatabaseContext";

export default function DatabaseTable() {

  const { databases } = useDatabase();

  return (
    <>
      <div className="dashboard-panel">

       <div className="table-header">
  <h3>Databases</h3>
</div>

        <table className="database-table">
<thead>
  <tr>
    <th>Name</th>
    <th>Tables</th>
    <th>Storage</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>

          <tbody>

            {databases.map((db) => (

              <tr key={db.id}>

                <td>
                  <FiDatabase />
                  <span style={{ marginLeft: "10px" }}>
                    {db.name}
                  </span>
                </td>

                <td>{db.tables}</td>

                <td>{db.storage}</td>

                <td>
  <span
    className={
      db.status === "Active"
        ? "badge-active"
        : "badge-pending"
    }
  >
    {db.status}
  </span>
</td>

<td>
  <div className="table-actions">

    <button
      className="table-action-btn view-btn"
      title="View"
      onClick={() => alert(`Viewing ${db.name}`)}
    >
      <FiEye />
    </button>

    <button
      className="table-action-btn edit-btn"
      title="Edit"
      onClick={() => alert(`Editing ${db.name}`)}
    >
      <FiEdit2 />
    </button>

    <button
      className="table-action-btn delete-btn"
      title="Delete"
      onClick={() => alert(`Deleting ${db.name}`)}
    >
      <FiTrash2 />
    </button>

  </div>
</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>
  );
}