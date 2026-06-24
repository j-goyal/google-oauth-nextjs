"use client";

import { ReactNode } from "react";

interface Props {
  label: string;
  value: ReactNode;
}

export default function DetailRow({ label, value }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 py-4 border-b last:border-b-0">
      <div className="text-sm text-gray-500 min-w-[130px]">{label}</div>

      <div className="flex-1 text-gray-800 font-medium">{value}</div>
    </div>
  );
}
