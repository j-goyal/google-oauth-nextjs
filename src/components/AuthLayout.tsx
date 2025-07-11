"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import AxiosMethods from "@/lib/AxiosMethods";
import { ManageMe } from "@/services/ManageMe.module";

interface Props {
  children: React.ReactNode;
  skeleton?: React.ReactNode;
}

export default function AuthLayout({ children, skeleton }: Props) {
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const resetUser = useAuthStore((s) => s.resetUser);
  
  const meService = ManageMe();

  useEffect(() => {
    const verify = async () => {
      try {
        const storedToken = AxiosMethods.getToken();
        if (!storedToken) {
          resetUser();
          router.replace("/sign-in");
          return;
        }
        const res = await meService.getCurrentUser();
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

  return (
    <>
      {verified ? children : skeleton ?? null}
    </>
  );
}
