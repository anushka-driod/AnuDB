import { useState } from "react";

import StorageCards from "../../components/storage/StorageCards";
import StorageChart from "../../components/storage/StorageChart";
import StorageFiles from "../../components/storage/StorageFiles";
import UploadBackupModal from "../../components/storage/UploadBackupModal";
import FloatingButton from "../../components/dashboard/FloatingButton";

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

      </div>

      <StorageCards />

      <StorageChart />

      <StorageFiles />

      <FloatingButton />

      <UploadBackupModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </div>

  );

}