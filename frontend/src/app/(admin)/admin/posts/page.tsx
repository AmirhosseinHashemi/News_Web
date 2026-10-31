import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import {
  PostList,
  PostListSkeleton,
} from "@/features/post/components/PostList";
import type { PostsPageSearchParams } from "@/features/post/post.type";

export const metadata: Metadata = {
  title: "خبرها",
};

export default function Page({
  searchParams,
}: {
  searchParams: Promise<PostsPageSearchParams>;
}) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold">خبرها</h1>
          <p className="text-sm text-muted-foreground">
            فهرست خبرهای ثبت‌شده و جستجو و فیلتر آن‌ها
          </p>
        </div>

        <Link
          href={ROUTES.postCreate}
          className={buttonVariants({ size: "sm" })}
        >
          <Plus className="size-4" aria-hidden="true" />
          ایجاد خبر
        </Link>
      </header>

      <Suspense fallback={<PostListSkeleton />}>
        <PostList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
