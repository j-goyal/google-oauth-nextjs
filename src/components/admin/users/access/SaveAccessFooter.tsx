"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface SaveAccessFooterProps {
  onSave: () => void | Promise<void>;
  isLoading?: boolean;
  hasChanges?: boolean;
}

export default function SaveAccessFooter({
  onSave,
  isLoading = false,
  hasChanges = true,
}: SaveAccessFooterProps) {
  return (
    <div className="sticky bottom-5 z-20">
      <div className="rounded-2xl border border-white/60 bg-white/95 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Save Changes</h3>

            <p className="mt-1 text-sm text-gray-500">
              {hasChanges
                ? "You have unsaved permission changes."
                : "All permission changes have been saved."}
            </p>
          </div>

          <Button
            onClick={onSave}
            disabled={isLoading || !hasChanges}
            className="cursor-pointer min-w-[170px] bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
