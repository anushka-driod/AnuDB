import {
  FiEye,
  FiCopy,
  FiTrash2,
} from "react-icons/fi";

export default function ApiTable({
  apis = [],
  onDelete,
  onCopy,
}) {
  return (
    <div className="dashboard-panel">

      <table className="database-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Endpoint</th>
            <th>Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {apis.length === 0 ? (

            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                No APIs found.
              </td>
            </tr>

          ) : (

            apis.map((item) => (

              <tr key={item.id}>

                <td>{item.name}</td>

                <td>{item.endpoint}</td>

                <td>{item.method}</td>

                <td>
                  <span
                    className={
                      item.status === "Active"
                        ? "badge-active"
                        : "badge-pending"
                    }
                  >
                    {item.status}
                  </span>
                </td>

                <td>

                  <div className="table-actions">

                    <button
                      className="table-action-btn view-btn"
                      title="View"
                      onClick={() =>
                        alert(item.endpoint)
                      }
                    >
                      <FiEye />
                    </button>

                    <button
                      className="table-action-btn edit-btn"
                      title="Copy Endpoint"
                      onClick={() =>
                        onCopy(item.endpoint)
                      }
                    >
                      <FiCopy />
                    </button>

                    <button
                      className="table-action-btn delete-btn"
                      title="Delete"
                      onClick={() =>
                        onDelete(item.id)
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