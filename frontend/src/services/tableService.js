import api from "./api";

export const getTables = () =>
  api.get("/tables");

export const createTable = (data) =>
  api.post("/tables", data);

export const deleteTable = (id) =>
  api.delete(`/tables/${id}`);