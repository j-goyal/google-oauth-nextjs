"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTable } from "@/components/ui/data-table";
import { WorkspaceTaskResponse } from "@/types/workspaceTasks/WorkspaceTaskResponse";
import { WorkspaceTaskStatus } from "@/enums/workspaceTasks/status";
import { formatDate } from "@/utils/dateUtils";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { WorkspacePermission } from "@/enums/workspaces/workspacePermission";
import { hasWorkspacePermission } from "@/utils/workspacePermissionUtils";

interface Props {
  tasks: WorkspaceTaskResponse[];
  onCompleteTask: (task: WorkspaceTaskResponse) => void;
  onViewDetails: (task: WorkspaceTaskResponse) => void;
}

export default function WorkspaceTaskTable({
  tasks,
  onCompleteTask,
  onViewDetails,
}: Props) {
  const workspace = useWorkspaceStore((state) => state.currentWorkspace);
  const columns: ColumnDef<WorkspaceTaskResponse>[] = useMemo(
    () => [
      {
        accessorKey: "taskDate",
        header: "Task Date",
        cell: ({ row }) => {
          const taskDate = row.original.taskDate;

          return (
            <span className="text-sm text-gray-600">
              {formatDate(taskDate)}
            </span>
          );
        },
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <div className="font-medium text-gray-800">{row.original.title}</div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const isCompleted =
            row.original.status === WorkspaceTaskStatus.Completed;

          return (
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                isCompleted
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {WorkspaceTaskStatus[row.original.status]}
            </span>
          );
        },
      },
      {
        accessorKey: "completedBy",
        header: "Completed By",
        cell: ({ row }) => {
          const completedBy = row.original.completedBy;
          return (
            <div className="flex items-center gap-2 min-w-[150px] max-w-[180px] sm:max-w-none">
              {completedBy?.profilePic ? (
                <Image
                  src={completedBy.profilePic}
                  alt={completedBy.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : completedBy ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-semibold text-indigo-600">
                  {completedBy.name.charAt(0).toUpperCase()}
                </div>
              ) : null}

              <span className="text-sm text-gray-700">
                {completedBy?.name ?? "—"}
              </span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const task = row.original;

          return (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onViewDetails(task)}
                className="cursor-pointer px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md hover:from-blue-600 hover:to-cyan-600 transition"
              >
                Details
              </button>

              {task.status !== WorkspaceTaskStatus.Completed &&
                hasWorkspacePermission(
                  workspace,
                  WorkspacePermission.CompleteTask,
                ) && (
                  <button
                    onClick={() => onCompleteTask(task)}
                    className="cursor-pointer px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-md hover:from-purple-600 hover:to-indigo-600 transition"
                  >
                    Complete
                  </button>
                )}
            </div>
          );
        },
      },
    ],
    [onCompleteTask],
  );

  return <DataTable columns={columns} data={tasks} />;
}
