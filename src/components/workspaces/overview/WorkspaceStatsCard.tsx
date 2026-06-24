"use client";

import { CheckCircle, Clock3, ListTodo, Users } from "lucide-react";
import { WorkspaceOverviewResponse } from "@/types/workspaces/WorkspaceOverviewResponse";

interface Props {
  overview: WorkspaceOverviewResponse;
}

export default function WorkspaceStatsCards({ overview }: Props) {
  const stats = [
    {
      title: "Total Members",
      value: overview.totalMembers,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Tasks",
      value: overview.totalTasks,
      icon: ListTodo,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Completed Tasks",
      value: overview.completedTasks,
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Tasks",
      value: overview.pendingTasks,
      icon: Clock3,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div key={stat.title} className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <p className="mt-3 text-3xl font-bold text-gray-800">
                  {stat.value}
                </p>
              </div>

              <div className={`p-3 rounded-2xl ${stat.iconBg}`}>
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
