"use client";

import Image from "next/image";
import {CalendarDays, Mail, CheckCircle2} from "lucide-react";
import { UserDto } from "@/types/users/UsersDto";
import { formatDateTime } from "@/utils/dateUtils";
import { getRoleBadgeClass } from "@/utils/roleUtils";

interface UserAccessHeaderProps {
  user: UserDto;
}

export default function UserAccessHeader({
  user,
}: UserAccessHeaderProps) {
  const initials = user.name
    .split(" ")
    .map((x) => x[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-xl">

      {/* Decorative Background */}
      <div className="absolute -top-16 -right-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 px-8 py-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div className="flex items-center gap-6">

          {user.profilePic ? (
            <Image
              src={user.profilePic}
              alt={user.name}
              width={80}
              height={80}
              className="rounded-full border-4 border-white shadow-2xl"
            />
          ) : (
            <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full border-4 border-white bg-white/20 text-4xl font-bold text-white shadow-2xl backdrop-blur-sm">
              {initials}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {user.name}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-white/90">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>

            <div className="mt-5">
              <span
                className={`rounded-full px-4 py-1.5 text-sm font-semibold shadow ${getRoleBadgeClass(
                  user.role,
                )}`}
              >
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="min-w-[220px] rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <CalendarDays className="h-4 w-4" />
              Joined
            </div>

            <p className="mt-3 text-lg font-semibold text-white">
              {formatDateTime(user.createdAt)}
            </p>
          </div>

          <div className="min-w-[180px] rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircle2 className="h-4 w-4" />
              Status
            </div>

            <div className="mt-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                  user.isDeleted
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.isDeleted ? "Deleted" : "Active"}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}