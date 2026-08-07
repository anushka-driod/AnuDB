import { useState } from "react";

import RecordSearch from "../../components/records/RecordSearch";
import RecordTable from "../../components/records/RecordTable";
import CreateRecordModal from "../../components/records/CreateRecordModal";
import FloatingButton from "../../components/dashboard/FloatingButton";

export default function Records() {

  const [open, setOpen] = useState(false);

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

      <RecordSearch
        onCreateRecord={() => setOpen(true)}
      />

      <RecordTable />

      <FloatingButton />

      <CreateRecordModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </div>

  );
}