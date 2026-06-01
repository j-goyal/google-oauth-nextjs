import { USER_ROLES } from "@/constants/userRoles";

export const hasAnyRole = (
  userRole: string | null | undefined,
  allowedRoles: string[],
) => {
  return !!userRole && allowedRoles.includes(userRole.toLowerCase());
};

export const getRoleBadgeClass = (role?: string | null) => {
  switch (role?.toLowerCase()) {
    case USER_ROLES.SUPERADMIN:
      return "bg-red-100 text-red-700";
    case USER_ROLES.ADMIN:
      return "bg-blue-100 text-blue-700";
    case USER_ROLES.USER:
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
