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
      <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
        <div className="text-center text-indigo-700 text-xl font-semibold">
          Processing Google login...
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