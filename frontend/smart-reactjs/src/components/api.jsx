// src/components/api.jsx
import axios from "axios";

// ✅ Konfigurasi dasar
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // URL backend Laravel
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Interceptor untuk token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor respon (opsional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ✅ Fungsi untuk ambil CSRF cookie (wajib sebelum login di Sanctum)
export const getCsrf = () => api.get("/sanctum/csrf-cookie");

// ✅ Endpoint Auth
export const loginUser = (data) => api.post("/api/login", data);
export const forgotPassword = (data) => api.post("/api/forgot-password", data);
export const logoutUser = () => api.post("/api/logout");

// ✅ Export default untuk dipakai global
export default api;
