export default function WorkspaceTaskFiltersShimmer() {
  return (
    <div className="px-4">
      <div className="max-w-5xl mx-auto animate-pulse">
        <div className="rounded-lg border bg-white p-4 animate-pulse">
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-12">
            {/* From Date */}
            <div className="xl:col-span-3">
              <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-9 w-full bg-gray-100 rounded-md" />
            </div>

            {/* To Date */}
            <div className="xl:col-span-3">
              <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
              <div className="h-9 w-full bg-gray-100 rounded-md" />
            </div>

            {/* Status */}
            <div className="xl:col-span-2">
              <div className="h-4 w-14 bg-gray-200 rounded mb-2" />
              <div className="h-9 w-full bg-gray-100 rounded-md" />
            </div>

            {/* Buttons */}
            <div className="flex items-end gap-2 sm:col-span-2 xl:col-span-4 xl:justify-end">
              <div className="h-9 flex-1 sm:flex-none sm:w-[110px] bg-gray-200 rounded-md" />

              <div className="h-9 flex-1 sm:flex-none sm:w-[110px] bg-gray-100 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
