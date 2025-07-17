"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ConfirmModal";
import { useState } from "react";
import { USER_ROLES } from "@/constants/userRoles";
import {
  Monitor,
  Users,
  LogOut,
  Trash2,
  CheckCircle,
  Clock3,
  Wrench
} from "lucide-react";
import DashboardShimmer from "@/components/shimmer/DashboardShimmer";
import { useGlobalLoader } from "@/store/useGlobalLoader";

export default function DashboardPage() {
  const { userLogged, deleteAccount, logoutCurrentSession } = useAuthStore();
  const { showLoader, hideLoader } = useGlobalLoader();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleLogout = async () => {
    showLoader();
    try {
      await logoutCurrentSession();
      router.push("/");
    } finally {
      hideLoader();
    }
  };

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
          <main className="flex-1 pt-30 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-6">
              {/* Header Section */}
              <div className="flex justify-between items-center border-b pb-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {userLogged.name} 👋
                  </h1>
                  <p className="text-sm text-gray-500">
                    Here’s your dashboard overview
                  </p>
                </div>
                {userLogged.profilePic && (
                  <Image
                    src={userLogged.profilePic}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full border-2 border-indigo-300 shadow-md"
                  />
                )}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 text-center">
                <div className="p-5 rounded-xl bg-indigo-100 text-indigo-800 shadow-md">
                  <h3 className="font-semibold text-lg mb-1">Your Email</h3>
                  <p className="text-sm break-words sm:break-normal">
                    {userLogged.email}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-yellow-100 text-yellow-800 shadow-md">
                  <h3 className="font-semibold text-lg mb-1">Your Role</h3>
                  <p className="text-sm capitalize">{userLogged.role}</p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Quick Stats
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform transition-transform duration-200 hover:scale-105">
                    <CheckCircle className="mx-auto h-8 w-8 text-indigo-600" />
                    <p className="text-sm mt-2 text-gray-600 font-medium">
                      Signed In
                    </p>
                  </div>
                  <div className="bg-pink-50 p-6 rounded-xl shadow-md text-center transform transition-transform duration-200 hover:scale-105">
                    <Clock3 className="mx-auto h-8 w-8 text-pink-600" />
                    <p className="text-sm mt-2 text-gray-600 font-medium">
                      Session Active
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl shadow-md text-center transform transition-transform duration-200 hover:scale-105">
                    <Wrench className="mx-auto h-8 w-8 text-yellow-600" />
                    <p className="text-sm mt-2 text-gray-600 font-medium">
                      More Features Soon
                    </p>
                  </div>
                </div>
              </div>
              {userLogged?.role?.toLowerCase() === USER_ROLES.ADMIN && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => router.push("/admin/users")}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow cursor-pointer flex items-center gap-2"
                  >
                    <Users className="h-5 w-5" />
                    <span>View All Users</span>
                  </button>
                </div>
              )}
              <div className="flex justify-center gap-4 mt-6 flex-wrap">
                <button
                  onClick={() => router.push("/sessions")}
                  className="flex items-center gap-2 px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl shadow-md transition duration-200 cursor-pointer"
                >
                  <Monitor className="h-4 w-4" />
                  Active Sessions
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition duration-200 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center gap-2 px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl shadow-md transition duration-200 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </main>
        </AuthLayout>
        <Footer />
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}
