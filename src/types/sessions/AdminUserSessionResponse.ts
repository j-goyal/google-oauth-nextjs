export interface AdminUserSessionResponse {
  sessionId: string;
  browser?: string;
  os?: string;
  deviceType?: string;
  ip?: string;
  createdAt: string;
  lastUsed?: string | null;
  expiresAt: string;
  absoluteExpiresAt?: string | null;
  revoked: boolean;
  status: string;
}
