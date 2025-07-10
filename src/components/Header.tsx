"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import ProfileDropdown from "@/components/ProfileDropdown";
import SignInButton from "@/components/SignInButton";

export default function Header() {
  const { userLogged } = useAuthStore();

  return (
    <header className="bg-white shadow-md top-0 w-full sticky z-40">
      <div className="max-w-7xl mx-auto px-3 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          GoogleOAuth
        </Link>

        {/* Mobile */}
        <div className="flex md:hidden">
          {userLogged.isAuthenticated && userLogged.profilePic ? (
            <ProfileDropdown />
          ) : (
            <SignInButton />
          )}
        </div>
        
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {userLogged.isAuthenticated && userLogged.profilePic ? (
            <ProfileDropdown />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </header>
  );
}
