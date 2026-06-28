"use client";

export default function UserAccessShimmer() {
  return (
    <main className="flex-1 py-5 px-4 pt-30">
      <div className="mx-auto max-w-6xl space-y-6 animate-pulse">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-300 p-8 shadow-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div className="flex items-center gap-6">
              <div className="h-[80px] w-[80px] rounded-full bg-white/40" />

              <div className="space-y-4">
                <div className="h-8 w-56 rounded bg-white/40" />
                <div className="h-5 w-72 rounded bg-white/30" />
                <div className="h-8 w-28 rounded-full bg-white/40" />
              </div>
            </div>

            {/* Right */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="min-w-[220px] rounded-2xl border border-white/20 bg-white/20 p-5">
                <div className="h-4 w-16 rounded bg-white/30" />
                <div className="mt-4 h-6 w-40 rounded bg-white/40" />
              </div>

              <div className="min-w-[180px] rounded-2xl border border-white/20 bg-white/20 p-5">
                <div className="h-4 w-16 rounded bg-white/30" />
                <div className="mt-4 h-7 w-24 rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 min-[840px]:grid-cols-2 gap-6 lg:grid-cols-3">
          {/* Feature List */}
          <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-lg">
            <div className="border-b border-gray-100 px-6 py-5">
              <div className="h-6 w-24 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-48 rounded bg-gray-100" />
            </div>

            <div className="space-y-3 p-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"
                >
                  <div className="h-11 w-11 rounded-xl bg-gray-200" />

                  <div className="flex-1">
                    <div className="h-5 w-28 rounded bg-gray-200" />
                    <div className="mt-2 h-4 w-20 rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Permission List */}
          <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-lg">
            <div className="border-b border-gray-100 px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-100" />

                <div>
                  <div className="h-6 w-40 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-56 rounded bg-gray-100" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-4 p-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="h-5 w-28 rounded bg-gray-200" />
                      <div className="mt-2 h-4 w-20 rounded bg-gray-100" />
                    </div>

                    <div className="h-6 w-6 rounded border border-gray-300 bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
