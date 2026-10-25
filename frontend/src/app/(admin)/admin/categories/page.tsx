import type { Metadata } from "next";
import { Suspense } from "react";

import type { CategoriesPageSearchParams } from "@/features/category/category.type";
import {
  CategoryList,
  CategoryListSkeleton,
} from "@/features/category/components/CategoryList";
import { CreateCategoryDialog } from "@/features/category/components/CreateCategoryDialog";

export const metadata: Metadata = {
  title: "دسته‌بندی‌ها",
};

export default function Page({
  searchParams,
}: {
  searchParams: Promise<CategoriesPageSearchParams>;
}) {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold">دسته‌بندی‌ها</h1>
          <p className="text-sm text-muted-foreground">
            فهرست دسته‌بندی‌های خبری و جزئیات هر دسته
          </p>
        </div>

        <CreateCategoryDialog />
      </header>

      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
