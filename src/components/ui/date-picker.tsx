"use client";

import DatePickerLib from "react-datepicker";
import { Calendar } from "lucide-react";

interface Props {
  value?: Date;
  onChange: (date: Date | null) => void;
}

export default function DatePicker({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <DatePickerLib
        selected={value}
        onChange={onChange}
        dateFormat="dd MMM yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        popperPlacement="top-start"
        className="
          border-input
          placeholder:text-muted-foreground
          focus-visible:border-ring
          focus-visible:ring-ring/50
          focus-visible:ring-[3px]
          flex h-9 w-full rounded-md border
          bg-transparent px-3 py-1 text-sm shadow-xs
          outline-none
        "
      />

      <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
}