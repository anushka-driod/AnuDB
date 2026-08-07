import {
  FiEye,
  FiCopy,
  FiTrash2,
} from "react-icons/fi";

const apis = [

  {
    name:"Students API",
    endpoint:"/api/students",
    method:"GET",
    status:"Active",
  },

  {
    name:"Teachers API",
    endpoint:"/api/teachers",
    method:"POST",
    status:"Active",
  },

  {
    name:"Patients API",
    endpoint:"/api/patients",
    method:"GET",
    status:"Pending",
  },

];

export default function ApiTable() {

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

          {apis.map((api)=>(

            <tr key={api.name}>

              <td>{api.name}</td>

              <td>{api.endpoint}</td>

              <td>{api.method}</td>

              <td>

                <span
                  className={
                    api.status==="Active"
                    ? "badge-active"
                    : "badge-pending"
                  }
                >
                  {api.status}
                </span>

              </td>

              <td>

                <div className="table-actions">

                  <button className="table-action-btn view-btn">
                    <FiEye/>
                  </button>

                  <button className="table-action-btn edit-btn">
                    <FiCopy/>
                  </button>

                  <button className="table-action-btn delete-btn">
                    <FiTrash2/>
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