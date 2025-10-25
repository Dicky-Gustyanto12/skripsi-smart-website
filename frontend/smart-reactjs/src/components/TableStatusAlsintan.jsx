import { useState } from "react";
import Swal from "sweetalert2";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

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
      status: "Proses",
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
      status: "Proses",
    },
  ];

  const [data, setData] = useState(initialData);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

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

  const openEditStatusPopup = (item) => {
    setEditingItem(item);
    setSelectedStatus(item.status);
  };

  const closeEditStatusPopup = () => {
    setEditingItem(null);
    setSelectedStatus("");
  };

  const handleSaveStatus = () => {
    if (!selectedStatus) {
      Swal.fire("Pilih status terlebih dahulu.", "", "warning");
      return;
    }
    Swal.fire({
      title: "Yakin ingin memperbarui status penerimaan ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === editingItem.id
              ? { ...item, status: selectedStatus }
              : item
          )
        );
        closeEditStatusPopup();
        Swal.fire("Berhasil!", "Status telah diperbarui.", "success");
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Status Penerima Alsintan</h2>
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
            <th className="py-2 px-4 text-left">Perbarui Status</th>
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
              <td className="py-2 px-4">
                <button
                  onClick={() => openEditStatusPopup(item)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  title="Edit Status"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Edit Status */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Perbarui Status</h3>
            <select
              className="w-full border p-2 rounded"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="" disabled>
                Pilih status
              </option>
              <option value="Proses">Proses</option>
              <option value="Diterima">Diterima</option>
              <option value="Batal">Batal</option>
            </select>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={closeEditStatusPopup}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleSaveStatus}
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
