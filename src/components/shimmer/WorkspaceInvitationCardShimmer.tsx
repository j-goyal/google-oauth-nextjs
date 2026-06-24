export default function WorkspaceInvitationCardShimmer() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
      {/* Header */}
      <div className="mb-6">
        <div className="h-6 w-52 bg-gray-300 rounded mb-3" />

        <div className="h-4 w-72 bg-gray-200 rounded" />
      </div>

      <div className="space-y-6">
        {/* Join Code */}
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-3" />

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <div className="h-7 w-28 bg-gray-300 rounded" />

            <div className="h-9 w-32 bg-gray-200 rounded-lg" />
          </div>
        </div>

        {/* Invitation Link */}
        <div>
          <div className="h-4 w-28 bg-gray-200 rounded mb-3" />

          <div className="flex items-center gap-3">
            <div className="flex-1 h-12 bg-gray-100 border border-gray-200 rounded-xl" />

            <div className="h-10 w-24 bg-gray-200 rounded-lg" />
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 w-28 bg-gray-200 rounded mb-3" />

            <div className="h-7 w-20 bg-gray-300 rounded-full" />
          </div>

          <div className="h-10 w-28 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
