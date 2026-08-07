import api from "./api";

export const generateApi = (data) =>
  api.post("/generate-api", data);

export const getApis = () =>
  api.get("/generate-api");