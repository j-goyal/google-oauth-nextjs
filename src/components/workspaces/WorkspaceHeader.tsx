"use client";

import { CalendarDays, Clock3, User } from "lucide-react";
import { WorkspaceResponse } from "@/types/workspaces/WorkspaceResponse";
import { formatDateTime } from "@/utils/dateUtils";

interface WorkspaceHeaderProps {
  workspace: WorkspaceResponse;
}

export default function WorkspaceHeader({ workspace }: WorkspaceHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{workspace.name}</h1>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          {workspace?.owner && (
            <div className="flex items-center gap-2 text-gray-500">
              <User className="h-4 w-4 text-indigo-500" />

              <span>
                Owner:{" "}
                <span className="font-medium text-gray-800">
                  {workspace.owner?.name}
                </span>
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-500">
            <CalendarDays className="h-4 w-4 text-green-500" />

            <span>
              Created:{" "}
              <span className="font-medium text-gray-800">
                {formatDateTime(workspace.createdAt)}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <Clock3 className="h-4 w-4 text-amber-500" />
            <span>
              Updated:{" "}
              <span className="font-medium text-gray-800">
                {formatDateTime(workspace.updatedAt)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
