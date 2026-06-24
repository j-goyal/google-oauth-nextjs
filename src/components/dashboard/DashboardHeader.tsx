"use client";

import { Sparkles } from "lucide-react";
import { CurrentUser } from "@/store/useAuthStore";

interface Props {
  user: CurrentUser;
}

export default function DashboardHeader({ user }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">
      <div className="relative p-8 flex items-center justify-between gap-6">
        {/* Left */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2">
            <Sparkles className="h-4 w-4 text-indigo-600" />

            <span className="text-sm font-medium text-indigo-700">
              Dashboard
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-800">
            Welcome back, {user.name} 👋
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500 leading-relaxed">
            Manage your sessions and application modules from one
            place.
          </p>
        </div>
      </div>
    </div>
  );
}
