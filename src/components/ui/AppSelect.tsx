"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { ReactNode } from "react";

export interface AppSelectOption {
  label: string;
  value: string;
}

interface AppSelectProps {
  value: string;
  options: AppSelectOption[];
  onValueChange: (value: string) => void;
  disabled?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
  renderSelectedValue?: (value: string) => ReactNode;
}

export default function AppSelect({
  value,
  options,
  onValueChange,
  disabled = false,
  triggerClassName = "",
  contentClassName = "",
  renderSelectedValue,
}: AppSelectProps) {
  return (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <Select.Trigger
        className={`
          inline-flex items-center justify-center gap-2
          rounded-md border border-gray-300
          px-3 py-2 text-sm cursor-pointer 
          hover:border-gray-400 transition-all duration-200
          disabled:opacity-50 
          ${triggerClassName}
        `}
      >
        {renderSelectedValue ? renderSelectedValue(value) : <Select.Value />}

        <Select.Icon>
          <ChevronDown size={12} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className={`
            z-50 overflow-hidden rounded-md border
            bg-white shadow-lg
            ${contentClassName}
          `}
        >
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex items-center cursor-pointer
                           select-none rounded-md px-8 py-2.5
                           text-sm text-gray-700 outline-none
                         hover:bg-gray-100 data-[highlighted]:bg-indigo-50 data-[highlighted]:text-indigo-700
                          "
              >
                <Select.ItemText>{option.label}</Select.ItemText>

                <Select.ItemIndicator className="absolute left-2">
                  <Check size={12} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
