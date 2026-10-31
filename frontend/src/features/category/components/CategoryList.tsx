import { RefreshCw } from "lucide-react";
import Link from "next/link";

import { PaginationBar } from "@/components/shared/PaginationBar";
import { SearchField } from "@/components/shared/SearchField";
import { EmptyState, ErrorState } from "@/components/shared/StateView";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/config/routes";
import { getCategoriesReq } from "@/features/category/category.api";
import type { CategoriesPageSearchParams } from "@/features/category/category.type";
import {
  CategoryCard,
  CategoryCardSkeleton,
} from "@/features/category/components/CategoryCard";
import { buildHref, parsePage } from "@/lib/utils";

const SKELETON_COUNT = 6;

interface CategoryListProps {
  searchParams: Promise<CategoriesPageSearchParams>;
}

export async function CategoryList({ searchParams }: CategoryListProps) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";
  const page = parsePage(params.page);

  const response = await getCategoriesReq({ page, search });

  if (!response.success) {
    return (
      <ErrorState
        title="بارگذاری دسته‌بندی‌ها ناموفق بود"
        description={response.message}
        actions={
          <Link
            href={buildHref(ROUTES.categories, { search })}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
            })}
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            تلاش دوباره
          </Link>
        }
      />
    );
  }

  const { data: categories, meta } = response;

  return (
    <div className="space-y-5">
      <SearchField
        initialValue={search}
        placeholder="جستجوی دسته‌بندی…"
        ariaLabel="جستجوی دسته‌بندی"
      />

      {categories.length === 0 && (
        <EmptyState
          title="دسته‌بندی‌ای پیدا نشد"
          description={
            search
              ? `نتیجه‌ای برای «${search}» وجود ندارد.`
              : "هنوز دسته‌بندی‌ای ثبت نشده است."
          }
          actions={
            search ? (
              <Link
                href={ROUTES.categories}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                })}
              >
                پاک کردن جستجو
              </Link>
            ) : undefined
          }
        />
      )}

      {categories.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}

      {meta && (
        <PaginationBar
          meta={meta}
          basePath={ROUTES.categories}
          search={search}
          itemLabel="دسته‌بندی"
        />
      )}
    </div>
  );
}

export function CategoryListSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <span className="sr-only">در حال بارگذاری دسته‌بندی‌ها…</span>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-9 w-full rounded-md sm:max-w-sm" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
