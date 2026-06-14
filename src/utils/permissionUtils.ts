import { CurrentUser } from "@/store/useAuthStore";

export function hasFeature(
  user: CurrentUser | null,
  featureCode: string,
): boolean {
  if (!user) {
    return false;
  }

  return user.permissions.some((permission) =>
    permission.startsWith(`${featureCode}:`),
  );
}

export function hasPermission(
  user: CurrentUser | null,
  permission: string,
): boolean {
  if (!user) {
    return false;
  }

  return user.permissions.includes(permission);
}

export function hasAnyPermission(
  user: CurrentUser | null,
  permissions: string[],
): boolean {
  if (!user) {
    return false;
  }

  return permissions.some((permission) => hasPermission(user, permission));
}

export function hasAllPermissions(
  user: CurrentUser | null,
  permissions: string[],
): boolean {
  if (!user) {
    return false;
  }

  return permissions.every((permission) => hasPermission(user, permission));
}
