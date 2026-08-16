import api from "./api";

export const getTables = (databaseId) =>
  api.get(`/tables/${databaseId}`);

export const createTable = (data) =>
  api.post("/tables", data);

export const deleteTable = (id) =>
  api.delete(`/tables/${id}`);