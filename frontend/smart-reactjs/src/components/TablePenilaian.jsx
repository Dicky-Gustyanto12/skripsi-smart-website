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

  // Untuk modal form popup tambah/edit
  const [popupOpen, setPopupOpen] = useState(false);
  const [editPoktanId, setEditPoktanId] = useState(null); // null = tambah baru
  const [formValues, setFormValues] = useState({
    poktanId: null,
    k1: [],
    k2: "",
    k3: "",
    k4: "",
  });

  const k1Options = [
    "Kurang dari 3 bulan",
    "Lebih dari 3 bulan",
    "Lebih dari 6 bulan",
    "Lebih dari 1 tahun",
  ];

  // Fungsi handle checkbox k1 di popup
  const handleK1Change = (option) => {
    let newK1;
    if (formValues.k1.includes(option)) {
      newK1 = formValues.k1.filter((o) => o !== option);
    } else {
      newK1 = [...formValues.k1, option];
    }
    setFormValues((prev) => ({ ...prev, k1: newK1 }));
  };

  // Fungsi radio untuk k2,k3,k4
  const handleRadioChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  // Buka popup tambah data (form kosong)
  const openAddPopup = () => {
    setFormValues({
      poktanId: null,
      k1: [],
      k2: "",
      k3: "",
      k4: "",
    });
    setEditPoktanId(null);
    setPopupOpen(true);
  };

  // Buka popup edit data (form terisi)
  const openEditPopup = (poktanId) => {
    const data = poktanData[poktanId] || {
      k1: [],
      k2: "",
      k3: "",
      k4: "",
    };
    setFormValues({ poktanId, ...data });
    setEditPoktanId(poktanId);
    setPopupOpen(true);
  };

  // Tutup popup
  const closePopup = () => setPopupOpen(false);

  // Simpan data dari form popup
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4"></h2>

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

      {/* Tombol tambah data */}
      {selectedKelompok && (
        <button
          onClick={openAddPopup}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Tambah Data Kriteria
        </button>
      )}

      {/* Tabel hasil inputan */}
      {selectedKelompok && (
        <>
          <h3 className="font-semibold mb-2">Hasil Pengisian Data</h3>
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
                      <td className="border px-4 py-2">
                        {(row.k1 && row.k1.join(", ")) || "-"}
                      </td>
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

      {/* Modal popup form add/edit */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editPoktanId ? "Edit Data Kriteria" : "Tambah Data Kriteria"}
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
            >
              <option value="">-- Pilih Poktan --</option>
              {(poktanOptionsByKelompok[selectedKelompok] || []).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <table className="w-full border rounded text-sm text-gray-700">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">Kriteria</th>
                  <th className="border px-4 py-2">Pilihan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-medium">
                    K1 - Status Terdaftar di Dinas
                  </td>
                  <td className="border px-4 py-2">
                    {k1Options.map((opt) => (
                      <label
                        key={opt}
                        className="inline-flex items-center mr-4"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={formValues.k1.includes(opt)}
                          onChange={() => handleK1Change(opt)}
                        />
                        <span className="ml-1">{opt}</span>
                      </label>
                    ))}
                  </td>
                </tr>
                {["k2", "k3", "k4"].map((key) => (
                  <tr key={key}>
                    <td className="border px-4 py-2 font-medium">
                      {key.toUpperCase()} -{" "}
                      {key === "k2"
                        ? "Lokasi poktan berada di sentra produksi tanaman padi"
                        : key === "k3"
                        ? "Apakah poktan tersebut pernah menerima bantuan sebelumnya"
                        : "Kelengkapan Proposal"}
                    </td>
                    <td className="border px-4 py-2">
                      {["Ya", "Tidak"].map((opt) => (
                        <label
                          key={opt}
                          className="inline-flex items-center mr-6"
                        >
                          <input
                            type="radio"
                            className="form-radio"
                            name={key}
                            checked={formValues[key] === opt}
                            onChange={() => handleRadioChange(key, opt)}
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
