"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { WorkspacePermission } from "@/enums/workspaces/workspacePermission";
import { hasWorkspacePermission } from "@/utils/workspacePermissionUtils";
import { ManageWorkspaceMembers } from "@/services/ManageWorkspaceMembers.module";
import { WorkspaceInvitationResponse } from "@/types/workspaceMembers/WorkspaceInvitationResponse";

import CreateTaskDialog from "../tasks/CreateTaskDialog";

interface Props {
  workspaceId: string;
}

export default function WorkspaceQuickActions({
  workspaceId,
}: Props) {
  const workspace = useWorkspaceStore(
    (state) => state.currentWorkspace,
  );

  const manageWorkspaceMembers = ManageWorkspaceMembers();

  const [invitation, setInvitation] =
    useState<WorkspaceInvitationResponse | null>(null);

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    if (
      workspace &&
      hasWorkspacePermission(
        workspace,
        WorkspacePermission.ManageInvitations,
      )
    ) {
      loadInvitation();
    }
  }, [workspace]);

  const loadInvitation = async () => {
    const response =
      await manageWorkspaceMembers.getInvitation(workspaceId);

    if (response.success) {
      setInvitation(response.data);
    }
  };

  const handleCopyLink = async () => {
    if (!invitation) {
      return;
    }

    await navigator.clipboard.writeText(invitation.joinUrl);

    toast.success("Invitation link copied.");
  };

  if (!workspace) {
    return null;
  }

  const canCreateTask = hasWorkspacePermission(
    workspace,
    WorkspacePermission.CreateTask,
  );

  const canManageInvitations = hasWorkspacePermission(
    workspace,
    WorkspacePermission.ManageInvitations,
  );

  const hasActions =
    canCreateTask || canManageInvitations;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-800">
            Quick Actions
          </h2>

          <p className="text-sm text-gray-500">
            Frequently used workspace actions.
          </p>
        </div>

        {hasActions ? (
          <div className="flex flex-wrap gap-3">
            {canCreateTask && (
              <Button
                className="cursor-pointer"
                onClick={() => setShowCreateDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />

                Create Task
              </Button>
            )}

            {canManageInvitations && (
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={handleCopyLink}
              >
                <Copy className="h-4 w-4 mr-2" />

                Copy Invite Link
              </Button>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 py-10 text-center">
            <p className="text-sm text-gray-500">
              No quick actions available.
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Additional actions will appear here as more workspace
              features are added.
            </p>
          </div>
        )}
      </div>

      <CreateTaskDialog
        isOpen={showCreateDialog}
        workspaceId={workspaceId}
        onClose={() => setShowCreateDialog(false)}
        onTaskCreated={() => Promise.resolve()}
      />
    </>
  );
}