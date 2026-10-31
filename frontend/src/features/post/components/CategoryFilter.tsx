"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import type { Category } from "@/features/category/category.type";

type CategoryOption = {
  value: string;
  label: string;
};

const ALL_CATEGORIES: CategoryOption = {
  value: "all",
  label: "همه دسته‌بندی‌ها",
};

interface CategoryFilterProps {
  categories: Pick<Category, "id" | "name">[];
  activeCategoryId: number | null;
}

export function CategoryFilter({
  categories,
  activeCategoryId,
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const items = useMemo(
    () => [
      ALL_CATEGORIES,
      ...categories.map((category) => ({
        value: String(category.id),
        label: category.name,
      })),
    ],
    [categories],
  );

  const activeValue = activeCategoryId
    ? String(activeCategoryId)
    : ALL_CATEGORIES.value;

  const selectedCategory =
    items.find((item) => item.value === activeValue) ?? ALL_CATEGORIES;

  function handleValueChange(value: CategoryOption | null) {
    const nextValue = value?.value ?? ALL_CATEGORIES.value;
    if (nextValue === activeValue) return;

    const params = new URLSearchParams(searchParams.toString());

    if (nextValue === ALL_CATEGORIES.value) params.delete("categoryId");
    else params.set("categoryId", nextValue);

    params.delete("page");

    const query = params.toString();

    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  }

  return (
    <div className="w-full sm:w-56" aria-busy={isPending}>
      <Combobox
        items={items}
        value={selectedCategory}
        onValueChange={handleValueChange}
      >
        <ComboboxInput
          disabled={isPending}
          placeholder="همه دسته‌بندی‌ها"
          aria-label="فیلتر بر اساس دسته‌بندی"
          className="w-full"
          showClear
        />

        <ComboboxContent>
          <ComboboxEmpty>دسته‌بندی‌ای پیدا نشد.</ComboboxEmpty>

          <ComboboxList>
            {(item: CategoryOption) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
