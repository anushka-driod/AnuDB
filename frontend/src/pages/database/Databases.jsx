import { useMemo, useState } from "react";
import DatabaseSearch from "../../components/database/DatabaseSearch";
import DatabaseTable from "../../components/dashboard/DatabaseTable";
import DatabaseModal from "../../components/database/DatabaseModal";
import FloatingButton from "../../components/dashboard/FloatingButton";

export default function Databases() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

const [status, setStatus] = useState("All");

const [sort, setSort] = useState("A-Z");

  return (
    <div className="databases-page">

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
      <DatabaseTable />

      <FloatingButton />

      <DatabaseModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}