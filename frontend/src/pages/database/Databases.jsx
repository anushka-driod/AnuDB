import { useEffect, useMemo, useState } from "react";

import DatabaseSearch from "../../components/database/DatabaseSearch";
import DatabaseTable from "../../components/dashboard/DatabaseTable";
import DatabaseModal from "../../components/database/DatabaseModal";
import FloatingButton from "../../components/dashboard/FloatingButton";
import Pagination from "../../components/common/Pagination";

import { useDatabase } from "../../context/DatabaseContext";

export default function Databases() {
  const { databases, loading, loadDatabases } = useDatabase();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("A-Z");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadDatabases();
  }, []);

  const filteredDatabases = useMemo(() => {
    let result = [...databases];

    // Search
    if (search.trim()) {
      result = result.filter((db) =>
        db.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Status
    if (status !== "All") {
      result = result.filter(
        (db) => (db.status || "Active") === status
      );
    }

    // Sort
    result.sort((a, b) => {
      const nameA = a.name?.toLowerCase() || "";
      const nameB = b.name?.toLowerCase() || "";

      return sort === "A-Z"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

    return result;
  }, [databases, search, status, sort]);

  const itemsPerPage = 5;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDatabases.length / itemsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * itemsPerPage;

  const paginatedDatabases = filteredDatabases.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Databases</h1>

          <p>
            Manage all your cloud databases from one place.
          </p>
        </div>
      </div>

      <DatabaseSearch
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        status={status}
        setStatus={(value) => {
          setStatus(value);
          setCurrentPage(1);
        }}
        sort={sort}
        setSort={(value) => {
          setSort(value);
          setCurrentPage(1);
        }}
        onCreateDatabase={() => setOpen(true)}
      />

      {loading ? (
        <p style={{ padding: "30px" }}>
          Loading databases...
        </p>
      ) : (
        <DatabaseTable databases={paginatedDatabases} />
      )}

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <FloatingButton />

      <DatabaseModal
        open={open}
        onClose={() => {
          setOpen(false);
          loadDatabases();
        }}
      />
    </>
  );
}