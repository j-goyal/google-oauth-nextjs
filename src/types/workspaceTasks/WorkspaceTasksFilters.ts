import { WorkspaceTaskStatus } from "@/enums/workspaceTasks/status";

export interface WorkspaceTaskFilters {
  fromDate?: Date;
  toDate?: Date;
  status?: WorkspaceTaskStatus;
  completedByUserId?: string;
}