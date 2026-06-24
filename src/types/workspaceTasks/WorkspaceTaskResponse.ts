import { WorkspaceTaskStatus } from "@/enums/workspaceTasks/status";

export interface WorkspaceTaskResponse {
  id: string;
  workspaceId: string;
  taskDate: string;

  title: string;
  description?: string | null;

  status: WorkspaceTaskStatus;

  createdByUserId?: string | null;
  createdByUserName?: string | null;
  createdByUserProfilePic?: string | null;

  completedByUserId?: string | null;
  completedByUserName?: string | null;
  completedByUserProfilePic?: string | null;

  completionComment?: string | null;

  completedAt?: string | null;
  createdAt: string;
}
