import { WorkspaceMemberRole } from "@/enums/workspaceMembers/memberRole";

export interface WorkspaceMemberResponse {
  userId: string;
  name: string;
  email: string;
  workspaceRole: WorkspaceMemberRole;
  joinedAt: string;
}
