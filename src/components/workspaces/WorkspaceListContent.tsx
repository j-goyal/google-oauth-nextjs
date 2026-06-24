"use client";

import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { WorkspaceResponse } from "@/types/workspaces/WorkspaceResponse";
import { ManageWorkspaces } from "@/services/ManageWorkspaces.module";
import { getErrorMessage } from "@/utils/getErrorMessage";
import CreateWorkspaceDialog from "@/components/workspaces/CreateWorkspaceDialog";
import { useRouter } from "next/navigation";
import PermissionGuard from "@/components/guards/PermissionGuard"
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
      toast.error("Error while fetching workspaces. Please contact support");
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const columns: ColumnDef<WorkspaceResponse>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Workspace Name",
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
          return (
            <span className="text-sm text-gray-600">
              {formatDateTime(row.original.createdAt)}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button
            size="sm"
            onClick={() => router.push(`/workspaces/${row.original.id}`)}
          >
            Open
          </Button>
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
