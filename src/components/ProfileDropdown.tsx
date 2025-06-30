"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { userLogged, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/");
    logout();
    setIsOpen(false);
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
        className="focus:outline-none cursor-pointer"
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

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl z-50">
          <div className="p-4 space-y-2 text-sm text-gray-800">
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
              <p className="text-xs italic text-gray-500 break-all">
                {userLogged.email}
              </p>
            </div>
            <hr className="border-t border-gray-200" />
            <button
              onClick={handleLogout}
              className="w-full text-center text-red-600 hover:text-red-700 hover:underline transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
