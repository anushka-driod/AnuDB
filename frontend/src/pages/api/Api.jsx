import { useState } from "react";

import ApiSearch from "../../components/api/ApiSearch";
import ApiTable from "../../components/api/ApiTable";
import GenerateApiModal from "../../components/api/GenerateApiModal";
import FloatingButton from "../../components/dashboard/FloatingButton";

export default function Api() {

  const [open, setOpen] = useState(false);

  return (

    <div className="api-page">

      <div className="page-header">

        <div>

          <h1>API Management</h1>

          <p>
            Generate and manage REST APIs.
          </p>

        </div>

      </div>

      <ApiSearch
        onGenerate={() => setOpen(true)}
      />

      <ApiTable />

      <FloatingButton />

      <GenerateApiModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </div>

  );

}