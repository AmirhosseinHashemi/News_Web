"use client";

import { cn } from "cn";
import { X } from "lucide-react";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

interface PersianDatePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
}

export default function PersianDatePicker({
  value,
  onChange,
  placeholder = "انتخاب تاریخ",
  disabled = false,
  allowClear = true,
  className,
}: PersianDatePickerProps) {
  const toPersianDate = (date?: Date | null) => {
    if (!date || Number.isNaN(date.getTime())) return null;

    return new DateObject({
      date,
      calendar: gregorian,
    }).convert(persian);
  };

  const handleChange = (date: DateObject | null) => {
    if (!date) {
      onChange(null);
      return;
    }

    const gregorianDate = date.convert(gregorian).toDate();

    onChange(gregorianDate);
  };

  const canClear = !!value && !disabled && allowClear;

  return (
    <div className="relative w-full" dir="rtl">
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={toPersianDate(value)}
        onChange={handleChange}
        format="YYYY/MM/DD"
        placeholder={placeholder}
        disabled={disabled}
        calendarPosition="bottom-right"
        containerClassName="w-full"
        inputClass={cn(
          "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          canClear && "pl-8",
          className,
        )}
      />

      {canClear && (
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label="پاک کردن تاریخ"
          className="absolute inset-y-0 left-1 my-auto flex size-7 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
