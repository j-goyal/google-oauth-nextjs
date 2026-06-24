"use client";

import { Activity } from "lucide-react";

export default function WorkspaceRecentActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-indigo-100 p-3 rounded-2xl">
          <Activity className="h-5 w-5 text-indigo-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Activity
          </h2>

          <p className="text-sm text-gray-500">
            Latest activity inside this workspace.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-500 text-sm">No recent activity yet.</p>

        <p className="mt-2 text-xs text-gray-400">
          Task completions, member joins and other events will appear here.
        </p>
      </div>
    </div>
  );
}
