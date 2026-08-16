import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import RecordSearch from "../../components/records/RecordSearch";
import RecordTable from "../../components/records/RecordTable";
import CreateRecordModal from "../../components/records/CreateRecordModal";

import { useDatabase } from "../../context/DatabaseContext";
import { getTables } from "../../services/tableService";
import { getColumns } from "../../services/columnService";

import {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord,
} from "../../services/recordService";

export default function Records() {

  const { databases } = useDatabase();

  const [databaseId, setDatabaseId] = useState("");
  const [tableId, setTableId] = useState("");

  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);

  const [open, setOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Load tables
  useEffect(() => {

    const loadTables = async () => {

      if (!databaseId) {
        setTables([]);
        setTableId("");
        setColumns([]);
        setRecords([]);
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


  // Load columns
  useEffect(() => {

    const loadColumns = async () => {

      if (!tableId) {
        setColumns([]);
        setRecords([]);
        return;
      }

      try {

        const response = await getColumns(tableId);

        if (response.data.success) {
          setColumns(response.data.columns || []);
        }

      } catch (error) {

        console.error(error);

        toast.error("Failed to load columns.");
      }
    };

    loadColumns();

  }, [tableId]);


  // Load records
  useEffect(() => {

    const loadRecords = async () => {

      if (!tableId) {
        setRecords([]);
        return;
      }

      try {

        setLoading(true);

        const response = await getRecords(
          tableId,
          {
            search,
          }
        );

        if (response.data.success) {
          setRecords(response.data.records || []);
        }

      } catch (error) {

        console.error(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to load records."
        );

      } finally {

        setLoading(false);
      }
    };

    loadRecords();

  }, [tableId, search]);


  // Create / Update
  const handleSave = async (values) => {

    try {

      if (editingRecord) {

        await updateRecord(
          editingRecord.recordId,
          { values }
        );

        toast.success("Record updated successfully.");

      } else {

        await createRecord({
          tableId: Number(tableId),
          values,
        });

        toast.success("Record created successfully.");
      }

      setOpen(false);
      setEditingRecord(null);

      const response = await getRecords(tableId);

      if (response.data.success) {
        setRecords(response.data.records || []);
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to save record."
      );

      throw error;
    }
  };


  // Delete
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this record?")) {
      return;
    }

    try {

      await deleteRecord(id);

      toast.success("Record deleted successfully.");

      const response = await getRecords(tableId);

      if (response.data.success) {
        setRecords(response.data.records || []);
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete record."
      );
    }
  };


  return (
    <div className="records-page">

      <div className="page-header">

        <div>

          <h1>Records</h1>

          <p>
            Manage records inside your database tables.
          </p>

        </div>

      </div>


      {/* DATABASE */}

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


      {/* TABLE */}

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


      {/* SEARCH + ADD */}

      <RecordSearch
        onCreateRecord={() => {

          if (!tableId) {
            toast.error("Please select a table first.");
            return;
          }

          if (columns.length === 0) {
            toast.error("Create columns first.");
            return;
          }

          setEditingRecord(null);
          setOpen(true);
        }}
        search={search}
        setSearch={setSearch}
      />


      {/* RECORD TABLE */}

      <div style={{ marginTop: "20px" }}>

        {loading ? (

          <p>Loading records...</p>

        ) : (

          <RecordTable
            records={records}
            columns={columns}
            onEdit={(record) => {
              setEditingRecord(record);
              setOpen(true);
            }}
            onDelete={handleDelete}
          />

        )}

      </div>


      {/* MODAL */}

      <CreateRecordModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingRecord(null);
        }}
        columns={columns}
        editingRecord={editingRecord}
        onSave={handleSave}
      />

    </div>
  );
}