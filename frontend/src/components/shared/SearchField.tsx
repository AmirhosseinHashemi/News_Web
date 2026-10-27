"use client";

import { Loader2, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import { Input } from "@/components/ui/input";

const SEARCH_DEBOUNCE_MS = 350;

interface SearchFieldProps {
  initialValue: string;
  placeholder: string;
  ariaLabel: string;
  clearLabel?: string;
}

export function SearchField({
  initialValue,
  placeholder,
  ariaLabel,
  clearLabel = "پاک کردن جستجو",
}: SearchFieldProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const lastPushed = useRef(initialValue);
  const currentSearch = searchParams.get("search")?.trim() ?? "";

  useEffect(() => {
    if (currentSearch !== lastPushed.current) {
      setValue(currentSearch);
      lastPushed.current = currentSearch;
    }
  }, [currentSearch]);

  useEffect(() => {
    const trimmed = value.trim();
    if (trimmed === lastPushed.current) return;

    const timer = setTimeout(() => {
      lastPushed.current = trimmed;

      const params = new URLSearchParams(searchParams.toString());
      if (trimmed) params.set("search", trimmed);
      else params.delete("search");
      params.delete("page");

      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `${pathname}?${query}` : pathname, {
          scroll: false,
        });
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value, pathname, router, searchParams]);

  function clearSearch() {
    setValue("");
    lastPushed.current = "";

    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("page");

    const query = params.toString();
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  }

  return (
    <div className="relative w-full sm:max-w-sm">
      <Search
        className="pointer-events-none absolute inset-y-0 inset-s-3 my-auto size-4 text-muted-foreground"
        aria-hidden
      />

      <Input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="pe-9 ps-9 [&::-webkit-search-cancel-button]:appearance-none"
      />

      <span className="absolute inset-y-0 inset-e-2 my-auto flex size-6 items-center justify-center">
        {isPending ? (
          <Loader2
            className="size-4 animate-spin text-muted-foreground"
            aria-hidden
          />
        ) : value ? (
          <button
            type="button"
            onClick={clearSearch}
            aria-label={clearLabel}
            className="flex size-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-3.5" aria-hidden />
          </button>
        ) : null}
      </span>
    </div>
  );
}
