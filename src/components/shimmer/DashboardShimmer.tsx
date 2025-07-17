export default function DashboardShimmer() {
  return (
    <main className="flex-1 pt-30 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-6 animate-pulse">
        {/* Header section */}
        <div className="flex justify-between items-center border-b pb-4 mb-6 flex-wrap gap-4">
          <div className="flex-1">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
          <div className="w-16 h-16 rounded-full bg-gray-200" />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-6 text-center">
          {[1, 2].map((i) => (
            <div key={i} className="p-5 rounded-xl bg-gray-100 shadow-md">
              <div className="h-4 bg-gray-300 w-1/2 mx-auto mb-2 rounded" />
              <div className="h-4 bg-gray-200 w-3/4 mx-auto rounded" />
            </div>
          ))}
        </div>

        <div className="px-4 sm:px-6 py-4">
          <div className="h-5 bg-gray-300 w-32 mb-4 rounded animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 p-6 rounded-xl shadow-md text-center animate-pulse"
              >
                <div className="h-8 w-8 bg-gray-300 rounded-full mx-auto mb-3" />
                <div className="h-3 bg-gray-300 w-28 mx-auto rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-32 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    </main>
  );
}
