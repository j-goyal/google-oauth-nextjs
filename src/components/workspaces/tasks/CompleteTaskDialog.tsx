"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { WorkspaceTaskResponse } from "@/types/workspaceTasks/WorkspaceTaskResponse";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { ManageWorkspaceTasks } from "@/services/ManageWorkspaceTasks.module";
import { TextArea } from "@/components/ui/textarea";

interface Props {
  isOpen: boolean;
  workspaceId: string;
  task: WorkspaceTaskResponse | null;
  onClose: () => void;
  onTaskCompleted: () => void;
}

export default function CompleteTaskDialog({
  isOpen,
  workspaceId,
  task,
  onClose,
  onTaskCompleted,
}: Props) {
  const cancelRef = useRef(null);

  const manageWorkspaceTasks = ManageWorkspaceTasks();

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (loading) return;

    setComment("");

    onClose();
  };

  const handleCompleteTask = async () => {
    if (!task) {
      return;
    }

    try {
      setLoading(true);

      const response = await manageWorkspaceTasks.completeTask(
        workspaceId,
        task.id,
        {
          completionComment: comment.trim(),
        },
      );

      if (response.success) {
        toast.success("Task completed successfully.");

        handleClose();

        await onTaskCompleted();
      } else {
        toast.error(getErrorMessage(response.error));
      }
    } catch {
      toast.error("Error while completing task. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && task && (
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
                    Complete Task
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
                    <p className="font-medium text-gray-800">{task.title}</p>

                    <p className="text-sm text-gray-500">
                      {task.description || "No description"}
                    </p>
                  </div>

                  <TextArea
                    rows={2}
                    placeholder="Completion comment (optional)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>

                  <Button onClick={handleCompleteTask} disabled={loading}>
                    {loading ? "Completing..." : "Complete Task"}
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
