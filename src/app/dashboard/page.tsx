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

export default function DashboardPage() {
  const { userLogged, logout, deleteAccount } = useAuthStore();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const res = await deleteAccount();
    if (res) router.push("/");
    setIsDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <AuthLayout>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
          <Header />

          <main className="flex-1 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
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
                  <div className="bg-indigo-50 p-4 rounded-xl shadow text-center">
                    <p className="text-3xl font-bold text-indigo-600">✔️</p>
                    <p className="text-sm mt-2 text-gray-600">Signed In</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-xl shadow text-center">
                    <p className="text-3xl font-bold text-pink-600">🕒</p>
                    <p className="text-sm mt-2 text-gray-600">Session Active</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-xl shadow text-center">
                    <p className="text-3xl font-bold text-yellow-600">🛠️</p>
                    <p className="text-sm mt-2 text-gray-600">
                      More Features Soon
                    </p>
                  </div>
                </div>
              </div>
              {userLogged?.role?.toLowerCase() === USER_ROLES.ADMIN && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => router.push("/admin/users")}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow cursor-pointer"
                  >
                    👥 Manage Users
                  </button>
                </div>
              )}
              <div className="text-center mt-8">
                <button
                  onClick={handleLogout}
                  className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow cursor-pointer"
                >
                  Logout
                </button>
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={handleDeleteAccount}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl shadow cursor-pointer"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </AuthLayout>
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
