"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { userLogged, logout } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    router.replace("/");
    logout();
  };

  return (
    <header className="bg-white shadow-md top-0 w-full sticky z-50">
      <div className="max-w-7xl mx-auto px-3 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          GoogleOAuth
        </Link>

        {/* Mobile Navigation */}
        <div className="md:hidden relative">
          {userLogged.isAuthenticated && userLogged.profilePic ? (
            <>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none"
              >
                <Image
                  src={userLogged.profilePic}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-indigo-500 shadow-sm"
                />
              </button>
              {isOpen && (
                <div className="absolute right-2 top-12 w-56 rounded-xl border border-gray-200 bg-white shadow-xl z-50">
                  <div className="relative">
                    <div className="p-4 space-y-2 text-sm text-gray-800">
                      <div className="flex flex-col items-center gap-1">
                        <Image
                          src={userLogged.profilePic}
                          alt="Profile"
                          width={48}
                          height={48}
                          className="rounded-full border border-indigo-200 shadow"
                        />
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
                        className="w-full text-center text-red-600 hover:text-red-700 hover:underline transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link
              href="/sign-in"
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm shadow hover:bg-indigo-700 transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {userLogged.isAuthenticated ? (
            <>
              <span className="text-sm text-gray-700">{userLogged.name}</span>
              {userLogged.profilePic && (
                <Image
                  src={userLogged.profilePic}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:underline cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm shadow hover:bg-indigo-700 transition"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
