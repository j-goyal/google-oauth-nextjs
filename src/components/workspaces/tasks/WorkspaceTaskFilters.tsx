"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import DatePicker from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { WorkspaceTaskStatus } from "@/enums/workspaceTasks/status";
import { WorkspaceTaskFilters as WorkspaceTaskFiltersType } from "@/types/workspaceTasks/WorkspaceTasksFilters";

interface Props {
  filters: WorkspaceTaskFiltersType;
  onApply: (filters: WorkspaceTaskFiltersType) => void;
  onReset: () => void;
}

export default function WorkspaceTaskFilters({
  filters,
  onApply,
  onReset,
}: Props) {
  const [localFilters, setLocalFilters] =
    useState<WorkspaceTaskFiltersType>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-12">
        {/* From Date */}
        <div className="xl:col-span-3">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            From Date
          </label>

          <DatePicker
            value={localFilters.fromDate}
            onChange={(date) =>
              setLocalFilters((prev) => ({
                ...prev,
                fromDate: date ?? undefined,
              }))
            }
          />
        </div>

        {/* To Date */}
        <div className="xl:col-span-3">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            To Date
          </label>

          <DatePicker
            value={localFilters.toDate}
            onChange={(date) =>
              setLocalFilters((prev) => ({
                ...prev,
                toDate: date ?? undefined,
              }))
            }
          />
        </div>

        {/* Status */}
        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Status
          </label>

          <div className="relative">
            <select
              value={localFilters.status?.toString() ?? ""}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  status:
                    e.target.value === ""
                      ? undefined
                      : (Number(e.target.value) as WorkspaceTaskStatus),
                }))
              }
              className="
                cursor-pointer
                h-9
                w-full
                appearance-none
                rounded-md
                border
                border-input
                bg-white
                px-3
                pr-10
                text-sm
                shadow-xs
                outline-none
                transition-colors
                hover:border-gray-400
                focus-visible:border-ring
                focus-visible:ring-[3px]
                focus-visible:ring-ring/50
              "
            >
              <option value="">All</option>
              <option value={WorkspaceTaskStatus.Pending}>Pending</option>
              <option value={WorkspaceTaskStatus.Completed}>Completed</option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-2 min-[480px]:col-span-2 xl:col-span-4 xl:justify-end">
          <Button
            className="flex-1 min-[480px]:flex-none min-[480px]:min-w-[110px]"
            onClick={() => onApply(localFilters)}
          >
            Apply
          </Button>

          <Button
            variant="outline"
            className="flex-1 min-[480px]:flex-none min-[480px]:min-w-[110px]"
            onClick={() => {
              setLocalFilters({});
              onReset();
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
