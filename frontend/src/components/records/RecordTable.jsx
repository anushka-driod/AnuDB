import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

export default function RecordTable({
  records = [],
  columns = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="dashboard-panel">

      <table className="database-table">

        <thead>
          <tr>

            <th>ID</th>

            {columns.map((column) => (
              <th key={column.id}>
                {column.column_name}
              </th>
            ))}

            <th>Actions</th>

          </tr>
        </thead>

        <tbody>

          {records.length === 0 ? (

            <tr>
              <td
                colSpan={columns.length + 2}
                style={{
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                No records found.
              </td>
            </tr>

          ) : (

            records.map((record) => (

              <tr key={record.recordId}>

                <td>{record.recordId}</td>

                {columns.map((column) => (

                  <td key={column.id}>
                    {record[column.column_name] ?? "-"}
                  </td>

                ))}

                <td>

                  <div className="table-actions">

                    <button
                      className="table-action-btn edit-btn"
                      title="Edit"
                      onClick={() => onEdit(record)}
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      className="table-action-btn delete-btn"
                      title="Delete"
                      onClick={() =>
                        onDelete(record.recordId)
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

    </div>
  );
}