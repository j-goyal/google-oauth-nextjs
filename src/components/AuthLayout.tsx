"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ManageAuth } from "@/services/ManageAuth.module";
import AxiosMethods from "@/lib/AxiosMethods";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const resetUser = useAuthStore((s) => s.resetUser);

  const authService = ManageAuth();

  useEffect(() => {
    const verify = async () => {
      try {
        const storedToken = AxiosMethods.getToken();
        if(!storedToken){
          resetUser();
          router.replace("/sign-in")
        }
        const res = await authService.getCurrentUser();
        if (res.success) {
          setUser({ ...res.data, isAuthenticated: true });
          setVerified(true);
        } else {
          throw new Error();
        }
      } catch {
        resetUser();
        router.replace("/sign-in");
      }
    };

    verify();
  }, []);

  return verified ? <>{children}</> : null;
}
