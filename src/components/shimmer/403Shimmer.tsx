export default function AccessDeniedShimmer() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md text-center space-y-6 animate-pulse">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-gray-200 rounded-full" />
        </div>
        <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-4/6 mx-auto" />
        </div>
        <div className="h-10 bg-gray-300 rounded-xl w-1/2 mx-auto mt-2" />
      </div>
    </main>
  );
}
