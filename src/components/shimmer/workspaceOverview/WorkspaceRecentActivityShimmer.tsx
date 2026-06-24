export default function WorkspaceRecentActivityShimmer() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded mb-8" />

      <div className="space-y-5">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-4 w-full bg-gray-100 rounded mb-2" />

            <div className="h-3 w-32 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
