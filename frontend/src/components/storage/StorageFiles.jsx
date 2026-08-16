import { useEffect, useState } from "react";

import {
  FiDownload,
  FiTrash2,
} from "react-icons/fi";

import toast from "react-hot-toast";

import {
  getStorageFiles,
  downloadFile,
  deleteStorageFile,
} from "../../services/storageService";


export default function StorageFiles() {

  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {

    try {

      setLoading(true);

      const response =
        await getStorageFiles();

      if (response.data.success) {

        setFiles(
          response.data.files || []
        );

      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load files."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadFiles();

  }, []);


  const formatSize = (bytes) => {

    if (!bytes || bytes === 0) {
      return "0 B";
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
      return `${(
        bytes /
        (1024 * 1024)
      ).toFixed(1)} MB`;
    }

    return `${(
      bytes /
      (1024 * 1024 * 1024)
    ).toFixed(2)} GB`;
  };


  const formatDate = (date) => {

    return new Date(date)
      .toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
  };


  const handleDownload = async (fileName) => {

    try {

      const response =
        await downloadFile(fileName);

      const blob =
        new Blob(
          [response.data],
          {
            type:
              response.headers[
                "content-type"
              ] || "application/octet-stream",
          }
        );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success(
        "File downloaded successfully."
      );
      setTimeout(() => {

  window.dispatchEvent(
    new Event("storageStatsUpdated")
  );

}, 500);

    } catch (error) {

      console.error(
        "Download error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to download file."
      );

    }
  };


  const handleDelete = async (fileName) => {

    const confirmed =
      window.confirm(
        `Delete ${fileName}?`
      );

    if (!confirmed) {
      return;
    }

    try {

      await deleteStorageFile(
        fileName
      );

      toast.success(
        "File deleted successfully."
      );

      loadFiles();

    } catch (error) {

      console.error(
        "Delete error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to delete file."
      );

    }
  };


  return (

    <div className="dashboard-panel">

      <h2>
        Stored Files
      </h2>

      {loading ? (

        <p>
          Loading files...
        </p>

      ) : files.length === 0 ? (

        <p>
          No stored files found.
        </p>

      ) : (

        <table className="database-table">

          <thead>

            <tr>

              <th>File</th>
              <th>Size</th>
              <th>Date</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {files.map((file) => (

              <tr key={file.name}>

                <td>
                  {file.name}
                </td>

                <td>
                  {formatSize(
                    file.size
                  )}
                </td>

                <td>
                  {formatDate(
                    file.date
                  )}
                </td>

                <td>

                  <div className="table-actions">

                    <button
                      className="table-action-btn view-btn"
                      onClick={() =>
                        handleDownload(
                          file.name
                        )
                      }
                      title="Download"
                    >
                      <FiDownload />
                    </button>

                    <button
                      className="table-action-btn delete-btn"
                      onClick={() =>
                        handleDelete(
                          file.name
                        )
                      }
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );
}