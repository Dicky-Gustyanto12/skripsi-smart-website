import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// Format tanggal ISO ke "dd/mm/yyyy" saja
function formatTanggalOnly(tgl) {
  if (!tgl) return "-";
  const d = new Date(tgl);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function TablePengajuanWithModal() {
  const [data, setData] = useState([]);
  const [poktanList, setPoktanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    id_poktan: "",
    nama_poktan: "",
    nama_barang: "",
    merek: "",
    tipe: "",
    nama_ketua: "",
    nomor_hp: "",
  });
  const [editStatusModal, setEditStatusModal] = useState({
    open: false,
    row: null,
    status: "",
  });

  useEffect(() => {
    fetchPengajuan();
    fetchPoktan();
  }, []);

  const fetchPengajuan = () => {
    setLoading(true);
    setErrorMsg("");
    fetch("http://localhost:8000/api/pengajuan")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data");
        return res.json();
      })
      .then(setData)
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setLoading(false));
  };

  const fetchPoktan = () => {
    fetch("http://localhost:8000/api/poktan")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch poktan");
        return res.json();
      })
      .then(setPoktanList)
      .catch(() => setPoktanList([]));
  };

  const openModal = () => {
    setForm({
      id_poktan: "",
      nama_poktan: "",
      nama_barang: "",
      merek: "",
      tipe: "",
      nama_ketua: "",
      nomor_hp: "",
    });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "id_poktan") {
      const selected = poktanList.find((p) => p.id_poktan === value);
      setForm((prev) => ({
        ...prev,
        id_poktan: value,
        nama_poktan: selected?.nama_poktan || "",
        nama_ketua: selected?.nama_ketua || "",
        nomor_hp: selected?.nomor_hp || "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/pengajuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 403) {
        const err = await res.json();
        Swal.fire("Tidak Bisa!", err.message, "error");
        return;
      }
      if (!res.ok) throw new Error("Gagal tambah data!");
      setModalOpen(false);
      fetchPengajuan();
      Swal.fire("Berhasil", "Pengajuan berhasil disimpan!", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // -- STATUS BADGE UTILITY
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

  const TableSkeleton = ({ rows }) => (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
          {Array(11)
            .fill()
            .map((_, col) => (
              <td key={col} className="py-3 px-4 animate-pulse">
                <div className="bg-gray-200 h-4 rounded w-full"></div>
              </td>
            ))}
        </tr>
      ))}
    </tbody>
  );

  // -- EDIT STATUS HANDLING
  const openEditStatusModal = (row) => {
    setEditStatusModal({ open: true, row, status: row.status });
  };
  const closeEditStatusModal = () =>
    setEditStatusModal({ open: false, row: null, status: "" });

  const handleEditStatusChange = (e) => {
    setEditStatusModal((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleUpdateStatus = async () => {
    const row = editStatusModal.row;
    Swal.fire({
      title: "Konfirmasi",
      text: `Yakin ingin mengubah status pengajuan ${row.id_pengajuan} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `http://localhost:8000/api/pengajuan/${row.id_pengajuan}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: editStatusModal.status }),
            }
          );
          if (!res.ok) throw new Error("Update status gagal!");
          fetchPengajuan();
          closeEditStatusModal();
          Swal.fire("Berhasil!", "Status pengajuan diupdate.", "success");
        } catch (err) {
          Swal.fire("Gagal!", err.message, "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Rekap Data Pengajuan Alsintan</h2>
      <button
        onClick={openModal}
        className="mb-6 px-6 py-3 rounded bg-green-600 text-white hover:bg-green-700 transition"
      >
        Tambah Data
      </button>
      {errorMsg && (
        <div className="border border-red-300 bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {errorMsg}
        </div>
      )}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase font-bold">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">NAMA POKTAN</th>
              <th className="py-3 px-4 text-left">NAMA BARANG</th>
              <th className="py-3 px-4 text-left">MEREK</th>
              <th className="py-3 px-4 text-left">TIPE</th>
              <th className="py-3 px-4 text-left">NAMA KETUA</th>
              <th className="py-3 px-4 text-left">NOMOR HP</th>
              <th className="py-3 px-4 text-left">STATUS</th>
              <th className="py-3 px-4 text-left">TANGGAL DIUPDATE</th>
              <th className="py-3 px-4 text-left">UPDATE STATUS</th>
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton rows={3} />
          ) : (
            <tbody>
              {data.map((item, idx) => (
                <tr
                  key={item.id_pengajuan || idx}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-4">{item.id_pengajuan}</td>
                  <td className="py-3 px-4">{item.nama_poktan}</td>
                  <td className="py-3 px-4">{item.nama_barang}</td>
                  <td className="py-3 px-4">{item.merek}</td>
                  <td className="py-3 px-4">{item.tipe}</td>
                  <td className="py-3 px-4">{item.nama_ketua}</td>
                  <td className="py-3 px-4">{item.nomor_hp}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {formatTanggalOnly(item.updated_at)}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="Update Status"
                      onClick={() => openEditStatusModal(item)}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* MODAL TAMBAH DATA */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-6">Tambah Data</h3>
            <form onSubmit={handleSubmit}>
              <select
                name="id_poktan"
                value={form.id_poktan}
                onChange={handleFormChange}
                className="w-full mb-4 border rounded p-2"
                required
              >
                <option value="">Pilih Poktan</option>
                {poktanList.map((poktan) => (
                  <option key={poktan.id_poktan} value={poktan.id_poktan}>
                    {poktan.nama_poktan}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="nama_barang"
                placeholder="Nama Barang"
                value={form.nama_barang}
                onChange={handleFormChange}
                className="w-full mb-4 border rounded p-2"
                required
              />
              <input
                type="text"
                name="merek"
                placeholder="Merek"
                value={form.merek}
                onChange={handleFormChange}
                className="w-full mb-4 border rounded p-2"
                required
              />
              <input
                type="text"
                name="tipe"
                placeholder="Tipe"
                value={form.tipe}
                onChange={handleFormChange}
                className="w-full mb-4 border rounded p-2"
                required
              />
              <input
                type="text"
                name="nama_ketua"
                placeholder="Nama Ketua"
                value={form.nama_ketua}
                onChange={handleFormChange}
                className="w-full mb-4 border rounded p-2 bg-gray-100"
                readOnly
              />
              <input
                type="text"
                name="nomor_hp"
                placeholder="Nomor HP"
                value={form.nomor_hp}
                onChange={handleFormChange}
                className="w-full mb-6 border rounded p-2 bg-gray-100"
                readOnly
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 rounded border hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL UPDATE STATUS */}
      {editStatusModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <h3 className="font-bold text-xl mb-6">Update Status</h3>
            <div className="mb-4">
              <div>
                <b>ID Pengajuan:</b> {editStatusModal.row.id_pengajuan}
              </div>
              <div>
                <b>Nama Poktan:</b> {editStatusModal.row.nama_poktan}
              </div>
              <div>
                <b>Barang:</b> {editStatusModal.row.nama_barang}
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-1">Status</label>
              <select
                value={editStatusModal.status}
                onChange={handleEditStatusChange}
                className={`w-full border rounded p-2
                  ${
                    editStatusModal.status === "Diterima"
                      ? "bg-green-200 text-green-800"
                      : editStatusModal.status === "Proses"
                      ? "bg-yellow-200 text-yellow-800"
                      : editStatusModal.status === "Batal"
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
              >
                <option
                  value="Proses"
                  className="bg-yellow-200 text-yellow-800"
                >
                  Proses
                </option>
                <option
                  value="Diterima"
                  className="bg-green-200 text-green-800"
                >
                  Diterima
                </option>
                <option value="Batal" className="bg-red-200 text-red-800">
                  Batal
                </option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeEditStatusModal}
                className="px-6 py-2 rounded border hover:bg-gray-100"
              >
                Tidak
              </button>
              <button
                type="button"
                onClick={handleUpdateStatus}
                className={`px-6 py-2 rounded text-white 
                  ${
                    editStatusModal.status === "Diterima"
                      ? "bg-green-600 hover:bg-green-700"
                      : editStatusModal.status === "Proses"
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : editStatusModal.status === "Batal"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-500"
                  }`}
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
