"use client";

import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onDeleteAccount: () => void;
}

export default function DashboardDangerZone({ onDeleteAccount }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Danger Zone</h2>

        <p className="mt-1 text-sm text-gray-500">
          Sensitive actions related to your account.
        </p>
      </div>

      <div className="rounded-2xl border border-red-100 bg-red-50/40 p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 shrink-0">
              <TriangleAlert className="h-6 w-6 text-red-600" />
            </div>

            <div>
              <h3 className="font-medium text-gray-800">Delete Account</h3>

              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                Permanently remove your account from active use.
                <br />
                Your account can still be restored later by signing in again and
                confirming the restore.
              </p>
            </div>
          </div>

          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={onDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
