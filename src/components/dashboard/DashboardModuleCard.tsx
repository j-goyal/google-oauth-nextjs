"use client";

import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  onClick: () => void;
}

export default function DashboardModuleCard({
  title,
  description,
  icon: Icon,
  iconBg,
  iconColor,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl shadow-xl p-6 text-left hover:-translate-y-1 hover:shadow-2xl transition"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${iconBg}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>

          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  );
}
