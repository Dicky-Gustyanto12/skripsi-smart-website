import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function TablePenilaian() {
  const kelompokTaniOptions = [
    { id: 1, name: "Kelompok Tani A" },
    { id: 2, name: "Kelompok Tani B" },
    { id: 3, name: "Kelompok Tani C" },
  ];
  const poktanOptionsByKelompok = {
    1: [
      { id: 1, name: "Poktan 1" },
      { id: 2, name: "Poktan 2" },
    ],
    2: [{ id: 3, name: "Poktan 3" }],
    3: [
      { id: 4, name: "Poktan 4" },
      { id: 5, name: "Poktan 5" },
    ],
  };

  const [selectedKelompok, setSelectedKelompok] = useState(null);
  const [poktanData, setPoktanData] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [editPoktanId, setEditPoktanId] = useState(null);
  const [formValues, setFormValues] = useState({
    poktanId: null,
    k1: "",
    k2: "",
    k3: "",
    k4: "",
  });

  const kriteriaList = [
    {
      key: "k1",
      label: "K1 - Status Terdaftar di Dinas",
      options: ["Terdaftar", "Tidak Terdaftar"],
    },
    {
      key: "k2",
      label: "K2 - Lokasi poktan berada di sentra produksi tanaman padi",
      options: ["Ya", "Tidak"],
    },
    {
      key: "k3",
      label:
        "K3 - Apakah poktan tersebut pernah menerima bantuan tahun sebelumnya",
      options: ["Pernah", "Belum Pernah"],
    },
    { key: "k4", label: "K4 - Kelengkapan Proposal", options: ["Ya", "Tidak"] },
  ];

  const openAddPopup = () => {
    setFormValues({
      poktanId: null,
      k1: "",
      k2: "",
      k3: "",
      k4: "",
    });
    setEditPoktanId(null);
    setPopupOpen(true);
  };
  const openEditPopup = (poktanId) => {
    const data = poktanData[poktanId] || {};
    setFormValues({
      poktanId,
      k1: data.k1 || "",
      k2: data.k2 || "",
      k3: data.k3 || "",
      k4: data.k4 || "",
    });
    setEditPoktanId(poktanId);
    setPopupOpen(true);
  };
  const closePopup = () => setPopupOpen(false);
  const handleSave = () => {
    if (!formValues.poktanId) {
      alert("Pilih Poktan terlebih dahulu di tabel");
      return;
    }
    setPoktanData((prev) => ({
      ...prev,
      [formValues.poktanId]: {
        k1: formValues.k1,
        k2: formValues.k2,
        k3: formValues.k3,
        k4: formValues.k4,
      },
    }));
    setPopupOpen(false);
    setEditPoktanId(null);
  };
  const handleDelete = (poktanId) => {
    const newData = { ...poktanData };
    delete newData[poktanId];
    setPoktanData(newData);
    if (editPoktanId === poktanId) setEditPoktanId(null);
  };
  const handleFormChange = (key, value) =>
    setFormValues((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <label className="block mb-2 font-semibold">Pilih Kelompok Tani:</label>
      <select
        className="w-full border rounded p-2 mb-4"
        value={selectedKelompok || ""}
        onChange={(e) => {
          const val = e.target.value === "" ? null : parseInt(e.target.value);
          setSelectedKelompok(val);
          setEditPoktanId(null);
        }}
      >
        <option value="">-- Pilih Kelompok Tani --</option>
        {kelompokTaniOptions.map((k) => (
          <option key={k.id} value={k.id}>
            {k.name}
          </option>
        ))}
      </select>
      {selectedKelompok && (
        <button
          onClick={openAddPopup}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Tambah Penilaian
        </button>
      )}
      {selectedKelompok && (
        <>
          <h3 className="font-semibold mb-2">Hasil Penilaian</h3>
          <table className="w-full border rounded text-sm text-gray-700 mb-8">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Poktan</th>
                <th className="border px-4 py-2">K1 (Status Terdaftar)</th>
                <th className="border px-4 py-2">K2 (Sentra Produksi)</th>
                <th className="border px-4 py-2">
                  K3 (Pernah menerima bantuan)
                </th>
                <th className="border px-4 py-2">K4 (Kelengkapan Proposal)</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {(poktanOptionsByKelompok[selectedKelompok] || []).map(
                (p, idx) => {
                  const row = poktanData[p.id] || {};
                  return (
                    <tr
                      key={p.id}
                      className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="border px-4 py-2 text-center">
                        {idx + 1}
                      </td>
                      <td className="border px-4 py-2">{p.name}</td>
                      <td className="border px-4 py-2">{row.k1 || "-"}</td>
                      <td className="border px-4 py-2">{row.k2 || "-"}</td>
                      <td className="border px-4 py-2">{row.k3 || "-"}</td>
                      <td className="border px-4 py-2">{row.k4 || "-"}</td>
                      <td className="border px-4 py-2 space-x-2 flex justify-center">
                        <button
                          onClick={() => openEditPopup(p.id)}
                          title="Edit"
                          className="hover:text-blue-700 cursor-pointer"
                        >
                          <PencilSquareIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          title="Delete"
                          className="hover:text-red-700 cursor-pointer"
                        >
                          <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
              {(poktanOptionsByKelompok[selectedKelompok] || []).length ===
                0 && (
                <tr>
                  <td colSpan={7} className="border px-4 py-2 text-center">
                    Belum ada poktan pada kelompok ini
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editPoktanId ? "Edit Data Kriteria" : "Input Penilaian"}
            </h3>
            <label className="block mb-2 font-semibold">Pilih Poktan:</label>
            <select
              className="w-full border rounded p-2 mb-4"
              value={formValues.poktanId || ""}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  poktanId:
                    e.target.value === "" ? null : parseInt(e.target.value),
                }))
              }
              disabled={editPoktanId !== null}
            >
              <option value="">-- Pilih Poktan --</option>
              {(poktanOptionsByKelompok[selectedKelompok] || []).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <table className="w-full border rounded text-sm text-gray-700 mb-2">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2 w-1/2">Kriteria</th>
                  <th className="border px-4 py-2 w-1/2">Pilihan</th>
                </tr>
              </thead>
              <tbody>
                {kriteriaList.map((item) => (
                  <tr key={item.key}>
                    <td className="border px-4 py-2 font-medium">
                      {item.label}
                    </td>
                    <td className="border px-4 py-2">
                      {item.options.map((opt) => (
                        <label
                          key={opt}
                          className="inline-flex items-center mr-6"
                        >
                          <input
                            type="radio"
                            className="form-radio"
                            name={item.key}
                            value={opt}
                            checked={formValues[item.key] === opt}
                            onChange={() => handleFormChange(item.key, opt)}
                          />
                          <span className="ml-1">{opt}</span>
                        </label>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={closePopup}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
