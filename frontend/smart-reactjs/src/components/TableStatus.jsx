import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function TableStat() {
  const initialData = [
    {
      id: 1,
      namaPoktan: "Poktan A",
      namaBarang: "Traktor",
      merek: "Kubota",
      tipe: "L1",
      namaPenerima: "Budi",
      nomorHp: "08123456789",
      status: "Diterima",
    },
    {
      id: 2,
      namaPoktan: "Poktan B",
      namaBarang: "Pompa Air",
      merek: "Honda",
      tipe: "X2",
      namaPenerima: "Sari",
      nomorHp: "08987654321",
      status: "Proses",
    },
    {
      id: 3,
      namaPoktan: "Poktan C",
      namaBarang: "Sprayer",
      merek: "Yamaha",
      tipe: "S1",
      namaPenerima: "Agus",
      nomorHp: "081298765432",
      status: "Batal",
    },
  ];

  const [data, setData] = useState(initialData);
  const [formValues, setFormValues] = useState({
    id: null,
    namaPoktan: "",
    namaBarang: "",
    merek: "",
    tipe: "",
    namaPenerima: "",
    nomorHp: "",
    status: "Proses",
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const openAddPopup = () => {
    setFormValues({
      id: null,
      namaPoktan: "",
      namaBarang: "",
      merek: "",
      tipe: "",
      namaPenerima: "",
      nomorHp: "",
      status: "Proses",
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
      !formValues.namaPoktan ||
      !formValues.namaBarang ||
      !formValues.merek ||
      !formValues.tipe ||
      !formValues.namaPenerima ||
      !formValues.nomorHp
    ) {
      alert("Lengkapi semua data");
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
      };
      setData((prev) => [...prev, newItem]);
    }
    closePopup();
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Fungsi untuk memberikan style warna label status
  const getStatusClass = (status) => {
    switch (status) {
      case "Diterima":
        return "bg-green-200 text-green-800";
      case "Proses":
        return "bg-yellow-200 text-yellow-800";
      case "Batal":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Status Penerima Alsintan</h2>
      <button
        onClick={openAddPopup}
        className="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Tambah Data
      </button>
      <table className="min-w-full bg-white rounded shadow text-sm">
        <thead className="bg-gray-200 text-gray-600 uppercase font-medium">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Nama Poktan</th>
            <th className="py-2 px-4 text-left">Nama Barang</th>
            <th className="py-2 px-4 text-left">Merek</th>
            <th className="py-2 px-4 text-left">Tipe</th>
            <th className="py-2 px-4 text-left">Nama Penerima</th>
            <th className="py-2 px-4 text-left">Nomor Hp</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={item.id}
              className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-2 px-4">{item.id}</td>
              <td className="py-2 px-4">{item.namaPoktan}</td>
              <td className="py-2 px-4">{item.namaBarang}</td>
              <td className="py-2 px-4">{item.merek}</td>
              <td className="py-2 px-4">{item.tipe}</td>
              <td className="py-2 px-4">{item.namaPenerima}</td>
              <td className="py-2 px-4">{item.nomorHp}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${getStatusClass(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-2 px-4 space-x-3 flex">
                <button
                  onClick={() => openEditPopup(item)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  title="Edit"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  title="Hapus"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">
              {editMode ? "Edit Data" : "Tambah Data"}
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                name="namaPoktan"
                value={formValues.namaPoktan}
                onChange={handleChange}
                placeholder="Nama Poktan"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="namaBarang"
                value={formValues.namaBarang}
                onChange={handleChange}
                placeholder="Nama Barang"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="merek"
                value={formValues.merek}
                onChange={handleChange}
                placeholder="Merek"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="tipe"
                value={formValues.tipe}
                onChange={handleChange}
                placeholder="Tipe"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="namaPenerima"
                value={formValues.namaPenerima}
                onChange={handleChange}
                placeholder="Nama Penerima"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="nomorHp"
                value={formValues.nomorHp}
                onChange={handleChange}
                placeholder="Nomor Hp"
                className="w-full border p-2 rounded"
              />
              <select
                name="status"
                value={formValues.status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Proses">Proses</option>
                <option value="Diterima">Diterima</option>
                <option value="Batal">Batal</option>
              </select>
            </div>
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
