import { WorkspacePermission } from "@/enums/workspaces/workspacePermission";

export interface WorkspaceResponse {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
  permissions: WorkspacePermission[];
}