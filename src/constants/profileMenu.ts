import { CurrentUser } from "@/store/useAuthStore";
import { LucideIcon } from "lucide-react";

export interface ProfileMenuItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  action?: "logout";
  visible?: (user: CurrentUser) => boolean;
}

export interface ProfileMenuSection {
  title: string;
  items: ProfileMenuItem[];
}