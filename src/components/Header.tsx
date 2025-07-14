"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import ProfileDropdown from "@/components/ProfileDropdown";
import SignInButton from "@/components/SignInButton";
import HeaderShimmer from "./shimmer/HeaderShimmer";

export default function Header() {
  const { userLogged, isAuthResolved } = useAuthStore();

  return (
    <header className="bg-white shadow-md top-0 w-full fixed z-40 h-16">
      <div className="max-w-7xl mx-auto px-3 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          GoogleOAuth
        </Link>

        {/* Mobile */}
        <div className="flex md:hidden">
          {!isAuthResolved ? (
            <HeaderShimmer />
          ) : userLogged.isAuthenticated && userLogged.profilePic ? (
            <ProfileDropdown />
          ) : (
            <SignInButton />
          )}
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthResolved ? (
            <HeaderShimmer />
          ) : userLogged.isAuthenticated && userLogged.profilePic ? (
            <ProfileDropdown />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </header>
  );
}
