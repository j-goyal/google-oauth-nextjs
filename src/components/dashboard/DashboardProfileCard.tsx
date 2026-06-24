"use client";

import { Mail, Shield, Clock3, User } from "lucide-react";
import { CurrentUser } from "@/store/useAuthStore";
import { formatDateTime } from "@/utils/dateUtils";

interface Props {
  user: CurrentUser;
}

export default function DashboardProfileCard({ user }: Props) {
  const cards = [
    {
      title: "Name",
      value: user.name,
      icon: User,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Role",
      value: user.role,
      icon: Shield,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Email",
      value: user.email,
      icon: Mail,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Last Login",
      value: user.lastLoginAt ? formatDateTime(user.lastLoginAt) : "—",
      icon: Clock3,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Profile Information
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Information about your account.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${card.iconBg}`}>
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500">{card.title}</p>

                  <p className="mt-2 font-semibold text-gray-800 break-all">
                    {card.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
