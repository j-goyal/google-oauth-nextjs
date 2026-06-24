"use client";

export default function DashboardShimmer() {
  return (
    <main className="flex-1 pt-30 pb-10 px-4 animate-pulse">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Dashboard Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="h-9 w-28 rounded-full bg-indigo-50" />

          <div className="mt-5 h-9 w-80 rounded bg-gray-200" />

          <div className="mt-4 h-4 w-96 rounded bg-gray-100" />
        </div>

        {/* Account Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="mb-6">
            <div className="h-7 w-52 rounded bg-gray-200" />

            <div className="mt-3 h-4 w-56 rounded bg-gray-100" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-gray-200 shrink-0" />

                  <div className="flex-1">
                    <div className="h-4 w-20 rounded bg-gray-200" />

                    <div className="mt-3 h-5 w-36 rounded bg-gray-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div>
          <div className="mb-5">
            <div className="h-7 w-28 rounded bg-gray-200" />

            <div className="mt-3 h-4 w-48 rounded bg-gray-100" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gray-200 shrink-0" />

                  <div className="flex-1">
                    <div className="h-5 w-28 rounded bg-gray-200" />

                    <div className="mt-3 h-4 w-48 rounded bg-gray-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="mb-6">
            <div className="h-7 w-40 rounded bg-gray-200" />

            <div className="mt-3 h-4 w-52 rounded bg-gray-100" />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-gray-200 shrink-0" />

                <div>
                  <div className="h-5 w-32 rounded bg-gray-200" />

                  <div className="mt-3 h-4 w-72 rounded bg-gray-100" />

                  <div className="mt-2 h-4 w-56 rounded bg-gray-100" />
                </div>
              </div>

              <div className="h-10 w-36 rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
