import React from "react";
import StatCard from "../components/StatCard";
import RankingRecommendationCard from "../components/RankingRecommendationCard";
import GrafikKecamatan from "../components/GrafikKecamatan"; // grafik jumlah alsintan per kecamatan
import GrafikPoktan from "../components/GrafikPoktan"; // grafik jumlah poktan per bulan/tahun

export default function Dashboard() {
  return (
    <>
      <div className="bg-white w-full rounded-2xl px-5 py-5 mb-5">
        <div className="text-2xl font-bold text-gray-900 mb-2">
          Status Penerimaan Alsintan
        </div>
        <div className="text-gray-600 mb-5 text-sm">
          Jumlah permintaan alsintan yang telah diterima, dalam proses, dan
          dibatalkan.
        </div>
        <div className="flex justify-center gap-5">
          <StatCard />a
        </div>
      </div>
      <div
        className="flex gap-7 items-stretch"
        style={{ height: "calc(88vh - 210px)" }}
      >
        {/* Kolom kiri untuk ranking */}
        <div className="w-[400px] min-w-[350px] h-full">
          <RankingRecommendationCard className="h-full" />
        </div>
        {/* Kolom kanan split vertikal untuk grafik */}
        <div className="flex-1 flex flex-col gap-5 h-full">
          {/* Dot plot (setengah atas) */}
          <div className="flex-1 min-h-0 h-1/2">
            <GrafikKecamatan className="w-full h-full" />
          </div>
          {/* Grafik jumlah poktan (setengah bawah) */}
          <div className="flex-1 min-h-0 h-1/2">
            <GrafikPoktan className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
}
