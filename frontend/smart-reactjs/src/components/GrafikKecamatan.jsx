import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

export default function DotPlotDistribusiKelompokTani({ className }) {
  const labels = [
    "Wonosari",
    "Karangdowo",
    "Juwiring",
    "Cawas",
    "Polanharjo",
    "Karanganom",
    "Trucuk",
    "Gantiwarno",
    "Delanggu",
    "Ngawen",
    "Jogonalan",
    "Manisrenggo",
    "Tulung",
    "Wedi",
    "Prambanan",
    "Ceper",
    "Karangnongko",
    "Klaten Selatan",
    "Kebonarum",
    "Kalikotes",
    "Pedan",
    "Bayat",
    "Klaten Utara",
    "Klaten Tengah",
    "Wedi Timur",
    "Wedi Barat",
  ].slice(0, 26);

  const dataJumlah = [
    70, 55, 45, 60, 50, 47, 42, 38, 35, 30, 33, 28, 26, 23, 21, 20, 19, 15, 14,
    12, 10, 9, 11, 13, 8, 7,
  ].slice(0, 26);

  const data = {
    datasets: [
      {
        label: "Kelompok Tani per Kecamatan",
        data: labels.map((kec, i) => ({
          x: kec,
          y: dataJumlah[i],
        })),
        backgroundColor: "#9bada0",
        pointRadius: 6,
        pointStyle: "circle",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.x}: ${ctx.parsed.y} kelompok`,
        },
      },
    },
    scales: {
      x: {
        type: "category",
        labels: labels,
        title: { display: true, text: "Kecamatan" },
        ticks: {
          autoSkip: false,
          maxRotation: 65,
          minRotation: 30,
          font: { size: 12 },
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Jumlah Kelompok Tani" },
        min: 0,
        max: Math.max(...dataJumlah) + 10,
        grid: { color: "#e2e8f0", borderDash: [4, 2] },
      },
    },
  };

  return (
    <div
      className={`rounded-3xl bg-white shadow-lg flex flex-col p-4 w-full ${className}`}
    >
      <h2 className="font-bold text-2xl text-gray-900 ml-6">
        Grafik Pengajuan Alsintan tiap Kecamatan
      </h2>
      <p className="text-gray-600 text-sm mt-2 ml-6 mb-2">
        Grafik kelompok tani yang mengajukan bantuan alsintan setiap bulan.
      </p>
      <div style={{ width: "100%", height: "420px" }}>
        <Scatter data={data} options={options} />
      </div>
    </div>
  );
}
