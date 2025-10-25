import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import EditProfil from "./pages/EditProfil";
import Dashboard from "./pages/Dashboard";
import DataPengajuanAlsintan from "./pages/DataPengajuanAlsintan";
import DataKriteria from "./pages/DataKriteria";
import DataPenilaian from "./pages/DataPenilaian";
import DataHasilRekomendasi from "./pages/DataHasilRekomendasi";
import StatusAlsintan from "./pages/StatusAlsintan";
import DataPoktan from "./pages/DataPoktan";
import Endpoint from "./components/Endpoint";

function LayoutWithSidebar({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-0 md:p-8 p-4 max-w-full bg-[#dfdfdf]">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman login tanpa sidebar */}
        <Route path="/" element={<Login />} />

        {/* Halaman dengan sidebar */}
        <Route
          path="/*"
          element={
            <LayoutWithSidebar>
              <Routes>
                <Route path="edit-profil" element={<EditProfil />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="pengajuan" element={<DataPengajuanAlsintan />} />
                <Route path="kriteria" element={<DataKriteria />} />
                <Route path="penilaian" element={<DataPenilaian />} />
                <Route path="hasil" element={<DataHasilRekomendasi />} />
                <Route path="status-alsintan" element={<StatusAlsintan />} />
                <Route path="poktan" element={<DataPoktan />} />
                <Route path="endpoint" element={<Endpoint />} />
              </Routes>
            </LayoutWithSidebar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
