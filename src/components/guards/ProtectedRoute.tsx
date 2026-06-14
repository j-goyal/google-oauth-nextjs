"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { hasPermission } from "@/utils/permissionUtils";

interface Props {
  permission: string;
  children: ReactNode;
}

export default function ProtectedRoute({ permission, children }: Props) {
  const router = useRouter();

  const user = useAuthStore((state) => state.userLogged);

  const allowed = hasPermission(user, permission);

  useEffect(() => {
    if (!allowed) {
      router.replace("/403");
    }
  }, [allowed, router]);

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}

// "use client";

// import { ReactNode, useEffect } from "react";
// import { useAuthStore } from "@/store/useAuthStore";
// import { hasPermission } from "@/utils/permissionUtils";

// interface Props {
//   permission: string;
//   children: ReactNode;
//   fallback?: ReactNode;
// }

// export default function ProtectedRoute({
//   permission,
//   children,
//   fallback = null,
// }: Props) {
//   const user = useAuthStore((state) => state.userLogged);

//   if (!hasPermission(user, permission)) {
//     return <>{fallback}</>;
//   }

//   return <>{children}</>;
// }
