import { WorkspacePermission } from "@/enums/workspaces/workspacePermission";
import { UserBasicInfoResponse } from "@/types/common/UserBasicInfoResponse";

export interface WorkspaceResponse {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
  permissions: WorkspacePermission[];
  owner?: UserBasicInfoResponse;
}