"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import { CurrentUser } from "@/store/useAuthStore";
import { getRoleBadgeClass } from "@/utils/roleUtils";
import { formatDateTime } from "@/utils/dateUtils";

interface Props {
  user: CurrentUser;
}

export default function ProfileHeader({ user }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 p-4">
      {user.profilePic && (
        <Image
          src={user.profilePic}
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full border-2 border-indigo-500 shadow-sm"
        />
      )}

      <div className="flex items-center gap-2">
        <p className="font-medium text-gray-800">{user.name}</p>

        <span
          className={`px-2 py-0.5 text-xs rounded-full ${getRoleBadgeClass(
            user.role,
          )}`}
        >
          {user.role}
        </span>
      </div>

      <p className="text-xs italic text-gray-600 break-all">{user.email}</p>

      {user.lastLoginAt && (
        <p className="text-[11px] text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Last login {formatDateTime(user.lastLoginAt)}
        </p>
      )}
    </div>
  );
}
