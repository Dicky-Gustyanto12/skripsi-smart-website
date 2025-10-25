import Pengajuan from "../components/TablePengajuan.jsx";

export default function DataPengajuanAlsintan() {
  return (
    <section>
      <div className="bg-white shadow p-4 md:p-6 rounded text-black">
        <h1 className="text-lg md:text-2xl font-bold mb-4 text-center">
          DATA PENGAJUAN STATUS ALSINTAN
        </h1>
        <Pengajuan />
      </div>
    </section>
  );
}
