import {
  Briefcase,
  FolderKanban,
  Users,
  ShieldCheck,
  LayoutGrid,
  KeyRound,
  LucideIcon,
} from "lucide-react";

const FEATURE_ICON_MAP: Record<string, LucideIcon> = {
  USERS: Users,
  ROLES: ShieldCheck,
  FEATURES: LayoutGrid,
  PERMISSIONS: KeyRound,
  WORKSPACES: FolderKanban,
};

export function getFeatureIcon(featureCode: string): LucideIcon {
  return FEATURE_ICON_MAP[featureCode] ?? Briefcase;
}

export function getFeatureColor(featureCode: string): string {
  switch (featureCode) {
    case "USERS":
      return "text-blue-600";

    case "ROLES":
      return "text-emerald-600";

    case "FEATURES":
      return "text-orange-600";

    case "PERMISSIONS":
      return "text-red-600";

    case "WORKSPACES":
      return "text-purple-600";

    default:
      return "text-indigo-600";
  }
}

export function getFeatureGradient(featureCode: string): string {
  switch (featureCode) {
    case "USERS":
      return "from-blue-500 to-cyan-500";

    case "ROLES":
      return "from-emerald-500 to-green-500";

    case "FEATURES":
      return "from-orange-500 to-amber-500";

    case "PERMISSIONS":
      return "from-red-500 to-rose-500";

    case "WORKSPACES":
      return "from-purple-500 to-indigo-500";

    default:
      return "from-indigo-500 to-purple-500";
  }
}
