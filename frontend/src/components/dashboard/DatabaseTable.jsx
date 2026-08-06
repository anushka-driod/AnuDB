import { useState } from "react";
import { FiDatabase } from "react-icons/fi";

import DatabaseModal from "../database/DatabaseModal";
import { useDatabase } from "../../context/DatabaseContext";

export default function DatabaseTable() {

  const [open, setOpen] = useState(false);

  const { databases } = useDatabase();

  return (
    <>
      <div className="dashboard-panel">

        <div className="table-header">

          <h3>Databases</h3>

          <button
            className="new-db-btn"
            onClick={() => setOpen(true)}
          >
            + New Database
          </button>

        </div>

        <table className="database-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Tables</th>
              <th>Storage</th>
              <th>Status</th>
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

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <DatabaseModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </>
  );
}