"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/useAuthStore";
import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ConfirmModal";
import { useState } from "react";
import DashboardShimmer from "@/components/shimmer/DashboardShimmer";
import { useGlobalLoader } from "@/store/useGlobalLoader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardProfileCard from "@/components/dashboard/DashboardProfileCard";
import DashboardModules from "@/components/dashboard/DashboardModules";
import DashboardDangerZone from "@/components/dashboard/DashboardDangerZone";

export default function DashboardPage() {
  const { userLogged, deleteAccount } = useAuthStore();
  const { showLoader, hideLoader } = useGlobalLoader();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    showLoader();
    try {
      const res = await deleteAccount();
      if (res) router.push("/");
      setIsDeleteModalOpen(false);
    } finally {
      hideLoader();
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
        <Header />
        <AuthLayout skeleton={<DashboardShimmer />}>
          <main className="flex-1 pt-30 pb-10 px-4">
            <div className="max-w-5xl mx-auto space-y-6">
              <DashboardHeader user={userLogged} />
              <DashboardProfileCard user={userLogged} />
              <DashboardModules />
              <DashboardDangerZone onDeleteAccount={handleDeleteAccount} />
            </div>
          </main>
        </AuthLayout>
        <Footer />
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Account"
        message="Want to delete your account? You can still bring it back later — just sign in and confirm the restore."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}
