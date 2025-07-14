"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function ClientAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const verifyTokenOnLoad = useAuthStore((s) => s.verifyTokenOnLoad);

  useEffect(() => {
    verifyTokenOnLoad();
  }, [verifyTokenOnLoad]);

  return <>{children}</>;
}
