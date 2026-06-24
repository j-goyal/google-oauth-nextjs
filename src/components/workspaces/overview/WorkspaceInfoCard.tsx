"use client";

import { WorkspaceResponse } from "@/types/workspaces/WorkspaceResponse";
import { formatDateTime } from "@/utils/dateUtils";

interface WorkspaceInformationCardProps {
  workspace: WorkspaceResponse;
}

export default function WorkspaceInformationCard({
  workspace,
}: WorkspaceInformationCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          Workspace Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Basic information about this workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Workspace Name</p>

          <p className="mt-1 text-gray-800 font-semibold">{workspace.name}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Workspace ID</p>

          <p className="mt-1 text-sm font-mono text-gray-700 break-all">
            {workspace.id}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Created At</p>

          <p className="mt-1 text-gray-700">
            {formatDateTime(workspace.createdAt)}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Updated At</p>

          <p className="mt-1 text-gray-700">
            {formatDateTime(workspace.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
