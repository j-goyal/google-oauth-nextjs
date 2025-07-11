"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/constants/userRoles";

export default function AdminOnly({ children }: { children: React.ReactNode }) {
  const { userLogged } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (userLogged?.role?.toLowerCase() !== USER_ROLES.ADMIN) {
      router.replace("/403");
    }
  }, [userLogged, router]);

  if (!userLogged || userLogged.role?.toLowerCase() !== USER_ROLES.ADMIN) {
    return <div className="flex-1" />;
  }

  return <>{children}</>;
}
