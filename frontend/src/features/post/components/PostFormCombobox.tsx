"use client";

import { useMemo } from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type FormOption = {
  id: number;
  name: string;
};

type ComboboxOption = {
  value: string;
  label: string;
};

interface PostFormComboboxProps {
  id: string;
  options: FormOption[];
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder: string;
  ariaLabel: string;
  invalid?: boolean;
  allowClear?: boolean;
}

export function PostFormCombobox({
  id,
  options,
  value,
  onChange,
  placeholder,
  ariaLabel,
  invalid,
  allowClear = false,
}: PostFormComboboxProps) {
  const items = useMemo<ComboboxOption[]>(
    () =>
      options.map((option) => ({
        value: String(option.id),
        label: option.name,
      })),
    [options],
  );

  const selected = items.find((item) => item.value === String(value)) ?? null;

  function handleValueChange(nextValue: ComboboxOption | null) {
    onChange(nextValue ? Number(nextValue.value) : null);
  }

  return (
    <Combobox items={items} value={selected} onValueChange={handleValueChange}>
      <ComboboxInput
        id={id}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-invalid={invalid}
        showClear={allowClear}
        className="w-full"
      />

      <ComboboxContent>
        <ComboboxEmpty>موردی پیدا نشد.</ComboboxEmpty>

        <ComboboxList>
          {(item: ComboboxOption) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
