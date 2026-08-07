import { useState } from "react";

import TableSearch from "../../components/tables/TableSearch";
import TableList from "../../components/tables/TableList";
import CreateTableModal from "../../components/tables/CreateTableModal";
import FloatingButton from "../../components/dashboard/FloatingButton";

export default function Tables() {

  const [open, setOpen] = useState(false);

  return (
    <div className="tables-page">

      <div className="page-header">

        <div>
          <h1>Tables</h1>

          <p>
            Create and manage database tables.
          </p>
        </div>

      </div>

      <TableSearch
        onCreateTable={() => setOpen(true)}
      />

      <TableList />

      <FloatingButton />

      <CreateTableModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}