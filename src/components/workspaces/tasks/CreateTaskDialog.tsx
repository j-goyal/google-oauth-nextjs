"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { TextArea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { ManageWorkspaceTasks } from "@/services/ManageWorkspaceTasks.module";
import DatePicker from "@/components/ui/date-picker";

interface Props {
  isOpen: boolean;
  workspaceId: string;
  onClose: () => void;
  onTaskCreated: () => void;
}

export default function CreateTaskDialog({
  isOpen,
  workspaceId,
  onClose,
  onTaskCreated,
}: Props) {
  const cancelRef = useRef(null);

  const manageWorkspaceTasks = ManageWorkspaceTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskDate, setTaskDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (loading) return;

    setTitle("");
    setDescription("");
    setTaskDate(new Date().toISOString().split("T")[0]);

    onClose();
  };

  const handleCreateTask = async () => {
    if (!title.trim()) {
      toast.error("Task title is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await manageWorkspaceTasks.createTask(workspaceId, {
        title: title.trim(),
        description: description.trim(),
        taskDate,
      });

      if (response.success) {
        toast.success("Task created successfully.");

        handleClose();

        await onTaskCreated();
      } else {
        toast.error(getErrorMessage(response.error));
      }
    } catch {
      toast.error("Error while creating task. Please contact support.");
    } finally {
      setLoading(false);
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
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <DialogPanel className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <DialogTitle className="text-xl font-semibold text-gray-800">
                    Create Task
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
                  <Input
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>

                    <TextArea
                      rows={3}
                      placeholder="Enter task description (optional)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Task Date
                    </label>

                    <DatePicker
                      value={taskDate ? new Date(taskDate) : undefined}
                      onChange={(date) =>
                        setTaskDate(
                          date ? date.toISOString().split("T")[0] : "",
                        )
                      }
                    />
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

                  <Button onClick={handleCreateTask} disabled={loading}>
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
