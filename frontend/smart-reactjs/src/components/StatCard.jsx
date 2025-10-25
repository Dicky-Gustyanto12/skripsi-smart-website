// StatusAlsintanWidgetFullWidth.jsx
import React from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const cardData = [
  {
    title: "Diterima",
    value: 76,
    change: "+12%",
    icon: <CheckCircleIcon className="w-6 h-6 text-white" />,
    bg: "bg-[#9bada0]",
    color: "bg-[#9bada0]",
  },
  {
    title: "Proses",
    value: 15,
    change: "+3%",
    icon: <ClockIcon className="w-6 h-6 text-white" />,
    bg: "bg-[#fda366]",
    color: "text-yellow-500",
  },
  {
    title: "Dibatalkan",
    value: 3,
    change: "-2%",
    icon: <XCircleIcon className="w-6 h-6 text-white" />,
    bg: "bg-red-400",
    color: "",
  },
];

const StatusAlsintanWidgetFullWidth = () => (
  <div className="flex gap-6 w-full">
    {cardData.map((c, idx) => (
      <div key={idx} className={`rounded-xl shadow-sm p-6 ${c.bg} flex-1`}>
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-white">{c.title}</span>
          {c.icon}
        </div>
        <div className="text-3xl font-bold text-white mb-2">{c.value}</div>
      </div>
    ))}
  </div>
);

export default StatusAlsintanWidgetFullWidth;
