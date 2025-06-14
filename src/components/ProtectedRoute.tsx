"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userLogged } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!userLogged.isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [userLogged]);

  return userLogged.isAuthenticated ? <>{children}</> : null;
}
