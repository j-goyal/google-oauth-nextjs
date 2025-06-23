"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const idToken = params.get("id_token");
      const error = params.get("error");
      const errorDescription = params.get("error_description");

      if (error) {
        toast.error(`Google Login Failed: ${errorDescription || error}`);
        router.replace("/sign-in");
        return;
      }

      if (!idToken) {
        toast.error("No ID Token found after Google login.");
        router.replace("/sign-in");
        return;
      }

      try {
        await login(idToken);
        router.replace("/dashboard");
      } catch (e) {
        console.error("Error during authentication:", e);
        toast.error("Failed to authenticate with backend.");
        router.replace("/sign-in");
      }
    };

    if (typeof window !== "undefined" && window.location.hash) {
      handleCallback();
    } else {
        router.replace("/sign-in");
    }

  }, [router, login]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <div className="text-center text-indigo-700 text-xl font-semibold">
        Processing Google login...
      </div>
    </div>
  );
}