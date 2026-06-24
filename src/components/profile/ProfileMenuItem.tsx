"use client";

import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export default function ProfileMenuItem({ icon: Icon, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition flex items-center gap-3 cursor-pointer"
    >
      <Icon className="h-4 w-4 text-indigo-600" />

      {label}
    </button>
  );
}
