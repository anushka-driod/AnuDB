import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ColumnList({
  columns = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="dashboard-panel">

      <table className="database-table">

        <thead>
          <tr>
            <th>Column Name</th>
            <th>Data Type</th>
            <th>Required</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {columns.length === 0 ? (

            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                No columns found.
              </td>
            </tr>

          ) : (

            columns.map((column) => (

              <tr key={column.id}>

                <td>{column.column_name}</td>

                <td>{column.data_type}</td>

                <td>
                  {column.is_required ? "Yes" : "No"}
                </td>

                <td>

                  <div className="table-actions">

                    <button
                      className="table-action-btn edit-btn"
                      title="Edit"
                      onClick={() => onEdit(column)}
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      className="table-action-btn delete-btn"
                      title="Delete"
                      onClick={() => onDelete(column.id)}
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

    </div>
  );
}