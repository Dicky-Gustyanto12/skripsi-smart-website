import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getCsrf, loginUser, forgotPassword } from "../components/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  //  LOGIN FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await getCsrf(); 
      const res = await loginUser(loginData);
      const data = res.data;

      if (res.status === 200 && data.user) {
        localStorage.setItem("authUser", JSON.stringify(data.user));
        Swal.fire("Berhasil!", "Login berhasil.", "success");
        navigate("/dashboard");
      } else {
        Swal.fire("Gagal!", data.message || "Email/password salah!", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Terjadi masalah saat menghubungi server.", "error");
    }
    setLoading(false);
  };

  // 🔄 RESET PASSWORD
  const openResetModal = () => setResetModalOpen(true);
  const closeResetModal = () => {
    setResetModalOpen(false);
    setResetEmail("");
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      Swal.fire("Email diperlukan!", "Mohon isi email Anda.", "warning");
      return;
    }

    try {
      await getCsrf();
      const res = await forgotPassword({ email: resetEmail });
      if (res.status === 200) {
        Swal.fire(
          "Berhasil!",
          "Link reset password sudah dikirim ke email Anda.",
          "success"
        );
        closeResetModal();
      } else {
        Swal.fire("Gagal!", "Email tidak ditemukan atau terjadi error.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Terjadi kesalahan jaringan.", "error");
    }
  };

  // === RETURN UI ===
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#2c342f] overflow-hidden font-sans">
      <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
        {/* FORM LOGIN */}
        <div className="flex-1 flex items-center justify-center bg-[#2c342f]">
          <div className="bg-white rounded-3xl shadow-xl px-8 py-10 md:px-16 md:py-16 w-full max-w-md md:max-w-lg">
            <img
              src="logo.png"
              alt="Logo Alsindata"
              className="w-36 mx-auto mb-8 select-none pointer-events-none"
              draggable={false}
            />
            <div className="text-3xl md:text-2xl font-extrabold text-center mb-4 text-[#42594e] tracking-wide">
              LOGIN
            </div>
            <div className="text-base md:text-sm text-[#687c71] mb-8 text-center leading-relaxed">
              <b>
                Website Sistem Rekomendasi Penerimaan Alsintan <br />
                Dinas Ketahanan Pangan dan Pertanian Kabupaten Klaten
              </b>
            </div>
            <form className="space-y-7" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <label className="block mb-2 font-semibold text-[#37403c] text-base">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Email"
                  className="w-full px-5 py-3 rounded-lg border border-[#b7c6bc] bg-[#f5f7f5] text-[#27302b] font-normal text-base focus:outline-none focus:ring-2 focus:ring-[#9bada4] placeholder-gray-400 shadow"
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-[#37403c] text-base">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="***"
                  className="w-full px-5 py-3 rounded-lg border border-[#b7c6bc] bg-[#f5f7f5] text-[#27302b] font-normal text-base focus:outline-none focus:ring-2 focus:ring-[#9bada4] placeholder-gray-400 shadow"
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`cursor-pointer w-full py-4 rounded-lg bg-[#9bada4] hover:bg-[#7a9081] text-white font-bold text-xl shadow-lg transition-colors ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Loading..." : "Masuk"}
              </button>
            </form>
            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                className="text-sm text-[#42594e] mx-auto cursor-pointer hover:text-[#7a9081] font-semibold transition"
                onClick={openResetModal}
              >
                Lupa Password
              </button>
            </div>
            <div className="text-xs text-[#6b776a] mt-6 text-center select-none">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold">Alsindata</span>
            </div>
          </div>
        </div>

        {/* GAMBAR SAMPING */}
        <div className="hidden md:block w-1/2 min-h-full relative overflow-hidden rounded-l-3xl">
          <img
            src="alsintan.jpg"
            alt="alsintan"
            className="w-full h-full object-cover object-center rounded-l-3xl"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-l-3xl pointer-events-none"></div>
        </div>
      </div>

      {/* MODAL RESET PASSWORD */}
      {resetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="text-lg font-bold text-[#42594e] mb-3 text-center">
              Lupa Password
            </div>
            <form className="space-y-5" onSubmit={handleResetSubmit}>
              <div>
                <label className="block mb-2 font-medium text-[#37403c] text-base">
                  Email Anda
                </label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Email terdaftar"
                  className="w-full px-5 py-3 rounded-lg border border-[#b7c6bc] bg-[#f5f7f5] text-[#27302b] text-base focus:outline-none focus:ring-2 focus:ring-[#9bada4] placeholder-gray-400 shadow"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="px-6 py-2 rounded border text-[#37403c] font-semibold hover:bg-gray-100 cursor-pointer"
                  onClick={closeResetModal}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-6 py-2 rounded bg-[#9bada4] text-white font-semibold hover:bg-[#7a9081]"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
