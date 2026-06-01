import RoleGuard from "./RoleGuard";
import { USER_ROLES } from "@/constants/userRoles";

export default function SuperAdminOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={[USER_ROLES.SUPERADMIN]}>{children}</RoleGuard>
  );
}
