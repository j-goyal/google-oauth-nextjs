"use client";

import { ReactNode } from "react";

interface Props {
  label: string;
  value: ReactNode;
}

export default function InfoRow({ label, value }: Props) {
  return (
    <div className="flex items-start py-3 border-b border-gray-100 last:border-0">
      <div className="w-32 text-xs text-gray-500 shrink-0">{label}</div>

      <div className="flex-1 text-sm text-gray-800">{value}</div>
    </div>
  );
}
