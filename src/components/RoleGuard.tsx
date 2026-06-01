"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { userLogged } = useAuthStore();
  const router = useRouter();

  const role = userLogged?.role?.toLowerCase();

  const isAllowed =
    !!role &&
    allowedRoles.some((allowedRole) => allowedRole.toLowerCase() === role);

  useEffect(() => {
    if (userLogged && !isAllowed) {
      router.replace("/403");
    }
  }, [userLogged, isAllowed, router]);

  if (!userLogged) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
}
