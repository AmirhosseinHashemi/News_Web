import { RefreshCw, X } from "lucide-react";
import Link from "next/link";

import { PaginationBar } from "@/components/shared/PaginationBar";
import { SearchField } from "@/components/shared/SearchField";
import { EmptyState, ErrorState } from "@/components/shared/StateView";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/config/routes";
import { getCategoriesReq } from "@/features/category/category.api";
import { CategoryFilter } from "@/features/post/components/CategoryFilter";
import {
  PostTable,
  PostTableSkeleton,
} from "@/features/post/components/PostTable";
import { getPostsReq } from "@/features/post/post.api";
import type { PostsPageSearchParams } from "@/features/post/post.type";
import { parsePage, parsePositiveInt } from "@/lib/utils";

interface PostListProps {
  searchParams: Promise<PostsPageSearchParams>;
}

export async function PostList({ searchParams }: PostListProps) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";
  const page = parsePage(params.page);
  const categoryId = parsePositiveInt(params.categoryId);

  const [postsResponse, categoriesResponse] = await Promise.all([
    getPostsReq({ page, search, categoryId: categoryId ?? undefined }),
    getCategoriesReq({ limit: 100 }),
  ]);

  if (!postsResponse.success) {
    return (
      <ErrorState
        title="بارگذاری خبرها ناموفق بود"
        description={postsResponse.message}
        actions={
          <Link
            href={buildHref(search, categoryId)}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            تلاش دوباره
          </Link>
        }
      />
    );
  }

  const { data: posts, meta } = postsResponse;
  const categories = categoriesResponse.success ? categoriesResponse.data : [];
  const activeCategory = categories.find(
    (category) => category.id === categoryId,
  );
  const hasFilters = Boolean(search || categoryId);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchField
          initialValue={search}
          placeholder="جستجوی خبر…"
          ariaLabel="جستجوی خبر"
        />

        {categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            activeCategoryId={categoryId}
          />
        )}
      </div>

      {posts.length === 0 ? (
        <EmptyState
          title="خبری پیدا نشد"
          description={getEmptyDescription(search, activeCategory?.name)}
          actions={
            hasFilters ? (
              <Link
                href={ROUTES.posts}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                پاک کردن فیلترها
              </Link>
            ) : undefined
          }
        />
      ) : (
        <PostTable posts={posts} />
      )}

      {meta && (
        <PaginationBar
          meta={meta}
          basePath={ROUTES.posts}
          search={search}
          itemLabel="خبر"
          filters={{
            categoryId: categoryId ? String(categoryId) : undefined,
          }}
        />
      )}
    </div>
  );
}

export function PostListSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <span className="sr-only">در حال بارگذاری خبرها…</span>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-9 w-full rounded-md sm:max-w-sm" />
        <Skeleton className="h-9 w-full rounded-md sm:w-56" />
      </div>

      <PostTableSkeleton />
    </div>
  );
}

function getEmptyDescription(search: string, categoryName?: string) {
  if (search && categoryName) {
    return `در دسته «${categoryName}» نتیجه‌ای برای «${search}» وجود ندارد.`;
  }

  if (search) return `نتیجه‌ای برای «${search}» وجود ندارد.`;
  if (categoryName)
    return `در دسته «${categoryName}» هنوز خبری منتشر نشده است.`;

  return "هنوز خبری منتشر نشده است.";
}

function buildHref(search: string, categoryId: number | null) {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (categoryId) params.set("categoryId", String(categoryId));

  const query = params.toString();
  return query ? `${ROUTES.posts}?${query}` : ROUTES.posts;
}
