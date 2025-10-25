import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChartKelompokTani({ className }) {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    datasets: [
      {
        label: "Jumlah Kelompok Tani Penerima Bantuan",
        data: [10, 15, 12, 20, 18, 25, 30, 28, 22, 26, 24, 30],
        backgroundColor: "#9bada0",
        borderRadius: 10,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { left: 40, right: 30, top: 24, bottom: 56 },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} kelompok`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#64748b",
          font: { size: 12 },
          callback: (value) => value.toLocaleString(),
          maxTicksLimit: 8,
          stepSize: 5, // Interval 5
        },
        grid: { color: "#e2e8f0", clip: true },
      },
      x: {
        ticks: {
          color: "#64748b",
          font: { size: 12 },
          autoSkip: false,
        },
        grid: { display: false, clip: true },
      },
    },
  };

  return (
    <div
      className={`rounded-3xl bg-white shadow-lg overflow-hidden flex flex-col ${className}`}
    >
      <div className="flex flex-col mb-4 w-full">
        <h2 className="font-bold text-2xl text-gray-900 mt-4 ml-6">
          Grafik Poktan Penerima Alsintan
        </h2>
        <p className="text-gray-600 text-sm mt-2 ml-6">
          Jumlah kelompok tani yang menerima bantuan setiap bulan.
        </p>
      </div>
      <div className="flex-1 w-full h-full p-4">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
