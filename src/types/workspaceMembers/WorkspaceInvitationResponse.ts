export interface WorkspaceInvitationResponse {
  joinCode: string;
  joinUrl: string;
  isInvitationActive: boolean;
  joinCodeLastGeneratedAt?: string;
}