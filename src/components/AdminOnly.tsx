import RoleGuard from "./RoleGuard";
import { USER_ROLES } from "@/constants/userRoles";

export default function AdminOnly({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN]}>
      {children}
    </RoleGuard>
  );
}
