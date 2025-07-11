"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import ConfirmModal from "@/components/ConfirmModal";
import toast from "react-hot-toast";
import Header from "@/components/Header";

export default function GoogleCallbackPage() {
  const router = useRouter();

  const {
    login,
    softDeletedUserEmail,
    confirmRestoreUser,
    clearSoftDeletedUser,
  } = useAuthStore();

  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("id_token");
      const error = params.get("error");
      const errorDescription = params.get("error_description");

      if (error) {
        toast.error(`Google Login Failed: ${errorDescription || error}`);
        router.replace("/sign-in");
        return;
      }

      if (!token) {
        toast.error("No ID Token found after Google login.");
        router.replace("/sign-in");
        return;
      }

      try {
        const result = await login(token);
        if (result === "success") {
          router.replace("/dashboard");
        } else if (result === "error") {
          router.replace("/sign-in");
        }
      } catch {
        console.error("Login failed completely.");
        router.replace("/sign-in");
      }
    };

    if (typeof window !== "undefined" && window.location.hash) {
      handleCallback();
    } else {
      router.replace("/sign-in");
    }
  }, [router, login]);

  useEffect(() => {
    if (softDeletedUserEmail) {
      setIsRestoreModalOpen(true);
    }
  }, [softDeletedUserEmail]);

  const handleRestoreConfirm = async () => {
    try {
      await confirmRestoreUser();
      router.replace("/dashboard");
    } catch {
      console.error("Failed to restore account");
      router.replace("/sign-in");
    }
  };

  const handleRestoreCancel = () => {
    clearSoftDeletedUser();
    toast.error("Account Restoration Cancelled.");
    router.replace("/sign-in");
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
        <div className="z-10 backdrop-blur-md bg-white/60 border border-white/30 rounded-2xl shadow-lg px-6 py-8 max-w-sm w-full text-center space-y-4">
          <div className="h-8 w-8 mx-auto border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-lg font-semibold text-indigo-800">
            Processing Google login...
          </div>
          <div className="text-sm text-gray-700">
            Please wait while we verify your account.
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isRestoreModalOpen}
        title="Restore Deleted Account"
        message="Your account was previously deleted. Do you want to restore it?"
        confirmText="Restore"
        cancelText="Cancel"
        onConfirm={handleRestoreConfirm}
        onCancel={handleRestoreCancel}
      />
    </>
  );
}
