import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthLayout from "@/components/AuthLayout";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import { Permissions } from "@/constants/permissions";
import WorkspaceDashboardShimmer from "@/components/shimmer/workspaceDashboard/WorkspaceDashboardShimmer";

const WorkspaceDashboardContent = dynamic(
  () => import("@/components/workspaces/WorkspaceDashboardContent"),
);

interface Props {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function WorkspacePage({ params }: Props) {
  const { workspaceId } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
      <Header />
      <AuthLayout skeleton={<WorkspaceDashboardShimmer />}>
        <ProtectedRoute permission={Permissions.WORKSPACES_VIEW}>
          <WorkspaceDashboardContent workspaceId={workspaceId} />
        </ProtectedRoute>
      </AuthLayout>
      <Footer />
    </div>
  );
}
