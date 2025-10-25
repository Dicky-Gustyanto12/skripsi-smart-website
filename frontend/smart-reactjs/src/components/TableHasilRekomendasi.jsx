import React from "react";

const dataPenilaian = [
  {
    kode: "KT01",
    namaKelompok: "Kelompok Tani A",
    k1: 0.8,
    k2: 0.9,
    k3: 0.7,
    k4: 0.85,
  },
  {
    kode: "KT02",
    namaKelompok: "Kelompok Tani B",
    k1: 0.6,
    k2: 0.75,
    k3: 0.8,
    k4: 0.9,
  },
  {
    kode: "KT03",
    namaKelompok: "Kelompok Tani C",
    k1: 0.85,
    k2: 0.8,
    k3: 0.75,
    k4: 0.7,
  },
];

const hitungNilaiAkhir = (item) => {
  const total = item.k1 + item.k2 + item.k3 + item.k4;
  return (total / 4).toFixed(2);
};

export default function TableHasilRekomendasi() {
  const dataSorted = dataPenilaian
    .map((item) => ({
      ...item,
      nilaiAkhir: parseFloat(hitungNilaiAkhir(item)),
    }))
    .sort((a, b) => b.nilaiAkhir - a.nilaiAkhir);

  return (
    <div className="p-6 max-w-full ">
      <h2 className="text-2xl font-bold mb-6">Tabel Hasil Rekomendasi</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-3 text-left font-semibold">Kode</th>
            <th className="px-4 py-3 text-left font-semibold">
              Nama Kelompok Tani
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              K1 - Status Terdaftar di Dinas
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              K2 - Lokasi Poktan
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              K3 - Pernah menerima bantuan
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              K4 - Kelengkapan Proposal
            </th>
            <th className="px-4 py-3 text-left font-semibold">Nilai Akhir</th>
            <th className="px-4 py-3 text-left font-semibold">Ranking</th>
          </tr>
        </thead>
        <tbody>
          {dataSorted.map((item, index) => (
            <tr
              key={item.kode}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-4 py-3">{item.kode}</td>
              <td className="px-4 py-3">{item.namaKelompok}</td>
              <td className="px-4 py-3">{item.k1.toFixed(2)}</td>
              <td className="px-4 py-3">{item.k2.toFixed(2)}</td>
              <td className="px-4 py-3">{item.k3.toFixed(2)}</td>
              <td className="px-4 py-3">{item.k4.toFixed(2)}</td>
              <td className="px-4 py-3">{item.nilaiAkhir.toFixed(2)}</td>
              <td className="px-4 py-3">{index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
