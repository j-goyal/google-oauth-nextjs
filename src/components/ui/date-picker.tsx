"use client";

import DatePickerLib from "react-datepicker";
import { Calendar } from "lucide-react";

interface Props {
  value?: Date;
  onChange: (date: Date | null) => void;
}

export default function DatePicker({ value, onChange }: Props) {
  return (
    <div className="relative w-full">
      <DatePickerLib
        selected={value}
        onChange={onChange}
        onKeyDown={(e) => e.preventDefault()}
        wrapperClassName="w-full"
        dateFormat="dd MMM yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        popperPlacement="bottom-start"
        className="
      cursor-pointer
      block
      h-9
      w-full
      rounded-md
      border
      border-input
      bg-transparent
      pl-3
      pr-10
      text-sm
      shadow-xs
      outline-none
      placeholder:text-muted-foreground
      focus-visible:border-ring
      focus-visible:ring-[3px]
      focus-visible:ring-ring/50
    "
      />

      <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
    </div>
  );
}