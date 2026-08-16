import api from "./api";

// Upload CSV
export const uploadCSV = (file, tableId) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("tableId", tableId);

  return api.post("/import/csv/save", formData);
};


// Upload Excel
export const uploadExcel = (file, tableId) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("tableId", tableId);

  return api.post("/import/excel/save", formData);
};


// Export CSV
export const exportCSV = (tableId) =>
  api.get(`/export/csv/${tableId}`, {
    responseType: "blob",
  });


// Export Excel
export const exportExcel = (tableId) =>
  api.get(`/export/excel/${tableId}`, {
    responseType: "blob",
  });


// Get stored files
export const getStorageFiles = () =>
  api.get("/storage/files");


// Get storage statistics
export const getStorageStats = () =>
  api.get("/storage/stats");


// Download stored file
export const downloadFile = (fileName) =>
  api.get(
    `/storage/download/${encodeURIComponent(fileName)}`,
    {
      responseType: "blob",
    }
  );


// Delete stored file
export const deleteStorageFile = (fileName) =>
  api.delete(
    `/storage/files/${encodeURIComponent(fileName)}`
  );