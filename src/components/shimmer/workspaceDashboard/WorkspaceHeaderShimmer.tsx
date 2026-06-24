"use client";

export default function WorkspaceHeaderShimmer() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
      <div className="space-y-3">
        {/* Workspace name */}
        <div className="h-8 w-64 bg-gray-200 rounded-lg" />

        {/* Created + Updated */}
        <div className="flex flex-wrap gap-6">
          <div className="h-4 w-40 bg-gray-100 rounded" />

          <div className="h-4 w-40 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}