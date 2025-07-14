interface GridShimmerProps {
  columns: string[];
  rowCount?: number;
  filters?: number;
}

export default function GridShimmer({
  columns,
  rowCount = 3,
  filters = 0,
}: GridShimmerProps) {
  const rows = Array.from({ length: rowCount });
  const colClassMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
  };
  const colClass = colClassMap[columns.length] || "grid-cols-3";
  return (
    <main className="flex-1 py-5 px-4 pt-30">
      <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-300 rounded" />
        {filters > 0 && (
          <div
            className={`grid gap-4 grid-cols-1 sm:grid-cols-${Math.min(
              filters,
              2
            )}`}
          >
            {Array.from({ length: filters }).map((_, i) => (
              <div key={i} className="h-10 w-full bg-gray-200 rounded" />
            ))}
          </div>
        )}
        <div className="border rounded-xl overflow-hidden shadow">
          <div
            className={`grid ${colClass} bg-gray-100 text-xs font-semibold text-gray-500`}
          >
            {columns.map((h, i) => (
              <div
                key={h}
                className={`px-4 py-3 truncate ${
                  i === 0 ? "pl-6" : i === columns.length - 1 ? "pr-6" : ""
                }`}
              >
                {h}
              </div>
            ))}
          </div>
          {rows.map((_, i) => (
            <div
              key={i}
              className={`grid ${colClass} items-center border-t bg-gray-50`}
            >
              {columns.map((_, j) => (
                <div key={j} className="px-4 py-4">
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ))}
          <div className="flex bg-gray-50 flex-col sm:flex-row justify-between items-center px-4 py-4 gap-4 sm:gap-0 animate-pulse">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="flex items-center gap-4">
              <div className="h-9 w-20 bg-gray-200 rounded-md" />
              <div className="flex gap-2">
                <div className="h-9 w-20 bg-gray-200 rounded-md" />
                <div className="h-9 w-20 bg-gray-200 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
