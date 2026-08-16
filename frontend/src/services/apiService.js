import api from "./api";

export const getApis = () =>
  api.get("/apis");

export const createApi = (data) =>
  api.post("/apis", data);

export const deleteApi = (id) =>
  api.delete(`/apis/${id}`);