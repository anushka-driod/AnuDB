import { useState } from "react";

import StorageCards from "../../components/storage/StorageCards";
import StorageChart from "../../components/storage/StorageChart";
import StorageFiles from "../../components/storage/StorageFiles";
import UploadBackupModal from "../../components/storage/UploadBackupModal";

export default function Storage() {

  const [open, setOpen] = useState(false);

  return (

    <div className="storage-page">

      <div className="page-header">

        <div>

          <h1>Storage</h1>

          <p>
            Manage backups and storage usage.
          </p>

        </div>

        <button
          className="new-db-btn"
          onClick={() => setOpen(true)}
        >
          + Upload Backup
        </button>

      </div>


      <StorageCards />

      <StorageChart />

      <StorageFiles />



      <UploadBackupModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </div>

  );
}