"use client";

export default function WorkspaceNavigationShimmer() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-2 animate-pulse">
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-10 w-24 rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}