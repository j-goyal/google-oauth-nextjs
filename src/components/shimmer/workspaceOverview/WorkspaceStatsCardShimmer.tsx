export default function WorkspaceStatsCardsShimmer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-xl p-6 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-4" />

              <div className="h-8 w-12 bg-gray-100 rounded" />
            </div>

            <div className="h-12 w-12 rounded-2xl bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
