import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ColumnList from "../../components/columns/ColumnList";
import CreateColumnModal from "../../components/columns/CreateColumnModal";

import { useDatabase } from "../../context/DatabaseContext";

import { getTables } from "../../services/tableService";

import {
  getColumns,
  createColumn,
  updateColumn,
  deleteColumn,
} from "../../services/columnService";

export default function Columns() {

  const { databases } = useDatabase();

  const [databaseId, setDatabaseId] = useState("");
  const [tableId, setTableId] = useState("");

  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState([]);

  const [open, setOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);

  const [loading, setLoading] = useState(false);

  // ==============================
  // LOAD TABLES
  // ==============================

  useEffect(() => {

    const loadTables = async () => {

      if (!databaseId) {
        setTables([]);
        setTableId("");
        setColumns([]);
        return;
      }

      try {

        const response = await getTables(databaseId);

        if (response.data.success) {
          setTables(response.data.tables || []);
        }

      } catch (error) {

        console.error(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to load tables."
        );

      }

    };

    loadTables();

  }, [databaseId]);


  // ==============================
  // LOAD COLUMNS
  // ==============================

  useEffect(() => {

    const loadColumns = async () => {

      if (!tableId) {
        setColumns([]);
        return;
      }

      try {

        setLoading(true);

        const response = await getColumns(tableId);

        if (response.data.success) {
          setColumns(response.data.columns || []);
        }

      } catch (error) {

        console.error(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to load columns."
        );

      } finally {

        setLoading(false);

      }

    };

    loadColumns();

  }, [tableId]);


  // ==============================
  // REFRESH COLUMNS
  // ==============================

  const refreshColumns = async () => {

    if (!tableId) return;

    try {

      const response = await getColumns(tableId);

      if (response.data.success) {
        setColumns(response.data.columns || []);
      }

    } catch (error) {

      console.error(error);

      toast.error("Failed to refresh columns.");

    }

  };


  // ==============================
  // CREATE / UPDATE COLUMN
  // ==============================

  const handleSaveColumn = async (data) => {

    try {

      if (editingColumn) {

        await updateColumn(
          editingColumn.id,
          data
        );

        toast.success(
          "Column updated successfully."
        );

      } else {

        await createColumn({
          tableId: Number(tableId),
          ...data,
        });

        toast.success(
          "Column created successfully."
        );

      }

      setOpen(false);
      setEditingColumn(null);

      await refreshColumns();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to save column."
      );

      throw error;
    }

  };


  // ==============================
  // DELETE COLUMN
  // ==============================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this column?"
    );

    if (!confirmed) return;

    try {

      await deleteColumn(id);

      toast.success(
        "Column deleted successfully."
      );

      await refreshColumns();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete column."
      );

    }

  };


  // ==============================
  // OPEN CREATE MODAL
  // ==============================

  const handleCreate = () => {

    if (!tableId) {

      toast.error(
        "Please select a table first."
      );

      return;
    }

    setEditingColumn(null);
    setOpen(true);

  };


  // ==============================
  // OPEN EDIT MODAL
  // ==============================

  const handleEdit = (column) => {

    setEditingColumn(column);
    setOpen(true);

  };


  return (

    <div className="tables-page">

      {/* HEADER */}

      <div className="page-header">

        <div>

          <h1>Columns</h1>

          <p>
            Create and manage columns inside your tables.
          </p>

        </div>

      </div>


      {/* DATABASE SELECT */}

      <div style={{ marginBottom: "15px" }}>

        <select
          value={databaseId}
          onChange={(e) => {

            setDatabaseId(e.target.value);
            setTableId("");

          }}
          style={{
            padding: "12px",
            width: "280px",
          }}
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

      </div>


      {/* TABLE SELECT */}

      <div style={{ marginBottom: "20px" }}>

        <select
          value={tableId}
          onChange={(e) =>
            setTableId(e.target.value)
          }
          disabled={!databaseId}
          style={{
            padding: "12px",
            width: "280px",
          }}
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

      </div>


      {/* NEW COLUMN */}

      <button
        className="new-db-btn"
        onClick={handleCreate}
      >
        + New Column
      </button>


      {/* COLUMN LIST */}

      <div style={{ marginTop: "20px" }}>

        {loading ? (

          <p>Loading columns...</p>

        ) : (

          <ColumnList
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        )}

      </div>


      {/* CREATE / EDIT MODAL */}

      <CreateColumnModal
        open={open}
        onClose={() => {

          setOpen(false);
          setEditingColumn(null);

        }}
        onSave={handleSaveColumn}
        editingColumn={editingColumn}
      />

    </div>

  );
}