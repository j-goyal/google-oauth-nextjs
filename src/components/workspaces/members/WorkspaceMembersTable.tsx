"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { WorkspaceMemberResponse } from "@/types/workspaceMembers/WorkspaceMemberResponse";
import { WorkspaceMemberRole } from "@/enums/workspaceMembers/memberRole";
import { WorkspacePermission } from "@/enums/workspaces/workspacePermission";
import { formatDateTime } from "@/utils/dateUtils";
import { hasWorkspacePermission } from "@/utils/workspacePermissionUtils";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

interface Props {
  members: WorkspaceMemberResponse[];
  onRemove: (member: WorkspaceMemberResponse) => void;
}

export default function WorkspaceMembersTable({ members, onRemove }: Props) {
  const workspace = useWorkspaceStore((state) => state.currentWorkspace);

  const columns: ColumnDef<WorkspaceMemberResponse>[] = useMemo(() => {
    const cols: ColumnDef<WorkspaceMemberResponse>[] = [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="font-medium text-gray-800">{row.original.name}</div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <span className="text-sm text-gray-600">{row.original.email}</span>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const isOwner =
            row.original.workspaceRole === WorkspaceMemberRole.Owner;

          return (
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                isOwner
                  ? "bg-purple-100 text-purple-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {WorkspaceMemberRole[row.original.workspaceRole]}
            </span>
          );
        },
      },
      {
        accessorKey: "joinedAt",
        header: "Joined At",
        cell: ({ row }) => (
          <span className="text-sm text-gray-600">
            {formatDateTime(row.original.joinedAt)}
          </span>
        ),
      },
    ];

    if (hasWorkspacePermission(workspace, WorkspacePermission.DeleteMembers)) {
      cols.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const member = row.original;

          const isOwner = member.workspaceRole === WorkspaceMemberRole.Owner;

          if (isOwner) {
            return <span className="text-xs text-gray-400">—</span>;
          }

          return (
            <button
              onClick={() => onRemove(member)}
              className="cursor-pointer px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-md hover:from-red-600 hover:to-pink-600 transition"
            >
              Remove
            </button>
          );
        },
      });
    }

    return cols;
  }, [workspace, onRemove]);

  return <DataTable columns={columns} data={members} />;
}
