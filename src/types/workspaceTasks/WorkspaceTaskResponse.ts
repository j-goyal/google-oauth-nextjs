import { WorkspaceTaskStatus } from "@/enums/workspaceTasks/status";
import { UserBasicInfoResponse } from "@/types/common/UserBasicInfoResponse";

export interface WorkspaceTaskResponse {
  id: string;
  workspaceId: string;
  taskDate: string;
  title: string;
  description?: string | null;
  status: WorkspaceTaskStatus;
  createdBy?: UserBasicInfoResponse;
  completedBy?: UserBasicInfoResponse;
  completionComment?: string | null;
  completedAt?: string | null;
  createdAt: string;
}
