import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

// Skeleton Loading Component
function TableSkeleton({ rows = 5 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
          {Array(9)
            .fill()
            .map((_, col) => (
              <td key={col} className="py-3 px-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </td>
            ))}
        </tr>
      ))}
    </tbody>
  );
}

export default function TablePoktan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    nama_poktan: "",
    desa: "",
    kecamatan: "",
    nomor_hp: "",
    nama_ketua: "",
    nik: "",
  });

  // Fetch data & set loading
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/poktan")
      .then((res) => res.json())
      .then((result) => setData(result))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const openAddPopup = () => {
    setFormValues({
      nama_poktan: "",
      desa: "",
      kecamatan: "",
      nomor_hp: "",
      nama_ketua: "",
      nik: "",
    });
    setEditMode(false);
    setPopupOpen(true);
  };

  const openEditPopup = (item) => {
    setFormValues({
      nama_poktan: item.nama_poktan,
      desa: item.desa,
      kecamatan: item.kecamatan,
      nomor_hp: item.nomor_hp,
      nama_ketua: item.nama_ketua,
      nik: item.nik,
      id_poktan: item.id_poktan,
    });
    setEditMode(true);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  const handleSave = () => {
    const { nama_poktan, desa, kecamatan, nomor_hp, nama_ketua, nik } =
      formValues;
    if (
      !nama_poktan ||
      !desa ||
      !kecamatan ||
      !nomor_hp ||
      !nama_ketua ||
      !nik
    ) {
      Swal.fire("Lengkapi semua field!", "", "warning");
      return;
    }

    Swal.fire({
      title: editMode ? "Konfirmasi Update?" : "Konfirmasi Tambah?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        if (editMode) {
          fetch(`http://localhost:8000/api/poktan/${formValues.id_poktan}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nama_poktan,
              desa,
              kecamatan,
              nomor_hp,
              nama_ketua,
              nik,
            }),
          })
            .then((res) => res.json())
            .then((updated) => {
              setData((prev) =>
                prev.map((d) =>
                  d.id_poktan === updated.id_poktan ? updated : d
                )
              );
              closePopup();
              Swal.fire("Berhasil!", "Data berhasil diupdate.", "success");
            })
            .finally(() => setLoading(false));
        } else {
          fetch("http://localhost:8000/api/poktan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nama_poktan,
              desa,
              kecamatan,
              nomor_hp,
              nama_ketua,
              nik,
            }),
          })
            .then((res) => res.json())
            .then((newItem) => {
              setData((prev) => [...prev, newItem]);
              closePopup();
              Swal.fire("Berhasil!", "Data berhasil ditambahkan.", "success");
            })
            .finally(() => setLoading(false));
        }
      }
    });
  };

  const handleDelete = (id_poktan) => {
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
        setLoading(true);
        fetch(`http://localhost:8000/api/poktan/${id_poktan}`, {
          method: "DELETE",
        })
          .then(() => {
            setData((prev) => prev.filter((d) => d.id_poktan !== id_poktan));
            Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
          })
          .finally(() => setLoading(false));
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
            <th className="py-3 px-6 text-left">ID Poktan</th>
            <th className="py-3 px-6 text-left">Nama Poktan</th>
            <th className="py-3 px-6 text-left">Desa</th>
            <th className="py-3 px-6 text-left">Kecamatan</th>
            <th className="py-3 px-6 text-left">Nama Ketua</th>
            <th className="py-3 px-6 text-left">NIK</th>
            <th className="py-3 px-6 text-left">Nomor Hp</th>
            <th className="py-3 px-6 text-left">Aksi</th>
          </tr>
        </thead>
        {loading ? (
          <TableSkeleton rows={5} />
        ) : (
          <tbody className="text-gray-600 text-sm">
            {data.map((item, idx) => (
              <tr
                key={item.id_poktan}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3 px-6">{idx + 1}</td>
                <td className="py-3 px-6">{item.id_poktan}</td>
                <td className="py-3 px-6">{item.nama_poktan}</td>
                <td className="py-3 px-6">{item.desa}</td>
                <td className="py-3 px-6">{item.kecamatan}</td>
                <td className="py-3 px-6">{item.nama_ketua}</td>
                <td className="py-3 px-6">{item.nik}</td>
                <td className="py-3 px-6">{item.nomor_hp}</td>
                <td className="py-3 px-6 space-x-4 flex">
                  <button
                    onClick={() => openEditPopup(item)}
                    title="Edit"
                    className="hover:text-blue-700 cursor-pointer"
                  >
                    <PencilSquareIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id_poktan)}
                    title="Hapus"
                    className="hover:text-red-700 cursor-pointer"
                  >
                    <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editMode ? "Edit Poktan" : "Tambah Poktan Baru"}
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                name="nama_poktan"
                placeholder="Nama Poktan"
                value={formValues.nama_poktan}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="desa"
                placeholder="Desa"
                value={formValues.desa}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="kecamatan"
                placeholder="Kecamatan"
                value={formValues.kecamatan}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="nama_ketua"
                placeholder="Nama Ketua"
                value={formValues.nama_ketua}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="nik"
                placeholder="NIK"
                value={formValues.nik}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="nomor_hp"
                placeholder="Nomor Hp"
                value={formValues.nomor_hp}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={closePopup}
                className="px-4 py-2 rounded border hover:bg-gray-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer"
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
