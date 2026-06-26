"use client";

import Image from "next/image";
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-gray-500">Workspace Name</p>

          <p className="mt-1 font-semibold text-gray-800">{workspace.name}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Owner</p>

          {workspace?.owner ? (
            <div className="mt-2 flex items-center gap-3">
              {workspace.owner?.profilePic ? (
                <Image
                  src={workspace.owner?.profilePic}
                  alt={workspace.owner?.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                  {workspace.owner?.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <p className="font-medium text-gray-800">
                  {workspace.owner?.name}
                </p>

                <p className="text-sm text-gray-500">{workspace.owner?.email}</p>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-gray-400">—</p>
          )}
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
