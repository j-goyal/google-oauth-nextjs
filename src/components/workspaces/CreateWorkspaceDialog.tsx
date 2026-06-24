"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ManageWorkspaces } from "@/services/ManageWorkspaces.module";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useGlobalLoader } from "@/store/useGlobalLoader";

interface CreateWorkspaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onWorkspaceCreated: () => void;
}

export default function CreateWorkspaceDialog({
  isOpen,
  onClose,
  onWorkspaceCreated,
}: CreateWorkspaceDialogProps) {
  const cancelRef = useRef(null);
  const manageWorkspaces = ManageWorkspaces();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { showLoader, hideLoader } = useGlobalLoader();

  const handleClose = () => {
    if (loading) {
      return;
    }

    setName("");
    onClose();
  };

  const handleCreateWorkspace = async () => {
    if (!name.trim()) {
      toast.error("Workspace name is required.");
      return;
    }

    try {
      showLoader();
      setLoading(true);

      const response = await manageWorkspaces.createWorkspace({
        name: name.trim(),
      });

      if (response.success) {
        toast.success("Workspace created successfully.");
        setName("");
        handleClose();
        await onWorkspaceCreated();
      } else {
        toast.error(getErrorMessage(response.error));
      }
    } catch {
      toast.error("Error while creating workspace. Please contact support.");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={handleClose}
          as={Fragment}
          initialFocus={cancelRef}
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <motion.div
              key="create-workspace-modal"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <DialogPanel className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <DialogTitle className="text-xl font-semibold text-gray-800">
                    Create Workspace
                  </DialogTitle>

                  <button
                    onClick={handleClose}
                    ref={cancelRef}
                    disabled={loading}
                    className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    <X />
                  </button>
                </div>

                <hr className="border-t border-gray-200 mb-5" />

                <div className="space-y-4">
                  <Input
                    className="border border-gray-300"
                    placeholder="Workspace name"
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="outline"
                    disabled={loading}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>

                  <Button disabled={loading} onClick={handleCreateWorkspace}>
                    {loading ? "Creating..." : "Create"}
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
