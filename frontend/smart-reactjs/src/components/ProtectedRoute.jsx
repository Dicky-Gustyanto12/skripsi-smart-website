import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  // Ambil data user dari localStorage
  const user = JSON.parse(localStorage.getItem("authUser") || "null");
  const token = localStorage.getItem("authToken");

  // Jika belum login
  if (!user || !token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Jika akun belum diverifikasi
  if (user.email_verified_at === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Akun Belum Diverifikasi
        </h1>
        <p className="text-gray-700 mb-6">
          Silakan periksa email Anda untuk tautan verifikasi. 
          Jika belum menerima, hubungi admin untuk bantuan.
        </p>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Kembali ke Halaman Login
        </button>
      </div>
    );
  }

  // Jika lolos semua, render halaman anak
  return children;
}
