"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import AppSelect from "@/components/ui/AppSelect";
import ConfirmModal from "@/components/ConfirmModal";

import { USER_ROLE_OPTIONS } from "@/constants/userRoles";
import { ManageUsersService } from "@/services/ManageUsers.module";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getRoleBadgeClass } from "@/utils/roleUtils";

type Props = {
  userId: string;
  currentRole: string;
  onRoleUpdated: (userId: string, role: string) => void;
};

export default function UserRoleDropdown({
  userId,
  currentRole,
  onRoleUpdated,
}: Props) {
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);
  const [pendingRole, setPendingRole] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleRoleChange = (newRole: string) => {
    if (newRole === role) return;
    setPendingRole(newRole);
    setIsConfirmOpen(true);
  };

  const confirmRoleChange = async () => {
    if (!pendingRole) return;

    try {
      setLoading(true);
      const manageUsersService = ManageUsersService();

      const response = await manageUsersService.updateUserRoleByUserId(userId, {
        role: pendingRole,
      });

      if (response.success) {
        setRole(pendingRole);
        onRoleUpdated(userId, pendingRole);
        toast.success("Role updated successfully");
      } else {
        toast.error(getErrorMessage(response.error));
      }
    } catch {
      toast.error("Failed to update role");
    } finally {
      setLoading(false);
      setPendingRole(null);
      setIsConfirmOpen(false);
    }
  };

  const cancelRoleChange = () => {
    setPendingRole(null);
    setIsConfirmOpen(false);
  };

  return (
    <>
      <AppSelect
        value={role}
        options={USER_ROLE_OPTIONS}
        disabled={loading}
        onValueChange={handleRoleChange}
        triggerClassName="
          border-none
          shadow-none
          bg-transparent
          px-0
          py-0
        "
        renderSelectedValue={(value) => (
          <span
            className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeClass(
              value,
            )}`}
          >
            {value}
          </span>
        )}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Change User Role ?"
        message={`Are you sure you want to change this user's role from "${role}" to "${pendingRole}"?`}
        confirmText="Update Role"
        cancelText="Cancel"
        confirmButtonClassName="bg-indigo-500 hover:bg-indigo-600"
        onConfirm={confirmRoleChange}
        onCancel={cancelRoleChange}
      />
    </>
  );
}
