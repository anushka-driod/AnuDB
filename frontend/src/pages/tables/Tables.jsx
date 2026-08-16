import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TableSearch from "../../components/tables/TableSearch";
import TableList from "../../components/tables/TableList";
import CreateTableModal from "../../components/tables/CreateTableModal";


import { getTables, deleteTable } from "../../services/tableService";
import { useDatabase } from "../../context/DatabaseContext";

export default function Tables() {

  const { databases } = useDatabase();

  const [open, setOpen] = useState(false);

  const [tables, setTables] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedDatabase, setSelectedDatabase] = useState("");

  // =========================
  // LOAD TABLES
  // =========================

  const loadTables = async () => {

    if (!selectedDatabase) {
      setTables([]);
      return;
    }

    try {

      const response = await getTables(
        selectedDatabase
      );

      if (response.data.success) {

        setTables(
          response.data.tables || []
        );
      }

    } catch (error) {

      console.error(
        "Failed to load tables:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load tables"
      );
    }
  };

  // Load whenever database changes

  useEffect(() => {

    loadTables();

  }, [selectedDatabase]);

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this table?"
    );

    if (!confirmed) {
      return;
    }

    try {

      await deleteTable(id);

      toast.success(
        "Table deleted successfully"
      );

      loadTables();

    } catch (error) {

      console.error(
        "Delete table error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to delete table"
      );
    }
  };

  // =========================
  // SEARCH
  // =========================

  const filteredTables = tables.filter(
    (table) =>
      table.table_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  // =========================
  // CREATE TABLE
  // =========================

  const handleOpenCreate = () => {

    if (!selectedDatabase) {

      toast.error(
        "Please select a database first."
      );

      return;
    }

    setOpen(true);
  };

  return (

    <div className="tables-page">

      {/* HEADER */}

      <div className="page-header">

        <div>

          <h1>Tables</h1>

          <p>
            Create and manage database tables.
          </p>

        </div>

      </div>

      {/* DATABASE SELECTOR */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >

        <select
          value={selectedDatabase}
          onChange={(e) =>
            setSelectedDatabase(e.target.value)
          }
          style={{
            padding: "14px",
            borderRadius: "10px",
            width: "280px",
            background: "#1E293B",
            color: "white",
            border: "1px solid #334155",
            fontSize: "16px",
          }}
        >

          <option value="">
            Select Database
          </option>

          {databases.map((database) => (

            <option
              key={database.id}
              value={database.id}
            >
              {database.name}
            </option>

          ))}

        </select>

      </div>

      {/* SEARCH */}

      <TableSearch
        search={search}
        setSearch={setSearch}
        onCreateTable={handleOpenCreate}
      />

      {/* TABLE LIST */}

      <TableList
        databases={databases}
        tables={filteredTables}
        onDelete={handleDelete}
      />


      {/* CREATE MODAL */}

      <CreateTableModal
        open={open}
        onClose={() => setOpen(false)}
        databaseId={selectedDatabase}
        onCreated={loadTables}
      />

    </div>
  );
}