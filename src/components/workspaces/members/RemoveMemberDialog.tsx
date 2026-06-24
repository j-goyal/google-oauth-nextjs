"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { WorkspaceMemberResponse } from "@/types/workspaceMembers/WorkspaceMemberResponse";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { ManageWorkspaceMembers } from "@/services/ManageWorkspaceMembers.module";

interface Props {
  isOpen: boolean;
  workspaceId: string;
  member: WorkspaceMemberResponse | null;
  onClose: () => void;
  onMemberRemoved: () => void;
}

export default function RemoveMemberDialog({
  isOpen,
  workspaceId,
  member,
  onClose,
  onMemberRemoved,
}: Props) {
  const cancelRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const manageWorkspaceMembers = ManageWorkspaceMembers();

  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  const handleRemoveMember = async () => {
    if (!member) {
      return;
    }

    try {
      setLoading(true);

      const response = await manageWorkspaceMembers.removeMember(
        workspaceId,
        member.userId,
      );

      if (response.success) {
        toast.success("Member removed successfully.");

        handleClose();

        await onMemberRemoved();
      } else {
        toast.error(getErrorMessage(response.error));
      }
    } catch {
      toast.error("Error while removing member. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && member && (
        <Dialog
          open={isOpen}
          onClose={handleClose}
          as={Fragment}
          initialFocus={cancelRef}
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <DialogPanel className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <DialogTitle className="text-xl font-semibold text-gray-800">
                    Remove Member
                  </DialogTitle>

                  <button
                    ref={cancelRef}
                    onClick={handleClose}
                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                  >
                    <X />
                  </button>
                </div>

                <hr className="border-t border-gray-200 mb-5" />

                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-800">{member.name}</p>

                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>

                  <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                    <p className="text-sm text-red-700">
                      Are you sure you want to remove this member from the
                      workspace?
                    </p>

                    <p className="text-sm text-red-600 mt-2">
                      This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={handleRemoveMember}
                    disabled={loading}
                  >
                    {loading ? "Removing..." : "Remove Member"}
                  </Button>
                </div>
              </DialogPanel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
