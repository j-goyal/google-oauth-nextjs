"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/useAuthStore";
import { ManageWorkspaces } from "@/services/ManageWorkspaces.module";

export default function JoinWorkspacePage() {
  const params = useParams();
  const router = useRouter();

  const { userLogged, isAuthResolved } = useAuthStore();

  const manageWorkspaces = ManageWorkspaces();

  useEffect(() => {
    const handleJoin = async () => {
      const joinCode = params.joinCode as string;

      if (!joinCode) {
        router.replace("/dashboard");
        return;
      }

      // User not logged in
      if (!userLogged?.isAuthenticated) {
        sessionStorage.setItem("pendingJoinCode", joinCode);
        router.replace("/sign-in");
        return;
      }

      // User already logged in
      try {
        const response = await manageWorkspaces.joinWorkspace(joinCode);

        if (response?.success && response?.data) {
          if (response?.data?.alreadyMember) {
            toast.success("You are already a member of this workspace.");
          } else {
            toast.success("Joined workspace successfully.");
          }
          router.replace(`/workspaces/${response?.data?.workspaceId}`);
        } else {
          toast.error(response?.error?.message ?? "Unable to join workspace.");
          router.replace("/dashboard");
        }
      } catch {
        toast.error("Unable to join workspace.");
        router.replace("/dashboard");
      }
    };

    if (!isAuthResolved) return;

    handleJoin();
  }, [isAuthResolved]);

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
        <div className="backdrop-blur-xl bg-white/60 border border-white/30 rounded-3xl shadow-lg p-10 text-center space-y-6">
          <div className="h-8 w-8 mx-auto border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />

          <div className="text-lg font-semibold text-indigo-800 animate-pulse">
            Joining workspace...
          </div>

          <p className="text-sm text-gray-600">Please wait.</p>
        </div>
      </div>
    </>
  );
}
