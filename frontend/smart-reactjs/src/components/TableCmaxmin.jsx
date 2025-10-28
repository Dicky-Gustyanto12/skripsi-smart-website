import { useEffect, useState } from "react";

export default function TableSmart() {
  const [penilaianAll, setPenilaianAll] = useState([]);
  const [kriteriaAll, setKriteriaAll] = useState([]);
  const [poktanMap, setPoktanMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:8000/api/penilaian").then((res) => res.json()),
      fetch("http://localhost:8000/api/kriteria").then((res) => res.json()),
      fetch("http://localhost:8000/api/poktan").then((res) => res.json()),
    ]).then(([pen, kri, pok]) => {
      setPenilaianAll(pen);
      setKriteriaAll(kri);
      setPoktanMap(
        Object.fromEntries(pok.map((p) => [p.id_poktan, p.nama_poktan]))
      );
      setLoading(false);
    });
  }, []);

  const kriteriaKeys = kriteriaAll.map((k) => k.id_kriteria);
  const kriteriaCodes = kriteriaAll.map((k, i) => k.kode || `K${i + 1}`);

  const matrixRows =
    penilaianAll.map((poktan) => ({
      kode: poktan.id_poktan,
      nama: poktanMap[poktan.id_poktan] || "-",
      nilai: kriteriaKeys.map((k) => poktan.details?.[k]?.nilai ?? 0),
    })) || [];

  const cmin = kriteriaKeys.map((_, i) =>
    matrixRows.length === 0
      ? "-"
      : Math.min(...matrixRows.map((row) => row.nilai[i]))
  );
  const cmax = kriteriaKeys.map((_, i) =>
    matrixRows.length === 0
      ? "-"
      : Math.max(...matrixRows.map((row) => row.nilai[i]))
  );
  const cmaxmin = kriteriaKeys.map((_, i) =>
    matrixRows.length === 0 ? "-" : cmax[i] - cmin[i]
  );

  const tableRows = [
    ...matrixRows.map((row) => ({
      label: row.kode,
      nama: row.nama,
      values: row.nilai,
      isSummary: false,
    })),
    { label: "Cmin", nama: "", values: cmin, isSummary: true },
    { label: "Cmax", nama: "", values: cmax, isSummary: true },
    { label: "cmax-cmin", nama: "", values: cmaxmin, isSummary: true },
  ];

  return (
    <div className="p-2 w-full">
      <h2 className="font-bold mb-4 text-lg">
        Tabel Alternatif-Nilai Kriteria (SMART)
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-3 font-semibold">Kode</th>
              <th className="px-4 py-3 font-semibold">Nama Poktan</th>
              {kriteriaCodes.map((code, i) => (
                <th key={i} className="px-4 py-3 font-semibold">
                  {code}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={2 + kriteriaKeys.length}
                  className="py-6 text-gray-400 text-center"
                >
                  Memuat...
                </td>
              </tr>
            ) : (
              tableRows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className={
                    row.isSummary
                      ? "bg-gray-100 font-semibold"
                      : rIdx % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }
                >
                  <td className="px-4 py-2">{row.label}</td>
                  <td className="px-4 py-2">{row.nama}</td>
                  {row.values.map((val, i) => (
                    <td className="px-4 py-2" key={i}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
