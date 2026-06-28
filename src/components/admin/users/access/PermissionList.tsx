"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { FeatureDto } from "@/types/features/FeatureDto";
import { PermissionDto } from "@/types/permissions/PermissionDto";
import { getFeatureIcon } from "@/utils/featureUtils";

interface PermissionListProps {
  feature: FeatureDto;
  permissions: PermissionDto[];
  selectedPermissions: string[];
  onToggle: (permissionCode: string) => void;
}

export default function PermissionList({
  feature,
  permissions,
  selectedPermissions,
  onToggle,
}: PermissionListProps) {
  const FeatureIcon = getFeatureIcon(feature.code);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-lg backdrop-blur-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <FeatureIcon className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {feature.name}
            </h2>

            <p className="text-sm text-gray-500">
              Select the permissions this user should have.
            </p>
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div className="p-6">
        {permissions.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-gray-300 text-sm text-gray-500">
            No permissions available for this feature.
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-4">
            {permissions.map((permission) => {
              const checked = selectedPermissions.includes(permission.code);

              return (
                <motion.button
                  key={permission.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onToggle(permission.code)}
                  className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 ${
                    checked
                      ? "border-purple-500 bg-purple-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {permission.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Permission Code: {permission.code}
                      </p>
                    </div>

                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors ${
                        checked
                          ? "border-purple-500 bg-purple-500 text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {checked && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
