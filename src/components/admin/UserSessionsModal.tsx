"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AdminUserSessionResponse } from "@/types/sessions/AdminUserSessionResponse";
import { getErrorMessage } from "@/utils/getErrorMessage";
import toast from "react-hot-toast";
import { ManageUsersService } from "@/services/ManageUsers.module";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { X } from "lucide-react";
import GridShimmer from "../shimmer/GridShimmer";
import { getSessionStatusBadgeClass } from "@/utils/sessionUtils";

interface UserSessionsModalProps {
  isOpen: boolean;
  userId: string | null;
  onClose: () => void;
}

export default function UserSessionsModal({
  isOpen,
  userId,
  onClose,
}: UserSessionsModalProps) {
  const cancelRef = useRef(null);
  const [sessions, setSessions] = useState<AdminUserSessionResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: ColumnDef<AdminUserSessionResponse>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const baseClass = "px-2 py-0.5 text-xs rounded-full";
        return <span className={`${baseClass} ${getSessionStatusBadgeClass(status)}`}>{status}</span>;
      },
    },
    {
      accessorKey: "os",
      header: "OS",
      cell: ({ row }) => row.original.os || "—",
    },
    {
      accessorKey: "deviceType",
      header: "Device",
      cell: ({ row }) => row.original.deviceType || "—",
    },
    {
      accessorKey: "browser",
      header: "Browser",
      cell: ({ row }) => row.original.browser || "—",
    },
    {
      accessorKey: "ip",
      header: "IP",
      cell: ({ row }) => row.original.ip || "—",
    },
    {
      accessorKey: "lastUsed",
      header: "Last Used",
      cell: ({ row }) => formatDate(row.original.lastUsed?.toString()),
    },
    {
      accessorKey: "expiresAt",
      header: "Expires",
      cell: ({ row }) => formatDate(row.original.expiresAt?.toString()),
    },
    {
      accessorKey: "absoluteExpiresAt",
      header: "Absolute Expiry",
      cell: ({ row }) => formatDate(row.original.absoluteExpiresAt?.toString()),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => formatDate(row.original.createdAt?.toString()),
    },
  ];

  const columnHeaders: string[] = columns.map((col) =>
    typeof col.header === "string" ? col.header : String(col.header)
  );

  useEffect(() => {
    const manageUsersService = ManageUsersService();
    if (!userId || !isOpen) return;

    const fetchSessions = async () => {
      try {
        setLoading(true);
        const res = await manageUsersService.getUserSessionsByUserId(userId);
        if (res.success) {
          setSessions(res.data);
        } else {
          toast.error(getErrorMessage(res.error));
        }
      } catch {
        toast.error("Failed to load sessions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId, isOpen]);

  const formatDate = (dateStr?: string | null) =>
    dateStr
      ? new Date(dateStr).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Asia/Kolkata",
        })
      : "—";

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          as={Fragment}
          initialFocus={cancelRef}
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30 backdrop-blur-sm">
            <motion.div
              key="user-session-modal"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl px-4"
            >
              <DialogPanel className="bg-white rounded-2xl p-6 shadow-xl transition-all max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-2">
                  <DialogTitle className="text-xl font-semibold text-gray-800">
                    User Sessions
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    ref={cancelRef}
                    className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    <X />
                  </button>
                </div>
                <hr className="border-t border-gray-200 mb-4" />

                {loading ? (
                  <GridShimmer showHeader={false} rowCount={5} columns={columnHeaders} />
                ) : sessions.length === 0 ? (
                  <p className="text-gray-500 text-sm">No sessions found.</p>
                ) : (
                  <DataTable columns={columns} data={sessions} />
                )}
              </DialogPanel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
