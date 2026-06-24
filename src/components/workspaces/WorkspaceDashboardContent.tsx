"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ManageWorkspaces } from "@/services/ManageWorkspaces.module";
import { getErrorMessage } from "@/utils/getErrorMessage";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceNavigation, { WorkspaceTab } from "./WorkspaceNavigation";
import WorkspaceOverview from "@/components/workspaces/overview/WorkspaceOverview";
import WorkspaceTasksContent from "./tasks/WorkspaceTasksContent";
import WorkspaceMembersContent from "./members/WorkspaceMembersContent";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { WorkspacePermission } from "@/enums/workspaces/workspacePermission";
import WorkspacePermissionGuard from "../guards/WorkspacePermissionGuard";
import WorkspaceDashboardShimmer from "../shimmer/workspaceDashboard/WorkspaceDashboardShimmer";

interface Props {
  workspaceId: string;
}

export default function WorkspaceDashboardContent({ workspaceId }: Props) {
  const manageWorkspaces = ManageWorkspaces();
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const setWorkspace = useWorkspaceStore((state) => state.setWorkspace);
  const clearWorkspace = useWorkspaceStore((state) => state.clearWorkspace);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("overview");

  const fetchWorkspace = async () => {
    try {
      const response = await manageWorkspaces.getWorkspaceById(workspaceId);

      if (response.success && response.data) {
        setWorkspace(response.data);
      } else {
        toast.error(getErrorMessage(response.error));
      }
    } catch {
      toast.error("Failed to load workspace.");
    }
  };

  useEffect(() => {
    fetchWorkspace();
    return () => {
      clearWorkspace();
    };
  }, [workspaceId, setWorkspace, clearWorkspace]);

  if (!currentWorkspace) {
    return <WorkspaceDashboardShimmer/>
  }

  return (
    <main className="flex-1 py-5 px-4 pt-30">
      <div className="max-w-5xl mx-auto space-y-6">
        <WorkspaceHeader workspace={currentWorkspace} />

        <WorkspaceNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "overview" && (
          <WorkspaceOverview workspace={currentWorkspace} />
        )}

        {activeTab === "tasks" && (
          <WorkspacePermissionGuard
            workspace={currentWorkspace}
            permission={WorkspacePermission.ViewTasks}
          >
            <WorkspaceTasksContent workspaceId={currentWorkspace.id} />
          </WorkspacePermissionGuard>
        )}

        {activeTab === "members" && (
          <WorkspaceMembersContent workspaceId={currentWorkspace.id} />
        )}

        {activeTab === "history" && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-500">
            History module coming soon.
          </div>
        )}

        {activeTab === "summary" && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-500">
            Summary module coming soon.
          </div>
        )}
      </div>
    </main>
  );
}
