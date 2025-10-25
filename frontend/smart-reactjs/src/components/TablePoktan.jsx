import { useState } from "react";
import Swal from "sweetalert2";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function TablePoktan() {
  const initialData = [
    {
      id: 1,
      nama: "Poktan A",
      alamat: "Jakarta",
      nomorHp: "08123456789",
      ketua: "Budi",
    },
    {
      id: 2,
      nama: "Poktan B",
      alamat: "Bandung",
      nomorHp: "08987654321",
      ketua: "Sari",
    },
  ];

  const [data, setData] = useState(initialData);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false); // true = edit, false = add
  const [formValues, setFormValues] = useState({
    id: null,
    nama: "",
    alamat: "",
    nomorHp: "",
    ketua: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const openAddPopup = () => {
    setFormValues({
      id: null,
      nama: "",
      alamat: "",
      nomorHp: "",
      ketua: "",
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
    // Validasi sederhana
    if (
      !formValues.nama ||
      !formValues.alamat ||
      !formValues.nomorHp ||
      !formValues.ketua
    ) {
      alert("Semua field harus diisi");
      return;
    }

    if (editMode) {
      // Update data
      setData((prev) =>
        prev.map((d) => (d.id === formValues.id ? formValues : d))
      );
    } else {
      // Tambah data baru
      const newItem = {
        ...formValues,
        id: data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1,
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
      if (result.isConfirmed) {
        setData((prev) => prev.filter((d) => d.id !== id));
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tabel Data Kelompok Tani</h2>

      <button
        onClick={openAddPopup}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
      >
        Tambah Poktan
      </button>

      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
          <tr>
            <th className="py-3 px-6 text-left">No</th>
            <th className="py-3 px-6 text-left">Nama Poktan</th>
            <th className="py-3 px-6 text-left">Alamat</th>
            <th className="py-3 px-6 text-left">Nomor Hp</th>
            <th className="py-3 px-6 text-left">Ketua Poktan</th>
            <th className="py-3 px-6 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {data.map((item, idx) => (
            <tr
              key={item.id}
              className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-3 px-6">{idx + 1}</td>
              <td className="py-3 px-6">{item.nama}</td>
              <td className="py-3 px-6">{item.alamat}</td>
              <td className="py-3 px-6">{item.nomorHp}</td>
              <td className="py-3 px-6">{item.ketua}</td>
              <td className="py-3 px-6 space-x-4 flex">
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

      {/* Modal Popup Add/Edit */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editMode ? "Edit Poktan" : "Tambah Poktan Baru"}
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                name="nama"
                placeholder="Nama Poktan"
                value={formValues.nama}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="alamat"
                placeholder="Alamat"
                value={formValues.alamat}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="nomorHp"
                placeholder="Nomor Hp"
                value={formValues.nomorHp}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="ketua"
                placeholder="Ketua Poktan"
                value={formValues.ketua}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end mt-4 space-x-3">
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
