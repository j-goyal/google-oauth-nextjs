"use client";

import Image from "next/image";

interface AvatarProps {
  name?: string | null;
  profilePic?: string | null;
}

export default function Avatar({ name, profilePic }: AvatarProps) {
  const initials =
    name
      ?.split(" ")
      .map((x) => x[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "?";

  if (profilePic) {
    return (
      <Image
        src={profilePic}
        alt={name ?? "User"}
        className="rounded-full border border-gray-200 shrink-0"
        width={28}
        height={28}
      />
    );
  }

  return (
    <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center shrink-0">
      {initials}
    </div>
  );
}