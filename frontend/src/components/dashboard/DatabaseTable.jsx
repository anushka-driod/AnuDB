import {
  FiDatabase,
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import { useDatabase } from "../../context/DatabaseContext";
import { exportToCSV } from "../../utils/exportCSV";

export default function DatabaseTable({ databases = [] }) {

  const {
    deleteDatabase,
    updateDatabase,
  } = useDatabase();

  // =========================
  // EXPORT
  // =========================

  const handleExport = () => {
    exportToCSV(databases, "AnuDB_Databases");
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (db) => {

    const confirmed = window.confirm(
      `Are you sure you want to delete "${db.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {

      await deleteDatabase(db.id);

      alert("Database deleted successfully.");

    } catch (error) {

      console.error(
        "Delete database error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete database."
      );
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = async (db) => {

    const newName = window.prompt(
      "Enter new database name:",
      db.name
    );

    if (newName === null) {
      return;
    }

    if (!newName.trim()) {
      alert("Database name cannot be empty.");
      return;
    }

    const newDescription = window.prompt(
      "Enter new description:",
      db.description || ""
    );

    if (newDescription === null) {
      return;
    }

    try {

      await updateDatabase(
        db.id,
        {
          name: newName.trim(),
          description: newDescription.trim(),
        }
      );

      alert("Database updated successfully.");

    } catch (error) {

      console.error(
        "Update database error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update database."
      );
    }
  };

  // =========================
  // VIEW
  // =========================

  const handleView = (db) => {

    alert(
      `Database: ${db.name}\n\n` +
      `Description: ${db.description || "No description"}\n` +
      `Region: ${db.region || "Mumbai"}\n` +
      `Storage: ${db.storage || "0 MB"}\n` +
      `Engine: ${db.engine || "PostgreSQL 16"}\n` +
      `Status: ${db.status || "Active"}`
    );
  };

  return (
    <>
      {/* TABLE HEADER */}

      <div className="table-header">

        <h3>Databases</h3>

        <button
          className="create-btn"
          onClick={handleExport}
        >
          Export CSV
        </button>

      </div>

      {/* TABLE */}

      <table className="database-table">

        <thead>

          <tr>
            <th>Database</th>
            <th>Tables</th>
            <th>Storage</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {/* NO DATABASES */}

          {databases.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                No databases found.
              </td>

            </tr>

          ) : (

            /* DATABASE LIST */

            databases.map((db) => (

              <tr key={db.id}>

                {/* DATABASE NAME */}

                <td>

                  <FiDatabase />

                  <span
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    {db.name}
                  </span>

                </td>

                {/* TABLE COUNT */}

                <td>
                  {db.tables ?? 0}
                </td>

                {/* STORAGE */}

                <td>
                  {db.storage ?? "0 MB"}
                </td>

                {/* STATUS */}

                <td>

                  <span
                    className={
                      (db.status || "Active") === "Active"
                        ? "badge-active"
                        : "badge-pending"
                    }
                  >
                    {db.status || "Active"}
                  </span>

                </td>

                {/* ACTIONS */}

                <td>

                  <div className="table-actions">

                    {/* VIEW */}

                    <button
                      className="table-action-btn view-btn"
                      title="View"
                      onClick={() =>
                        handleView(db)
                      }
                    >
                      <FiEye />
                    </button>

                    {/* EDIT */}

                    <button
                      className="table-action-btn edit-btn"
                      title="Edit"
                      onClick={() =>
                        handleEdit(db)
                      }
                    >
                      <FiEdit2 />
                    </button>

                    {/* DELETE */}

                    <button
                      className="table-action-btn delete-btn"
                      title="Delete"
                      onClick={() =>
                        handleDelete(db)
                      }
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>
    </>
  );
}