import { useEffect, useState } from "react";

export default function CreateRecordModal({
  open,
  onClose,
  columns = [],
  editingRecord,
  onSave,
}) {

  const [values, setValues] = useState({});

  useEffect(() => {

    if (!open) return;

    const initialValues = {};

    columns.forEach((column) => {

      initialValues[column.id] =
        editingRecord?.[column.column_name] ?? "";

    });

    setValues(initialValues);

  }, [open, columns, editingRecord]);


  if (!open) return null;


 const handleChange = (column, value) => {

  let formattedValue = value;

  if (column.data_type === "INTEGER") {
    formattedValue = value === "" ? "" : Number(value);
  }

  if (column.data_type === "DECIMAL") {
    formattedValue = value === "" ? "" : Number(value);
  }

  if (column.data_type === "BOOLEAN") {
    formattedValue = value === "true";
  }

  setValues((prev) => ({
    ...prev,
    [column.id]: formattedValue,
  }));
};


  const handleSubmit = async () => {

    const formattedValues = columns.map((column) => ({

      columnId: column.id,

      value: values[column.id] ?? "",

    }));

    await onSave(formattedValues);

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
          {editingRecord
            ? "Edit Record"
            : "Add Record"}
        </h2>


        {columns.map((column) => (

          <div
            key={column.id}
            style={{
              marginBottom: "15px",
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "6px",
              }}
            >
              {column.column_name}
              {column.is_required && " *"}
            </label>

            <input
              type={
                column.data_type === "INTEGER"
                  ? "number"
                  : "text"
              }
              value={values[column.id] ?? ""}
             onChange={(e) =>
  handleChange(
    column,
    e.target.value
  )
}
              placeholder={
                column.column_name
              }
            />

          </div>

        ))}


        <button
          className="create-btn"
          onClick={handleSubmit}
        >
          {editingRecord
            ? "Update Record"
            : "Save Record"}
        </button>

      </div>

    </div>
  );
}