import api from "./api";

export const getRecords = () =>
  api.get("/records");

export const createRecord = (data) =>
  api.post("/records", data);

export const deleteRecord = (id) =>
  api.delete(`/records/${id}`);