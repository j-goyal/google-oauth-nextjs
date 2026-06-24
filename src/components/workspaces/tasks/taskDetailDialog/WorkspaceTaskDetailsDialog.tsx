"use client";

import { Fragment, useRef } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Avatar from "@/components/workspaces/tasks/taskDetailDialog/Avatar";
import InfoRow from "@/components/workspaces/tasks/taskDetailDialog/InfoRow";
import { WorkspaceTaskResponse } from "@/types/workspaceTasks/WorkspaceTaskResponse";
import { WorkspaceTaskStatus } from "@/enums/workspaceTasks/status";
import { formatDate, formatDateTime } from "@/utils/dateUtils";

interface Props {
  isOpen: boolean;
  task: WorkspaceTaskResponse | null;
  onClose: () => void;
}

export default function WorkspaceTaskDetailsDialog({
  isOpen,
  task,
  onClose,
}: Props) {
  const cancelRef = useRef(null);

  if (!task) return null;

  const isCompleted =
    task.status === WorkspaceTaskStatus.Completed;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={Fragment}
          open={isOpen}
          onClose={onClose}
          initialFocus={cancelRef}
        >
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl"
            >
              <DialogPanel className="bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

                {/* Header */}
                <div className="border-b px-6 py-5">
                  <div className="flex justify-between gap-4">
                    <div className="flex-1 min-w-0">

                      <DialogTitle className="text-lg font-semibold text-gray-900 break-words">
                        {task.title}
                      </DialogTitle>

                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            isCompleted
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />

                        <span className="text-sm text-gray-600">
                          {WorkspaceTaskStatus[task.status]}
                        </span>
                      </div>
                    </div>

                    <button
                      ref={cancelRef}
                      onClick={onClose}
                      className="rounded-xl p-2 hover:bg-gray-100 transition"
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="overflow-y-auto p-6 space-y-8">

                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Description
                    </h3>

                    <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                      {task.description ? (
                        <p className="whitespace-pre-wrap text-sm text-gray-700 leading-7">
                          {task.description}
                        </p>
                      ) : (
                        <p className="text-sm italic text-gray-400">
                          No description provided.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Created */}
                  <div>
                    <h3 className="text-sm font-semibold text-red-700 mb-3">
                      Created
                    </h3>

                    <div className="rounded-2xl border border-red-100 px-5 bg-red-50">
                      <InfoRow
                        label="Created By"
                        value={
                          <div className="flex items-center gap-3">
                            <Avatar
                              name={task.createdByUserName}
                              profilePic={task.createdByUserProfilePic}
                            />

                            <span>{task.createdByUserName}</span>
                          </div>
                        }
                      />

                      <InfoRow
                        label="Created At"
                        value={formatDateTime(task.createdAt)}
                      />

                      <InfoRow
                        label="Task Date"
                        value={formatDate(task.taskDate)}
                      />
                    </div>
                  </div>

                  {/* Completed */}
                  {isCompleted && (
                    <div>
                      <h3 className="text-sm font-semibold text-emerald-700 mb-3">
                        Completed
                      </h3>

                      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5">

                        <InfoRow
                          label="Completed By"
                          value={
                            <div className="flex items-center gap-3">
                              <Avatar
                                name={task.completedByUserName}
                                profilePic={
                                  task.completedByUserProfilePic
                                }
                              />

                              <span>
                                {task.completedByUserName}
                              </span>
                            </div>
                          }
                        />

                        <InfoRow
                          label="Completed At"
                          value={formatDateTime(task.completedAt)}
                        />

                        <InfoRow
                          label="Comment"
                          value={
                            task.completionComment ? (
                              <span>
                                {task.completionComment}
                              </span>
                            ) : (
                              <span className="italic text-gray-400">
                                No comment provided.
                              </span>
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

              </DialogPanel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}