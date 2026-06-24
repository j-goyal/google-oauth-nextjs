"use client";

import clsx from "clsx";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { WorkspacePermission } from "@/enums/workspaces/workspacePermission";
import { hasWorkspacePermission } from "@/utils/workspacePermissionUtils";

export type WorkspaceTab =
  | "overview"
  | "tasks"
  | "members"
  | "history"
  | "summary";

interface WorkspaceNavigationProps {
  activeTab: WorkspaceTab;
  onTabChange: (tab: WorkspaceTab) => void;
}

const allTabs: {
  label: string;
  value: WorkspaceTab;
  permission?: WorkspacePermission;
}[] = [
  {
    label: "Overview",
    value: "overview",
  },
  {
    label: "Tasks",
    value: "tasks",
    permission: WorkspacePermission.ViewTasks,
  },
  {
    label: "Members",
    value: "members",
    permission: WorkspacePermission.ViewMembers,
  },
  {
    label: "History",
    value: "history",
    permission: WorkspacePermission.ViewHistory,
  },
  {
    label: "Summary",
    value: "summary",
    permission: WorkspacePermission.ViewSummary,
  },
];

export default function WorkspaceNavigation({
  activeTab,
  onTabChange,
}: WorkspaceNavigationProps) {
  const workspace = useWorkspaceStore((state) => state.currentWorkspace);

  const tabs = allTabs.filter(
    (tab) =>
      !tab.permission || hasWorkspacePermission(workspace, tab.permission),
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-2">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={clsx(
              "cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition",
              activeTab === tab.value
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
                : "text-gray-600 hover:bg-gray-100",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
