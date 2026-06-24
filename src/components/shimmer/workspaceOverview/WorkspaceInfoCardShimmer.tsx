export default function WorkspaceInfoCardShimmer() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
      <div className="h-6 w-56 bg-gray-200 rounded mb-2" />

      <div className="h-4 w-80 bg-gray-100 rounded mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="h-4 w-28 bg-gray-200 rounded mb-3" />

            <div className="h-5 w-48 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
