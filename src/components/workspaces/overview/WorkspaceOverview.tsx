"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import WorkspaceInfoCard from "@/components/workspaces/overview/WorkspaceInfoCard";
import WorkspaceStatsCards from "@/components/workspaces/overview/WorkspaceStatsCard";
import WorkspaceQuickActions from "@/components/workspaces/overview/WorkspaceQuickActions";
import { WorkspaceResponse } from "@/types/workspaces/WorkspaceResponse";
import { WorkspaceOverviewResponse } from "@/types/workspaces/WorkspaceOverviewResponse";
import { ManageWorkspaces } from "@/services/ManageWorkspaces.module";
import { getErrorMessage } from "@/utils/getErrorMessage";
import WorkspaceStatsCardsShimmer from "@/components/shimmer/workspaceOverview/WorkspaceStatsCardShimmer";

interface Props {
  workspace: WorkspaceResponse;
}

export default function WorkspaceOverview({ workspace }: Props) {
  const manageWorkspaces = ManageWorkspaces();
  const [overview, setOverview] = useState<WorkspaceOverviewResponse | null>(null);

  const [loadingOverview, setLoadingOverview] = useState(true);

  const loadOverview = async () => {
    try {
      setLoadingOverview(true);
      const response = await manageWorkspaces.getOverview(workspace.id);

      if (response.success && response.data) {
        setOverview(response.data);
      } else {
        toast.error(getErrorMessage(response.error));
      }
    } catch {
      toast.error("Failed to load workspace overview.");
    } finally {
      setLoadingOverview(false);
    }
  };
  useEffect(() => {
    loadOverview();
  }, [workspace.id]);

  return (
    <div className="space-y-6">
      <WorkspaceInfoCard workspace={workspace} />

      {loadingOverview || !overview ? (
        <WorkspaceStatsCardsShimmer />
      ) : (
        <WorkspaceStatsCards overview={overview} />
      )}

      <WorkspaceQuickActions workspaceId={workspace.id} />
    </div>
  );
}
