import WorkspaceInfoCardShimmer from "@/components/shimmer/workspaceOverview/WorkspaceInfoCardShimmer";
import WorkspaceStatsCardsShimmer from "@/components/shimmer/workspaceOverview/WorkspaceStatsCardShimmer";
import WorkspaceQuickActionsShimmer from "@/components/shimmer/workspaceOverview/WorkspaceQuickActionsShimmer";

export default function WorkspaceOverviewShimmer() {
  return (
    <div className="space-y-6">
      <WorkspaceInfoCardShimmer />
      <WorkspaceStatsCardsShimmer />
      {/* <WorkspaceRecentActivityShimmer /> */}
      <WorkspaceQuickActionsShimmer />
    </div>
  );
}
