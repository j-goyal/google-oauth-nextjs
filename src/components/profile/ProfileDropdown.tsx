"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, Monitor, Users, BriefcaseBusiness } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useGlobalLoader } from "@/store/useGlobalLoader";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMenuSection from "@/components/profile/ProfileMenuSection";
import ProfileMenuItem from "@/components/profile/ProfileMenuItem";
import { hasAnyRole } from "@/utils/roleUtils";
import { hasPermission } from "@/utils/permissionUtils";
import { ADMIN_ROLES } from "@/constants/userRoles";
import { Permissions } from "@/constants/permissions";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { userLogged, logoutCurrentSession } = useAuthStore();
  const { showLoader, hideLoader } = useGlobalLoader();

  const handleLogout = async () => {
    showLoader();

    try {
      await logoutCurrentSession();

      router.replace("/");

      setIsOpen(false);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest("#profile-dropdown-wrapper")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div id="profile-dropdown-wrapper" className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer rounded-full hover:ring-2 ring-indigo-300 transition"
      >
        {userLogged.profilePic && (
          <Image
            src={userLogged.profilePic}
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full border-2 border-indigo-500 shadow-sm"
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: -5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -5,
            }}
            transition={{
              duration: 0.25,
            }}
            className="absolute right-0 mt-2 w-72 rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden z-50"
          >
            <ProfileHeader user={userLogged} />

            <hr />

            <ProfileMenuSection title="Account">
              <ProfileMenuItem
                icon={LayoutGrid}
                label="Dashboard"
                onClick={() => {
                  router.push("/dashboard");
                  setIsOpen(false);
                }}
              />

              <ProfileMenuItem
                icon={Monitor}
                label="My Sessions"
                onClick={() => {
                  router.push("/sessions");
                  setIsOpen(false);
                }}
              />
            </ProfileMenuSection>

            {hasPermission(userLogged, Permissions.WORKSPACES_VIEW) && (
              <>
                <hr />

                <ProfileMenuSection title="Workspace">
                  <ProfileMenuItem
                    icon={BriefcaseBusiness}
                    label="My Workspaces"
                    onClick={() => {
                      router.push("/workspaces");
                      setIsOpen(false);
                    }}
                  />
                </ProfileMenuSection>
              </>
            )}

            {hasAnyRole(userLogged.role, ADMIN_ROLES) && (
              <>
                <hr />

                <ProfileMenuSection title="Administration">
                  <ProfileMenuItem
                    icon={Users}
                    label="Users"
                    onClick={() => {
                      router.push("/admin/users");
                      setIsOpen(false);
                    }}
                  />
                </ProfileMenuSection>
              </>
            )}

            <hr />

            <div className="p-3">
              <button
                onClick={handleLogout}
                className="w-full rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
