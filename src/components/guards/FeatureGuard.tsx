"use client";

import { ReactNode } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { hasFeature } from "@/utils/permissionUtils";

interface Props {
  featureCode: string;
  children: ReactNode;
}

export default function FeatureGuard({
  featureCode,
  children,
}: Props) {
  const user = useAuthStore(state => state.userLogged);

  if (!hasFeature(user, featureCode)) {
    return null;
  }

  return <>{children}</>;
}