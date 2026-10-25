import type { Metadata } from "next";
import { Suspense } from "react";

import { CategoriesPageSearchParams } from "@/features/category/category.type";
import {
  CategoryList,
  CategoryListSkeleton,
} from "@/features/category/components/CategoryList";

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
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold">دسته‌بندی‌ها</h1>
        <p className="text-sm text-muted-foreground">
          فهرست دسته‌بندی‌های خبری و جزئیات هر دسته
        </p>
      </header>

      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
