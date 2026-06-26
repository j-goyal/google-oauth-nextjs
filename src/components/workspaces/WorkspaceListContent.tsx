"use client";

import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Image from "next/image";
import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { WorkspaceResponse } from "@/types/workspaces/WorkspaceResponse";
import { ManageWorkspaces } from "@/services/ManageWorkspaces.module";
import { getErrorMessage } from "@/utils/getErrorMessage";
import CreateWorkspaceDialog from "@/components/workspaces/CreateWorkspaceDialog";
import { useRouter } from "next/navigation";
import PermissionGuard from "@/components/guards/PermissionGuard";
import { Permissions } from "@/constants/permissions";
import { formatDateTime } from "@/utils/dateUtils";

export default function WorkspaceListContent() {
  const manageWorkspaces = ManageWorkspaces();
  const router = useRouter();

  const [workspaces, setWorkspaces] = useState<WorkspaceResponse[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const fetchWorkspaces = async () => {
    try {
      const response = await manageWorkspaces.getMyWorkspaces();

      if (response.success) {
        setWorkspaces(response.data);
      } else {
        toast.error(getErrorMessage(response.error));
      }
    } catch {
      toast.error("Error while fetching workspaces. Please contact support.");
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const columns: ColumnDef<WorkspaceResponse>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Workspace",
        cell: ({ row }) => (
          <button
            onClick={() =>
              router.push(`/workspaces/${row.original.id}`)
            }
            className="cursor-pointer text-left group"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl bg-indigo-100 p-2 transition group-hover:bg-indigo-200">
                <FolderOpen className="h-4 w-4 text-indigo-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-800 transition group-hover:text-gray-900">
                  {row.original.name}
                </p>

                <p className="mt-1 text-xs text-gray-400 transition group-hover:text-indigo-600">
                  Open workspace
                </p>
              </div>
            </div>
          </button>
        ),
      },
      {
        accessorKey: "owner",
        header: "Owner",
        cell: ({ row }) => {
          const owner = row.original.owner;

          if (!owner) {
            return (
              <span className="text-sm text-gray-400">
                —
              </span>
            );
          }

          return (
            <div className="flex items-center gap-3 min-w-[180px]">
              {owner.profilePic ? (
                <Image
                  src={owner.profilePic}
                  alt={owner.name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
                  {owner.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate font-medium text-gray-800">
                  {owner.name}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {owner.email}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => (
          <span className="text-sm text-gray-600">
            {formatDateTime(row.original.createdAt)}
          </span>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <main className="flex-1 py-5 px-4 pt-30">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Workspaces</h1>
            <PermissionGuard permission={Permissions.WORKSPACES_CREATE}>
              <Button onClick={() => setOpenCreateDialog(true)}>
                Create Workspace
              </Button>
            </PermissionGuard>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DataTable columns={columns} data={workspaces} />
          </motion.div>
        </div>
      </main>

      <CreateWorkspaceDialog
        isOpen={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onWorkspaceCreated={fetchWorkspaces}
      />
    </>
  );
}
