"use client";

import { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
}

export default function ProfileMenuSection({ title, children }: Props) {
  return (
    <div className="px-3 py-2">
      {title && (
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
          {title}
        </p>
      )}

      <div className="space-y-1">{children}</div>
    </div>
  );
}
