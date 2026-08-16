import { useEffect, useState } from "react";

import { getTables } from "../../services/tableService";

export default function GenerateApiModal({
  open,
  onClose,
  databases = [],
  onSave,
}) {

  const [databaseId, setDatabaseId] = useState("");
  const [tables, setTables] = useState([]);

  const [tableId, setTableId] = useState("");
  const [name, setName] = useState("");
  const [method, setMethod] = useState("GET");

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    const loadTables = async () => {

      if (!databaseId) {
        setTables([]);
        setTableId("");
        return;
      }

      try {

        setLoading(true);

        const response = await getTables(databaseId);

        if (response.data.success) {
          setTables(response.data.tables || []);
        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    loadTables();

  }, [databaseId]);


  if (!open) return null;


  const handleSubmit = async () => {

    if (!name.trim()) {
      alert("API name is required");
      return;
    }

    if (!tableId) {
      alert("Please select a table");
      return;
    }

    await onSave({
      name,
      tableId: Number(tableId),
      method,
    });

    setName("");
    setDatabaseId("");
    setTableId("");
    setMethod("GET");

  };


  return (

    <div className="modal-overlay">

      <div className="database-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Generate API</h2>


        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="API Name"
        />


        <select
          value={databaseId}
          onChange={(e) =>
            setDatabaseId(e.target.value)
          }
        >

          <option value="">
            Select Database
          </option>

          {databases.map((db) => (

            <option
              key={db.id}
              value={db.id}
            >
              {db.name}
            </option>

          ))}

        </select>


        <select
          value={tableId}
          onChange={(e) =>
            setTableId(e.target.value)
          }
          disabled={!databaseId || loading}
        >

          <option value="">
            Select Table
          </option>

          {tables.map((table) => (

            <option
              key={table.id}
              value={table.id}
            >
              {table.table_name}
            </option>

          ))}

        </select>


        <select
          value={method}
          onChange={(e) =>
            setMethod(e.target.value)
          }
        >

          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>

        </select>


        <button
          className="create-btn"
          onClick={handleSubmit}
        >
          Generate
        </button>

      </div>

    </div>
  );
}