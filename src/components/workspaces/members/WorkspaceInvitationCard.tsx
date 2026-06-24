"use client";

import { useState } from "react";
import { Copy, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ManageWorkspaceMembers } from "@/services/ManageWorkspaceMembers.module";
import { WorkspaceInvitationResponse } from "@/types/workspaceMembers/WorkspaceInvitationResponse";

interface WorkspaceInvitationCardProps {
  workspaceId: string;
  invitation: WorkspaceInvitationResponse;
  onUpdated: () => Promise<void>;
}

export default function WorkspaceInvitationCard({
  workspaceId,
  invitation,
  onUpdated,
}: WorkspaceInvitationCardProps) {
  const manageWorkspaceMembers = ManageWorkspaceMembers();

  const [loading, setLoading] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitation.joinUrl);

      toast.success("Invitation link copied");
    } catch {
      toast.error("Failed to copy invitation link");
    }
  };

  const handleToggleInvitation = async () => {
    try {
      setLoading(true);

      const response = await manageWorkspaceMembers.toggleInvitation(
        workspaceId,
        !invitation.isInvitationActive,
      );

      if (response.success) {
        toast.success(
          invitation.isInvitationActive
            ? "Invitation disabled"
            : "Invitation enabled",
        );

        await onUpdated();
      } else {
        toast.error(response.error?.message ?? "Failed to update invitation");
      }
    } catch {
      toast.error("Failed to update invitation");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateCode = async () => {
    try {
      setLoading(true);

      const response =
        await manageWorkspaceMembers.regenerateJoinCode(workspaceId);

      if (response.success) {
        toast.success("Join code regenerated");

        await onUpdated();
      } else {
        toast.error(response.error?.message ?? "Failed to regenerate code");
      }
    } catch {
      toast.error("Failed to regenerate join code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Workspace Invitation
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Share the invitation link or join code with members.
        </p>
      </div>

      <div className="space-y-6">
        {/* Join Code */}
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Join Code
          </p>

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <span className="font-mono text-lg font-semibold text-gray-800">
              {invitation.joinCode}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={loading}
              onClick={handleRegenerateCode}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </div>

        {/* Invitation Link */}
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Invitation Link
          </p>

          <div className="flex items-center gap-3">
            <div className="flex-1 rounded-xl border border-gray-200 px-4 py-3 truncate text-sm text-gray-700">
              {invitation.joinUrl}
            </div>

            <Button
              variant="outline"
              onClick={handleCopyLink}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Invitation Status
            </p>

            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                invitation.isInvitationActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {invitation.isInvitationActive
                ? "Active"
                : "Inactive"}
            </span>
          </div>

          <Button
            disabled={loading}
            variant={
              invitation.isInvitationActive
                ? "destructive"
                : "default"
            }
            onClick={handleToggleInvitation}
          >
            {invitation.isInvitationActive
              ? "Disable"
              : "Enable"}
          </Button>
        </div>
      </div>
    </div>
  );
}