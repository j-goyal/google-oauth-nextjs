"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { userLogged, logout } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-white shadow-md top-0 w-full sticky z-50">
      <div className="max-w-7xl mx-auto px-3 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          GoogleOAuth
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-indigo-600 focus:outline-none"
          >
            <Menu size={28} />
          </button>
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

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow px-4 pb-4">
          {userLogged.isAuthenticated ? (
            <>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  {userLogged.profilePic && (
                    <Image
                      src={userLogged.profilePic}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-700">
                    {userLogged.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    router.push("/")
                  }}
                  className="text-sm text-red-600 hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/sign-in"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
