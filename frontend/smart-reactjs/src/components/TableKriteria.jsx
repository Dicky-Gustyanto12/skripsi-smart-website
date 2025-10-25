import { useState } from "react";
import Swal from "sweetalert2";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function TableKriteria() {
  const initialData = [
    { id: 1, kode: "KR01", kriteria: "Harga", bobot: 0.4, normalisasi: 0.5 },
    {
      id: 2,
      kode: "KR02",
      kriteria: "Kualitas",
      bobot: 0.3,
      normalisasi: 0.375,
    },
  ];

  const [data, setData] = useState(initialData);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    id: null,
    kode: "",
    kriteria: "",
    bobot: "",
    normalisasi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const openAddPopup = () => {
    setFormValues({
      id: null,
      kode: "",
      kriteria: "",
      bobot: "",
      normalisasi: "",
    });
    setEditMode(false);
    setPopupOpen(true);
  };

  const openEditPopup = (item) => {
    setFormValues(item);
    setEditMode(true);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  const handleSave = () => {
    if (
      !formValues.kode ||
      !formValues.kriteria ||
      !formValues.bobot ||
      !formValues.normalisasi
    ) {
      alert("Semua field harus diisi");
      return;
    }

    if (editMode) {
      setData((prev) =>
        prev.map((item) => (item.id === formValues.id ? formValues : item))
      );
    } else {
      const newItem = {
        ...formValues,
        id: data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1,
        bobot: parseFloat(formValues.bobot),
        normalisasi: parseFloat(formValues.normalisasi),
      };
      setData((prev) => [...prev, newItem]);
    }
    closePopup();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed)
        setData((prev) => prev.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Daftar Kriteria</h2>
      <button
        onClick={openAddPopup}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
      >
        Tambah Kriteria
      </button>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
          <tr>
            <th className="py-3 px-6 text-center">No</th>
            <th className="py-3 px-6 text-left">Kode</th>
            <th className="py-3 px-6 text-left">Kriteria</th>
            <th className="py-3 px-6 text-center">Bobot</th>
            <th className="py-3 px-6 text-center">Normalisasi</th>
            <th className="py-3 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {data.map((item, idx) => (
            <tr
              key={item.id}
              className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-3 px-6 text-center">{idx + 1}</td>
              <td className="py-3 px-6">{item.kode}</td>
              <td className="py-3 px-6">{item.kriteria}</td>
              <td className="py-3 px-6 text-center">{item.bobot}</td>
              <td className="py-3 px-6 text-center">{item.normalisasi}</td>
              <td className="py-3 px-6 flex justify-center space-x-4">
                <button
                  onClick={() => openEditPopup(item)}
                  title="Edit"
                  className="hover:text-blue-700 cursor-pointer"
                >
                  <PencilSquareIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  title="Hapus"
                  className="hover:text-red-700 cursor-pointer"
                >
                  <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal Add/Edit */}
      {popupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Kriteria" : "Tambah Kriteria Baru"}
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                name="kode"
                placeholder="Kode"
                value={formValues.kode}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="kriteria"
                placeholder="Kriteria"
                value={formValues.kriteria}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                step="0.01"
                name="bobot"
                placeholder="Bobot"
                value={formValues.bobot}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                step="0.01"
                name="normalisasi"
                placeholder="Normalisasi"
                value={formValues.normalisasi}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={closePopup}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
