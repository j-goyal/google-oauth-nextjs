"use client";

import { motion } from "framer-motion";
import { FeatureDto } from "@/types/features/FeatureDto";
import { getFeatureIcon } from "@/utils/featureUtils";

interface FeatureListProps {
  features: FeatureDto[];
  selectedFeatureCode: string;
  onSelect: (featureCode: string) => void;
}

export default function FeatureList({
  features,
  selectedFeatureCode,
  onSelect,
}: FeatureListProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-lg backdrop-blur-sm">
      <div className="border-b border-gray-100 px-6 py-5">
        <h2 className="text-lg font-semibold text-gray-900">Features</h2>

        <p className="mt-1 text-sm text-gray-500">
          Select a feature to manage user permissions.
        </p>
      </div>

      {features.length === 0 ? (
        <div className="flex h-56 items-center justify-center text-sm text-gray-500">
          No features available.
        </div>
      ) : (
        <div className="p-3 space-y-2">
          {features.map((feature) => {
            const selected = selectedFeatureCode === feature.code;

            const Icon = getFeatureIcon(feature.code);

            return (
              <motion.button
                key={feature.id}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(feature.code)}
                className={` cursor-pointer relative w-full overflow-hidden rounded-xl text-left transition-all duration-200 ${
                  selected
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md"
                    : "hover:bg-gray-100"
                }`}
              >
                {selected && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-white" />
                )}

                <div className="flex items-center gap-4 px-5 py-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                      selected
                        ? "bg-white/20 text-white"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${
                        selected ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {feature.name}
                    </h3>

                    <p
                      className={`mt-0.5 text-xs ${
                        selected ? "text-purple-100" : "text-gray-500"
                      }`}
                    >
                      Feature Code: {feature.code}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}
