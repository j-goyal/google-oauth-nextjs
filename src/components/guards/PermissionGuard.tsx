"use client";

import { ReactNode } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { hasPermission } from "@/utils/permissionUtils";

interface Props {
  permission: string;
  children: ReactNode;
}

export default function PermissionGuard({ permission, children }: Props) {
  const user = useAuthStore((state) => state.userLogged);

  if (!hasPermission(user, permission)) {
    return null;
  }

  return <>{children}</>;
}
