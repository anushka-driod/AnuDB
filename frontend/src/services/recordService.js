import api from "./api";

export const getRecords = (tableId, params = {}) =>
  api.get(`/records/${tableId}`, {
    params,
  });

export const createRecord = (data) =>
  api.post("/records", data);

export const updateRecord = (id, data) =>
  api.put(`/records/${id}`, data);

export const deleteRecord = (id) =>
  api.delete(`/records/${id}`);