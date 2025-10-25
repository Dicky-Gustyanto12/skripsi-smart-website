import React from "react";
import BarChart from "../components/BarChart";
import TableStatus from "../components/TableStatus";
import TableHasilRekomendasi from "../components/TableHasilRekomendasi";

export default function Dashboard() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Penjualan",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const sampleData = [
    { nama: "Budi", alamat: "Jakarta", status: "Aktif" },
    { nama: "Sari", alamat: "Bandung", status: "Tidak Aktif" },
    { nama: "Agus", alamat: "Surabaya", status: "Aktif" },
  ];

  return (
    <section>
      <div className="bg-white shadow p-4 md:p-6 rounded">
        <h1 className="text-lg md:text-4xl font-bold mb-4 text-center">
          DASHBOARD
        </h1>
        <TableHasilRekomendasi />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 ">
            Grafik Jumlah Pengajuan Alsintan
          </h2>
          <BarChart data={data} />
        </div>
        <TableStatus />
      </div>
    </section>
  );
}
