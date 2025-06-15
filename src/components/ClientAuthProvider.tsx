"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useAuthStore.getState().verifyTokenOnLoad();
  }, []);

  return <>{children}</>;
}
