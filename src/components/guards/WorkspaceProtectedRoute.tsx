"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WorkspacePermission } from "@/enums/workspaces/workspacePermission";
import { hasWorkspacePermission } from "@/utils/workspacePermissionUtils";
import { WorkspaceResponse } from "@/types/workspaces/WorkspaceResponse";

interface Props {
  workspace: WorkspaceResponse;
  permission: WorkspacePermission;
  children: ReactNode;
}

export default function WorkspaceProtectedRoute({
  workspace,
  permission,
  children,
}: Props) {
  const router = useRouter();

  const allowed = hasWorkspacePermission(workspace, permission);

  useEffect(() => {
    if (!allowed) {
      router.replace("/403");
    }
  }, [allowed, router]);

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}
