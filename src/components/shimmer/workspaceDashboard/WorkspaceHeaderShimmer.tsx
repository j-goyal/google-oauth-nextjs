"use client";

export default function WorkspaceHeaderShimmer() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
      <div className="space-y-4">
        {/* Workspace Name */}
        <div className="h-8 w-72 rounded-lg bg-gray-200" />

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-2">
              {/* Icon */}
              <div className="h-4 w-4 rounded-full bg-gray-200" />

              {/* Label + Value */}
              <div className="h-4 w-40 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}