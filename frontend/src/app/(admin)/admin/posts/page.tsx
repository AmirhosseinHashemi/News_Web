import type { Metadata } from "next";
import { Suspense } from "react";

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
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold">خبرها</h1>
        <p className="text-sm text-muted-foreground">
          فهرست خبرهای ثبت‌شده و جستجو و فیلتر آن‌ها
        </p>
      </header>

      <Suspense fallback={<PostListSkeleton />}>
        <PostList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
