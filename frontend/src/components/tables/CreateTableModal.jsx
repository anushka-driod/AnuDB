import { useState } from "react";
import toast from "react-hot-toast";

import { createTable } from "../../services/tableService";

export default function CreateTableModal({
  open,
  onClose,
  databaseId,
  onCreated,
}) {
  const [tableName, setTableName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleCreate = async () => {

    // IMPORTANT: database must be selected
    if (!databaseId) {
      toast.error("Please select a database first.");
      return;
    }

    if (!tableName.trim()) {
      toast.error("Please enter a table name.");
      return;
    }

    try {
      setLoading(true);

      console.log("Creating table with:", {
        databaseId,
        tableName: tableName.trim(),
      });

      const response = await createTable({
        databaseId: Number(databaseId),
        tableName: tableName.trim(),
      });

      if (response.data.success) {
        toast.success("Table created successfully!");

        setTableName("");

        onClose();

        if (onCreated) {
          onCreated();
        }
      }

    } catch (error) {

      console.error(
        "Create table error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to create table."
      );

    } finally {
      setLoading(false);
    }
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

        <h2>Create Table</h2>

        {/* Selected database */}

        <p style={{ marginBottom: "10px" }}>
          Database ID:{" "}
          <strong>
            {databaseId || "Not selected"}
          </strong>
        </p>

        <input
          value={tableName}
          onChange={(e) =>
            setTableName(e.target.value)
          }
          placeholder="Table Name"
        />

        <button
          className="create-btn"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Table"}
        </button>

      </div>

    </div>
  );
}