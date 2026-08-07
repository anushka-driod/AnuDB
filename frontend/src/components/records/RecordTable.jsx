import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const records = [

  {
    id: 1,
    name: "Rahul",
    email: "rahul@gmail.com",
    age: 21,
  },

  {
    id: 2,
    name: "Anjali",
    email: "anjali@gmail.com",
    age: 22,
  },

  {
    id: 3,
    name: "Ravi",
    email: "ravi@gmail.com",
    age: 20,
  },

];

export default function RecordTable() {

  return (

    <div className="dashboard-panel">

      <table className="database-table">

        <thead>

          <tr>

            <th>ID</th>

            <th>Name</th>

            <th>Email</th>

            <th>Age</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {records.map((record) => (

            <tr key={record.id}>

              <td>{record.id}</td>

              <td>{record.name}</td>

              <td>{record.email}</td>

              <td>{record.age}</td>

              <td>

                <div className="table-actions">

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