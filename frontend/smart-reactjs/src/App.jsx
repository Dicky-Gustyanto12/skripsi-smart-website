// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";

// ✅ Pages
import Login from "./pages/Login";
import EditProfil from "./pages/EditProfil";
import Dashboard from "./pages/Dashboard";
import RekapDataAlsintan from "./pages/RekapDataAlsintan";
import DataKriteria from "./pages/DataKriteria";
import DataPenilaian from "./pages/DataPenilaian";
import DataHasilRekomendasi from "./pages/DataHasilRekomendasi";
import StatusAlsintan from "./pages/StatusAlsintan";
import DataPoktan from "./pages/DataPoktan";
import Endpoint from "./components/Endpoint";

// ✅ Layout Wrapper (Sidebar + Konten)
function LayoutWithSidebar({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 bg-[#dfdfdf]">{children}</main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔓 Halaman tanpa proteksi */}
        <Route path="/" element={<Login />} />

        {/* 🔐 Halaman terproteksi */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <LayoutWithSidebar>
                <Dashboard />
              </LayoutWithSidebar>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profil"
          element={
            <ProtectedRoute>
              <LayoutWithSidebar>
                <EditProfil />
              </LayoutWithSidebar>
            </ProtectedRoute>
          }
        />

        <Route
          path="/rekap"
          element={
            <ProtectedRoute>
              <LayoutWithSidebar>
                <RekapDataAlsintan />
              </LayoutWithSidebar>
            </ProtectedRoute>
          }
        />

        <Route
          path="/kriteria"
          element={
            <ProtectedRoute>
              <LayoutWithSidebar>
                <DataKriteria />
              </LayoutWithSidebar>
            </ProtectedRoute>
          }
        />

        <Route
          path="/penilaian"
          element={
            <ProtectedRoute>
              <LayoutWithSidebar>
                <DataPenilaian />
              </LayoutWithSidebar>
            </ProtectedRoute>
          }
        />

        <Route
          path="/hasil"
          element={
            <ProtectedRoute>
              <LayoutWithSidebar>
                <DataHasilRekomendasi />
              </LayoutWithSidebar>
            </ProtectedRoute>
          }
        />

        <Route
          path="/status-alsintan"
          element={
            <ProtectedRoute>
              <LayoutWithSidebar>
                <StatusAlsintan />
              </LayoutWithSidebar>
            </ProtectedRoute>
          }
        />

        <Route
          path="/poktan"
          element={
            <ProtectedRoute>
              <LayoutWithSidebar>
                <DataPoktan />
              </LayoutWithSidebar>
            </ProtectedRoute>
          }
        />

        <Route
          path="/endpoint"
          element={
            <ProtectedRoute>
              <LayoutWithSidebar>
                <Endpoint />
              </LayoutWithSidebar>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
