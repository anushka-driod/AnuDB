import api from "./api";

export const getColumns = (tableId) =>
  api.get(`/columns/${tableId}`);

export const createColumn = (data) =>
  api.post("/columns", data);

export const updateColumn = (id, data) =>
  api.put(`/columns/${id}`, data);

export const deleteColumn = (id) =>
  api.delete(`/columns/${id}`);