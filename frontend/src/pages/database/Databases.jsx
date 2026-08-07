import { useState } from "react";

import DatabaseSearch from "../../components/database/DatabaseSearch";
import DatabaseTable from "../../components/dashboard/DatabaseTable";
import DatabaseModal from "../../components/database/DatabaseModal";
import FloatingButton from "../../components/dashboard/FloatingButton";
import Pagination from "../../components/common/Pagination";

export default function Databases() {

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [sort, setSort] = useState("A-Z");

  const [currentPage, setCurrentPage] = useState(1);

  const databases = [
    {
      name: "School",
      storage: "2.4 GB",
      tables: 12,
      status: "Active",
    },
    {
      name: "Hospital",
      storage: "8.1 GB",
      tables: 21,
      status: "Active",
    },
    {
      name: "CRM",
      storage: "620 MB",
      tables: 6,
      status: "Pending",
    },
    {
      name: "Sales",
      storage: "5.2 GB",
      tables: 18,
      status: "Active",
    },
    {
      name: "Inventory",
      storage: "1.1 GB",
      tables: 9,
      status: "Pending",
    },
    {
      name: "Library",
      storage: "800 MB",
      tables: 7,
      status: "Active",
    },
  ];

  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedDatabases = databases.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(
    databases.length / itemsPerPage
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
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        onCreateDatabase={() => setOpen(true)}
      />

      <DatabaseTable
        databases={paginatedDatabases}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <FloatingButton />

      <DatabaseModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}