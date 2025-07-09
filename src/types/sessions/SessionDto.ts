export interface SessionDto {
  browser: string;
  os: string;
  deviceType: string;
  ip: string;
  createdAt: string;
  lastUsed: string | null;
  isCurrent: boolean;
}
