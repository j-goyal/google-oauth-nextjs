"use client";

import { ReactNode } from "react";
import { WorkspacePermission } from "@/enums/workspaces/workspacePermission";
import { WorkspaceResponse } from "@/types/workspaces/WorkspaceResponse";
import { hasWorkspacePermission } from "@/utils/workspacePermissionUtils";

interface Props {
  workspace: WorkspaceResponse;
  permission: WorkspacePermission;
  children: ReactNode;
  fallback?: ReactNode;
}

export default function WorkspacePermissionGuard({
  workspace,
  permission,
  children,
  fallback = null,
}: Props) {
  if (!hasWorkspacePermission(workspace, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
