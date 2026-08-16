import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Let the browser set multipart/form-data
    // automatically when sending FormData.
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
export const getProfile = () =>
  api.get("/auth/profile");
export default api;