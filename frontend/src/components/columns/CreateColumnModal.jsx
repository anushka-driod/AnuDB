import { useEffect, useState } from "react";

export default function CreateColumnModal({
  open,
  onClose,
  onSave,
  editingColumn,
}) {

  const [columnName, setColumnName] = useState("");
  const [dataType, setDataType] = useState("VARCHAR");
  const [isRequired, setIsRequired] = useState(false);

  useEffect(() => {

    if (editingColumn) {
      setColumnName(editingColumn.column_name || "");
      setDataType(editingColumn.data_type || "VARCHAR");
      setIsRequired(editingColumn.is_required || false);
    } else {
      setColumnName("");
      setDataType("VARCHAR");
      setIsRequired(false);
    }

  }, [editingColumn, open]);

  if (!open) return null;

  const handleSubmit = async () => {

    if (!columnName.trim()) {
      alert("Column name is required");
      return;
    }

    await onSave({
      columnName,
      dataType,
      isRequired,
    });

    onClose();
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

        <h2>
          {editingColumn ? "Edit Column" : "Create Column"}
        </h2>

        <input
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
          placeholder="Column Name"
        />

        <select
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <option value="VARCHAR">VARCHAR</option>
          <option value="TEXT">TEXT</option>
          <option value="INTEGER">INTEGER</option>
          <option value="BOOLEAN">BOOLEAN</option>
          <option value="DATE">DATE</option>
          <option value="TIMESTAMP">TIMESTAMP</option>
        </select>

        <label style={{ marginTop: "20px" }}>
          <input
            type="checkbox"
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
          />

          {" "}Required
        </label>

        <button
          className="create-btn"
          onClick={handleSubmit}
        >
          {editingColumn ? "Update Column" : "Create Column"}
        </button>

      </div>

    </div>
  );
}