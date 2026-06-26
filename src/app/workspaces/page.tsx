"use client";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthLayout from "@/components/AuthLayout";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import GridShimmer from "@/components/shimmer/GridShimmer";
import { Permissions } from "@/constants/permissions";

const WorkspaceListContent = dynamic(
  () => import("@/components/workspaces/WorkspaceListContent"),
);

export default function WorkspacesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
      <Header />
      <AuthLayout
        skeleton={
          <GridShimmer
            filters={0}
            rowCount={6}
            buttons={1}
            columns={["Workspace", "Owner", "Created"]}
          />
        }
      >
        <ProtectedRoute permission={Permissions.WORKSPACES_VIEW}>
          <WorkspaceListContent />
        </ProtectedRoute>
      </AuthLayout>
      <Footer />
    </div>
  );
}
