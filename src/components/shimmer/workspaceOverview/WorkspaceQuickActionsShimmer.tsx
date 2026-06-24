"use client";

export default function WorkspaceQuickActionsShimmer() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
      {/* Header */}
      <div className="mb-5">
        <div className="h-6 w-40 rounded bg-gray-200" />

        <div className="mt-3 h-4 w-64 rounded bg-gray-100" />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="flex h-10 w-40 items-center rounded-md border border-gray-100 bg-gray-50 px-4"
          >
            <div className="h-4 w-4 rounded-full bg-gray-200" />

            <div className="ml-3 h-3 w-20 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}