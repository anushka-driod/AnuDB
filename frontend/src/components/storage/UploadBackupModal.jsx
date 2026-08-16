import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useDatabase } from "../../context/DatabaseContext";
import { getTables } from "../../services/tableService";
import {
  uploadCSV,
  uploadExcel,
} from "../../services/storageService";

export default function UploadBackupModal({
  open,
  onClose,
  onUploaded,
}) {

  const { databases } = useDatabase();

  const [databaseId, setDatabaseId] = useState("");
  const [tableId, setTableId] = useState("");

  const [tables, setTables] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);


  useEffect(() => {

    const loadTables = async () => {

      if (!databaseId) {
        setTables([]);
        setTableId("");
        return;
      }

      try {

        const response = await getTables(databaseId);

        if (response.data.success) {
          setTables(response.data.tables || []);
        }

      } catch (error) {

        console.error(error);

        toast.error("Failed to load tables.");
      }
    };

    loadTables();

  }, [databaseId]);


  if (!open) return null;


  const handleUpload = async () => {

    if (!databaseId) {
      toast.error("Please select a database.");
      return;
    }

    if (!tableId) {
      toast.error("Please select a table.");
      return;
    }

    if (!file) {
      toast.error("Please select a CSV or Excel file.");
      return;
    }


    const extension =
      file.name.split(".").pop().toLowerCase();


    if (!["csv", "xlsx", "xls"].includes(extension)) {
      toast.error("Only CSV and Excel files are supported.");
      return;
    }


    try {

      setUploading(true);

      let response;

      if (extension === "csv") {

        response = await uploadCSV(
          file,
          tableId
        );

      } else {

        response = await uploadExcel(
          file,
          tableId
        );

      }


      if (response.data.success) {

        toast.success(
          response.data.message ||
          "File uploaded successfully."
        );

        setDatabaseId("");
        setTableId("");
        setFile(null);

        if (onUploaded) {
          onUploaded();
        }

        onClose();

      } else {

        toast.error(
          response.data.message ||
          "Upload failed."
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Upload failed."
      );

    } finally {

      setUploading(false);
    }
  };


  return (

    <div className="modal-overlay">

      <div className="database-modal">

        <button
          className="close-btn"
          onClick={onClose}
          disabled={uploading}
        >
          ×
        </button>


        <h2>Upload Backup</h2>


        <select
          value={databaseId}
          onChange={(e) =>
            setDatabaseId(e.target.value)
          }
          disabled={uploading}
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
          disabled={
            !databaseId ||
            uploading
          }
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


        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] || null
            )
          }
          disabled={uploading}
        />


        {file && (
          <p
            style={{
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            Selected: {file.name}
          </p>
        )}


        <button
          className="create-btn"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading
            ? "Uploading..."
            : "Upload"}
        </button>

      </div>

    </div>
  );
}