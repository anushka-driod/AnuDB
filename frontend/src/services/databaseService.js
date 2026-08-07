import api from "./api";

export const getDatabases = () => api.get("/databases");

export const createDatabase = (data) =>
  api.post("/databases", data);

export const updateDatabase = (id, data) =>
  api.put(`/databases/${id}`, data);

export const deleteDatabase = (id) =>
  api.delete(`/databases/${id}`);