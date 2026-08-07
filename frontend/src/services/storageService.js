import api from "./api";

export const uploadBackup = (formData) =>
  api.post("/storage/upload", formData);

export const getBackups = () =>
  api.get("/storage");