import api from "./api";

export const getRecords = (tableId) =>
  api.get(`/records/${tableId}`);

export const createRecord = (data) =>
  api.post("/records", data);

export const updateRecord = (id, data) =>
  api.put(`/records/${id}`, data);

export const deleteRecord = (id) =>
  api.delete(`/records/${id}`);