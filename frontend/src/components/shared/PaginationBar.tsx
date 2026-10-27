import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { faNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ApiMeta } from "@/types/api.type";

interface PaginationBarProps {
  meta: ApiMeta;
  basePath: string;
  search: string;
  itemLabel: string;
}

export function PaginationBar({
  meta,
  basePath,
  search,
  itemLabel,
}: PaginationBarProps) {
  if (meta.totalPages <= 1) return null;

  const firstItem = (meta.currentPage - 1) * meta.limit + 1;
  const lastItem = Math.min(meta.currentPage * meta.limit, meta.totalItems);

  const previousHref = meta.hasPreviousPage
    ? buildHref(basePath, meta.currentPage - 1, search)
    : null;

  const nextHref = meta.hasNextPage
    ? buildHref(basePath, meta.currentPage + 1, search)
    : null;

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t pt-4 sm:flex-row">
      <p className="text-xs text-muted-foreground" aria-live="polite">
        نمایش {faNumber(firstItem)} تا {faNumber(lastItem)} از{" "}
        {faNumber(meta.totalItems)} {itemLabel}
      </p>

      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          صفحه {faNumber(meta.currentPage)} از {faNumber(meta.totalPages)}
        </p>

        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              {previousHref ? (
                <Link
                  href={previousHref}
                  aria-label="رفتن به صفحه قبلی"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "sm",
                    }),
                    "gap-1",
                  )}
                >
                  <ChevronRight className="size-4" aria-hidden="true" />
                  قبلی
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "sm",
                    }),
                    "pointer-events-none gap-1 opacity-50",
                  )}
                >
                  <ChevronRight className="size-4" aria-hidden="true" />
                  قبلی
                </span>
              )}
            </PaginationItem>

            <PaginationItem>
              {nextHref ? (
                <Link
                  href={nextHref}
                  aria-label="رفتن به صفحه بعدی"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "sm",
                    }),
                    "gap-1",
                  )}
                >
                  بعدی
                  <ChevronLeft className="size-4" aria-hidden="true" />
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "sm",
                    }),
                    "pointer-events-none gap-1 opacity-50",
                  )}
                >
                  بعدی
                  <ChevronLeft className="size-4" aria-hidden="true" />
                </span>
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function buildHref(basePath: string, page: number, search: string) {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}
