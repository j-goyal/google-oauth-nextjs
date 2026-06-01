"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ConfirmModal";
import { useState } from "react";
import { ADMIN_ROLES } from "@/constants/userRoles";
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
import { motion } from "framer-motion";
import { hasAnyRole } from "@/utils/roleUtils";

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

  const buttons = [
    {
      label: "Active Sessions",
      icon: Monitor,
      color: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
      hover: "hover:from-purple-600 hover:to-indigo-600",
      onClick: () => router.push("/sessions"),
    },
    {
      label: "Logout",
      icon: LogOut,
      color: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
      hover: "hover:from-red-600 hover:to-pink-600",
      onClick: handleLogout,
    },
    {
      label: "Delete Account",
      icon: Trash2,
      color: "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800",
      hover: "hover:from-gray-300 hover:to-gray-400",
      onClick: handleDeleteAccount,
    },
  ];

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
                <div className="p-5 rounded-xl bg-indigo-100 text-indigo-800 shadow-md ring-1 ring-indigo-200 hover:ring-2">
                  <h3 className="font-semibold text-lg mb-1">Your Email</h3>
                  <p className="text-sm break-words sm:break-normal">
                    {userLogged.email}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-yellow-100 text-yellow-800 shadow-md ring-1 ring-yellow-200 hover:ring-2">
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
                  <div className="bg-indigo-50 p-6 rounded-xl shadow-md ring-1 ring-indigo-200 hover:ring-2 hover:shadow-lg text-center transform transition-transform duration-200 hover:scale-105">
                    <CheckCircle className="mx-auto h-8 w-8 text-indigo-600" />
                    <p className="text-sm mt-2 text-gray-600 font-medium">
                      Signed In
                    </p>
                  </div>
                  <div className="bg-pink-50 p-6 rounded-xl shadow-md ring-1 ring-pink-200 hover:ring-2 hover:shadow-lg text-center transform transition-transform duration-200 hover:scale-105">
                    <Clock3 className="mx-auto h-8 w-8 text-pink-600" />
                    <p className="text-sm mt-2 text-gray-600 font-medium">
                      Session Active
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl shadow-md ring-1 ring-yellow-200 hover:ring-2 hover:shadow-lg text-center transform transition-transform duration-200 hover:scale-105">
                    <Wrench className="mx-auto h-8 w-8 text-yellow-600" />
                    <p className="text-sm mt-2 text-gray-600 font-medium">
                      More Features Soon
                    </p>
                  </div>
                </div>
              </div>
              {hasAnyRole(userLogged?.role, ADMIN_ROLES) && (
                <div className="mt-6 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/admin/users")}
                    className="group relative px-6 py-2 cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl shadow-xl transition-all duration-300 flex items-center gap-2 hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <motion.span
                      whileHover={{ x: -3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="transition-transform duration-300"
                    >
                      <Users className="h-5 w-5 text-white drop-shadow-sm" />
                    </motion.span>
                    <span>View All Users</span>
                  </motion.button>
                </div>
              )}

              <div className="flex justify-center gap-4 mt-8 flex-wrap">
                {buttons.map((btn, idx) => (
                  <motion.button
                    key={idx}
                    onClick={btn.onClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl shadow-lg transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${btn.color} ${btn.hover}`}
                  >
                    <motion.span
                      whileHover={{ x: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="group-hover:-translate-x-1 transition-transform duration-300"
                    >
                      <btn.icon className="h-5 w-5" />
                    </motion.span>
                    <span className="">{btn.label}</span>
                  </motion.button>
                ))}
              </div>
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
