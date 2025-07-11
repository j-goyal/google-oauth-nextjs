"use client";

import { useEffect, useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { ManageMe } from "@/services/ManageMe.module";
import { SessionDto } from "@/types/sessions/SessionDto";
import AuthLayout from "@/components/AuthLayout";
import GridShimmer from "@/components/shimmer/GridShimmer";

export default function ActiveSessionsPage() {
  const [sessions, setSessions] = useState<SessionDto[]>([]);

  useEffect(() => {
    const meService = ManageMe();
    const fetchSessions = async () => {
      try {
        const response = await meService.getMyActiveSessions();
        if (response.success) {
          setSessions(response.data);
        } else {
          toast.error(getErrorMessage(response.error));
        }
      } catch {
        toast.error("Failed to load sessions. Please try again later.");
      }
    };

    fetchSessions();
  }, []);

  const columns: ColumnDef<SessionDto>[] = useMemo(
    () => [
      {
        id: "deviceInfo",
        header: "Device Info",
        cell: ({ row }) => {
          const { browser, os, deviceType } = row.original;
          return (
            <div className="text-sm text-gray-800 space-y-0.5">
              <div className="font-medium">{browser || "Unknown"}</div>
              <div className="text-gray-600 text-xs">
                {os || "Unknown"} • {deviceType || "Unknown"}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "ip",
        header: "IP Address",
        cell: ({ row }) => (
          <span className="text-sm text-gray-600 break-words">
            {row.original.ip}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt);
          return (
            <span className="text-sm text-gray-600">
              {date.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata",
              })}
            </span>
          );
        },
      },
      {
        accessorKey: "lastUsed",
        header: "Last Used",
        cell: ({ row }) => {
          const date = row.original.lastUsed
            ? new Date(row.original.lastUsed)
            : null;
          return (
            <span className="text-sm text-gray-600">
              {date
                ? date.toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Kolkata",
                  })
                : "—"}
            </span>
          );
        },
      },
      {
        id: "current",
        header: "Status",
        cell: ({ row }) => (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              row.original.isCurrent
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {row.original.isCurrent ? "This Device" : "Other Session"}
          </span>
        ),
      },
    ],
    []
  );

  const columnHeaders: string[] = columns.map((col) =>
    typeof col.header === "string" ? col.header : String(col.header)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
      <Header />
      <AuthLayout skeleton={<GridShimmer columns={columnHeaders} />}>
        <main className="flex-1 py-5 px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Active Sessions
            </h1>
            <DataTable columns={columns} data={sessions} />
          </div>
        </main>
      </AuthLayout>
      <Footer />
    </div>
  );
}
