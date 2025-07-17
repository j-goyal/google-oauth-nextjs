"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useGlobalLoader } from "@/store/useGlobalLoader";
import { Clock, LayoutGrid, Monitor, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { userLogged, logoutCurrentSession } = useAuthStore();
  const { showLoader, hideLoader } = useGlobalLoader();
  const router = useRouter();

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
        className="focus:outline-none cursor-pointer hover:ring-2 ring-indigo-300 transition rounded-full"
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
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.6 }}
            className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-2xl z-50"
          >
            <div className="p-4 space-y-2 text-sm text-gray-800">
              {/* User Info */}
              <div className="flex flex-col items-center gap-1">
                {userLogged.profilePic && (
                  <Image
                    src={userLogged.profilePic}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-indigo-500 shadow-sm"
                  />
                )}
                <div className="flex items-center gap-2">
                  <p className="font-medium">{userLogged.name}</p>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      userLogged?.role?.toLowerCase() === "admin"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {userLogged.role}
                  </span>
                </div>
                <p className="text-xs italic text-gray-600 break-all">
                  {userLogged.email}
                </p>
                {userLogged.lastLoginAt && (
                  <p className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last login:{" "}
                    {new Date(userLogged.lastLoginAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    })}
                  </p>
                )}
              </div>

              <hr className="border-t border-gray-200" />

              {/* Navigation Links */}
              <div className="flex flex-col gap-1 items-center">
                <button
                  onClick={() => {
                    router.push("/dashboard");
                    setIsOpen(false);
                  }}
                  className="w-full px-1 py-1 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer flex justify-center items-center gap-2"
                >
                  <LayoutGrid className="w-4 h-4 text-teal-600" />
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    router.push("/sessions");
                    setIsOpen(false);
                  }}
                  className="w-full px-1 py-1 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer flex justify-center items-center gap-2"
                >
                  <Monitor className="w-4 h-4 text-pink-600" />
                  My Sessions
                </button>

                {userLogged?.role?.toLowerCase() === "admin" && (
                  <button
                    onClick={() => {
                      router.push("/admin/users");
                      setIsOpen(false);
                    }}
                    className="w-full px-1 py-1 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer flex justify-center items-center gap-2"
                  >
                    <Users className="w-4 h-4 text-indigo-600" />
                    View Users
                  </button>
                )}
              </div>

              <hr className="border-t border-gray-200" />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full text-center text-red-600 hover:bg-red-50 hover:text-red-700 py-1 rounded-md transition-colors duration-200 cursor-pointer"
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
