"use client";

import { useCallback, useEffect, useState } from "react";
import WorkspaceInvitationCard from "./WorkspaceInvitationCard";
import WorkspaceMembersTable from "./WorkspaceMembersTable";
import RemoveMemberDialog from "./RemoveMemberDialog";
import { WorkspaceInvitationResponse } from "@/types/workspaceMembers/WorkspaceInvitationResponse";
import { WorkspaceMemberResponse } from "@/types/workspaceMembers/WorkspaceMemberResponse";
import { ManageWorkspaceMembers } from "@/services/ManageWorkspaceMembers.module";
import WorkspaceInvitationCardShimmer from "@/components/shimmer/WorkspaceInvitationCardShimmer";
import GridShimmer from "@/components/shimmer/GridShimmer";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { WorkspacePermission } from "@/enums/workspaces/workspacePermission";
import { hasWorkspacePermission } from "@/utils/workspacePermissionUtils";

interface WorkspaceMembersContentProps {
  workspaceId: string;
}

export default function WorkspaceMembersContent({
  workspaceId,
}: WorkspaceMembersContentProps) {
  const [members, setMembers] = useState<WorkspaceMemberResponse[]>([]);
  const [invitation, setInvitation] = useState<WorkspaceInvitationResponse | null>(null);
  const [selectedMember, setSelectedMember] = useState<WorkspaceMemberResponse | null>(null);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const workspace = useWorkspaceStore((state) => state.currentWorkspace);

  const canManageInvitations = hasWorkspacePermission(
    workspace,
    WorkspacePermission.ManageInvitations,
  );
  const manageWorkspaceMembers = ManageWorkspaceMembers();

  const loadMembers = useCallback(async () => {
    const response = await manageWorkspaceMembers.getMembers(workspaceId);

    if (response.success && response.data) {
      setMembers(response.data);
    }
  }, [workspaceId, manageWorkspaceMembers]);

  const loadInvitation = useCallback(async () => {
    const response = await manageWorkspaceMembers.getInvitation(workspaceId);

    if (response.success && response.data) {
      setInvitation(response.data);
    }
  }, [workspaceId, manageWorkspaceMembers]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      if (canManageInvitations) {
        await Promise.all([loadMembers(), loadInvitation()]);
      } else {
        await loadMembers();
      }
    } finally {
      setLoading(false);
    }
  }, [loadMembers, loadInvitation, canManageInvitations]);

  useEffect(() => {
    loadData();
  }, []);

  const handleRemoveClick = (member: WorkspaceMemberResponse) => {
    setSelectedMember(member);
    setShowRemoveDialog(true);
  };

  const handleRemoveSuccess = async () => {
    setShowRemoveDialog(false);
    setSelectedMember(null);

    await loadMembers();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {canManageInvitations && <WorkspaceInvitationCardShimmer />}

        <GridShimmer
          showHeader={false}
          rowCount={4}
          columns={
            hasWorkspacePermission(workspace, WorkspacePermission.DeleteMembers)
              ? ["Name", "Email", "Role", "Joined At", "Actions"]
              : ["Name", "Email", "Role", "Joined At"]
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {canManageInvitations && invitation && (
        <WorkspaceInvitationCard
          workspaceId={workspaceId}
          invitation={invitation}
          onUpdated={loadInvitation}
        />
      )}

      <WorkspaceMembersTable members={members} onRemove={handleRemoveClick} />

      <RemoveMemberDialog
        isOpen={showRemoveDialog}
        workspaceId={workspaceId}
        member={selectedMember}
        onClose={() => {
          setShowRemoveDialog(false);
          setSelectedMember(null);
        }}
        onMemberRemoved={handleRemoveSuccess}
      />
    </div>
  );
}
