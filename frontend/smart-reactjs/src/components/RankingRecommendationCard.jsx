import React from "react";
import { UserGroupIcon } from "@heroicons/react/24/outline";

const rekomendasiKelompokTani = [
  { id: 1, nama: "Poktan Sumber Makmur", kode: "KLP001" },
  { id: 2, nama: "Poktan Tani Maju", kode: "KLP002" },
  { id: 3, nama: "Poktan Tunas Harapan", kode: "KLP003" },
  { id: 4, nama: "Poktan Makmur Sejahtera", kode: "KLP004" },
  { id: 5, nama: "Poktan Lestari", kode: "KLP005" },
];

const RankingRecommendationCard = ({ className }) => (
  <div
    className={`max-w-full rounded-3xl bg-white shadow-lg p-6 py-5 flex flex-col ${className}`}
  >
    <div className="flex justify-between items-center mb-2">
      <span className="font-bold text-2xl text-[#2c342f]">
        Ranking Kelompok Tani
      </span>
    </div>
    <span className="text-sm text-gray-500">
      Urutan ranking berdasarkan algoritma SMART.
    </span>
    <div className="space-y-3 mt-5 flex-1 overflow-auto ">
      {rekomendasiKelompokTani.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center gap-3 p-3 rounded-lg shadow ${
            index === 0 ? "bg-[#9bada0] shadow" : "bg-[#b2b2b2]"
          }`}
        >
          <span className="font-extrabold text-3xl min-w-[32px] text-center text-white">
            {index + 1}
          </span>
          <UserGroupIcon className="w-10 h-10 rounded-full bg-white p-2 text-gray-600" />
          <div>
            <div className="font-bold text-white text-shadow-xl">
              {item.nama}
            </div>
            <div className="text-xs text-gray-100">{item.kode}</div>
            {index === 0 && (
              <div className="text-xs text-white font-semibold">
                Sangat Direkomendasikan
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RankingRecommendationCard;
