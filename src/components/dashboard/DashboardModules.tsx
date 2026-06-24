"use client";

import { useRouter } from "next/navigation";
import { BriefcaseBusiness, Monitor, Users } from "lucide-react";
import DashboardModuleCard from "./DashboardModuleCard";
import { useAuthStore } from "@/store/useAuthStore";
import { hasAnyRole } from "@/utils/roleUtils";
import { hasPermission } from "@/utils/permissionUtils";
import { ADMIN_ROLES } from "@/constants/userRoles";
import { Permissions } from "@/constants/permissions";

export default function DashboardModules() {
  const router = useRouter();
  const user = useAuthStore((state) => state.userLogged);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Modules</h2>

        <p className="text-sm text-gray-500">Access available features.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {hasPermission(user, Permissions.WORKSPACES_VIEW) && (
          <DashboardModuleCard
            title="Workspaces"
            description="Manage your workspaces and tasks."
            icon={BriefcaseBusiness}
            iconBg="bg-indigo-100"
            iconColor="text-indigo-600"
            onClick={() => router.push("/workspaces")}
          />
        )}

        <DashboardModuleCard
          title="Sessions"
          description="Manage your active sessions."
          icon={Monitor}
          iconBg="bg-pink-100"
          iconColor="text-pink-600"
          onClick={() => router.push("/sessions")}
        />

        {hasAnyRole(user.role, ADMIN_ROLES) && (
          <DashboardModuleCard
            title="Users"
            description="Manage users and permissions."
            icon={Users}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            onClick={() => router.push("/admin/users")}
          />
        )}
      </div>
    </div>
  );
}
