"use client";

import WorkspaceOverviewShimmer from "@/components/shimmer/workspaceOverview/WorkspaceOverviewShimmer";
import WorkspaceHeaderShimmer from "@/components/shimmer/workspaceDashboard/WorkspaceHeaderShimmer";
import WorkspaceNavigationShimmer from "@/components/shimmer/workspaceDashboard/WorkspaceNavigationShimmer";

export default function WorkspaceDashboardShimmer() {
  return (
    <main className="flex-1 py-5 px-4 pt-30">
      <div className="max-w-5xl mx-auto space-y-6">
        <WorkspaceHeaderShimmer />
        <WorkspaceNavigationShimmer />
        <WorkspaceOverviewShimmer />
      </div>
    </main>
  );
}
