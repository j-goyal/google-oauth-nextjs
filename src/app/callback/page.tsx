"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import ConfirmModal from "@/components/ConfirmModal";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import { useGlobalLoader } from "@/store/useGlobalLoader";

export default function GoogleCallbackPage() {
  const router = useRouter();

  const {
    login,
    softDeletedUserEmail,
    confirmRestoreUser,
    clearSoftDeletedUser,
  } = useAuthStore();

  const { showLoader, hideLoader } = useGlobalLoader();

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
    showLoader();
    try {
      setIsRestoreModalOpen(false);
      await confirmRestoreUser();
      router.replace("/dashboard");
    } catch {
      console.error("Failed to restore account");
      router.replace("/sign-in");
    } finally {
      hideLoader();
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
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
        <main className="flex-1 flex items-center justify-center px-4 py-10 pt-30">
          <div className="z-10 backdrop-blur-xl bg-white/60 border border-white/30 rounded-3xl shadow-lg p-10 max-w-md text-center space-y-6">
            <div className="h-8 w-8 mx-auto border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <div className="flex justify-center text-lg font-semibold text-indigo-800 animate-pulse">
              Verifying your Google account...
            </div>
            <p className="text-gray-700 text-sm animate-fade-in">
              Please wait while we securely sign you in.
            </p>
          </div>
        </main>
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
