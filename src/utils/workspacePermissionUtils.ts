import { WorkspacePermission } from "@/enums/workspaces/workspacePermission";
import { WorkspaceResponse } from "@/types/workspaces/WorkspaceResponse";

export function hasWorkspacePermission(
  workspace: WorkspaceResponse | null,
  permission: WorkspacePermission,
): boolean {
  return workspace?.permissions.includes(permission) ?? false;
}

export function hasAnyWorkspacePermission(
  workspace: WorkspaceResponse | null,
  permissions: WorkspacePermission[],
): boolean {
  return permissions.some(permission =>
    workspace?.permissions.includes(permission) ?? false,
  );
}

export function hasAllWorkspacePermissions(
  workspace: WorkspaceResponse | null,
  permissions: WorkspacePermission[],
): boolean {
  return permissions.every(permission =>
    workspace?.permissions.includes(permission) ?? false,
  );
}