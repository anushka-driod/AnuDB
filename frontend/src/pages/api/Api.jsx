import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ApiSearch from "../../components/api/ApiSearch";
import ApiTable from "../../components/api/ApiTable";
import GenerateApiModal from "../../components/api/GenerateApiModal";
import FloatingButton from "../../components/dashboard/FloatingButton";

import { useDatabase } from "../../context/DatabaseContext";

import {
  getApis,
  createApi,
  deleteApi,
} from "../../services/apiService";

export default function Api() {

  const {
    databases,
    loadDatabases,
  } = useDatabase();

  const [apis, setApis] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);


  // Load databases
  useEffect(() => {
    loadDatabases();
  }, []);


  // Load APIs
  useEffect(() => {
    loadApis();
  }, []);


  const loadApis = async () => {

    try {

      const response = await getApis();

      if (response.data.success) {
        setApis(response.data.apis || []);
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load APIs."
      );

    }
  };


  const handleCreate = async (data) => {

    try {

      await createApi(data);

      toast.success("API generated successfully.");

      setOpen(false);

      await loadApis();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to generate API."
      );

      throw error;
    }
  };


  const handleDelete = async (id) => {

    if (!window.confirm("Delete this API?")) {
      return;
    }

    try {

      await deleteApi(id);

      toast.success("API deleted successfully.");

      await loadApis();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete API."
      );
    }
  };


  const handleCopy = async (endpoint) => {

    try {

      await navigator.clipboard.writeText(endpoint);

      toast.success("Endpoint copied.");

    } catch {

      toast.error("Failed to copy endpoint.");
    }
  };


  const filteredApis = apis.filter((item) =>
    item.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );


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
        search={search}
        setSearch={setSearch}
        onGenerate={() => setOpen(true)}
      />


      <ApiTable
        apis={filteredApis}
        onDelete={handleDelete}
        onCopy={handleCopy}
      />


      <FloatingButton />


      <GenerateApiModal
        open={open}
        onClose={() => setOpen(false)}
        databases={databases}
        onSave={handleCreate}
      />

    </div>
  );
}