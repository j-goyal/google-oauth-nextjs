import Link from "next/link";
import React from "react";

export default function SignInButton() {
  return (
    <Link
      href="/sign-in"
      className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm shadow hover:bg-indigo-700 transition"
    >
      Sign In
    </Link>
  );
}
