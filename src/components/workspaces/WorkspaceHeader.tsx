"use client";

import { WorkspaceResponse } from "@/types/workspaces/WorkspaceResponse";
import { formatDateTime } from "@/utils/dateUtils";

interface WorkspaceHeaderProps {
  workspace: WorkspaceResponse;
}

export default function WorkspaceHeader({ workspace }: WorkspaceHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">{workspace.name}</h1>

        <div className="flex flex-wrap gap-6 text-sm text-gray-500">
          <div>
            Created{" "}
            {formatDateTime(workspace.createdAt)}
          </div>

          <div>
            Updated{" "}
            {formatDateTime(workspace.updatedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
