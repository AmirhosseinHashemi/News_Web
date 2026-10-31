import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PostRowActions } from "@/features/post/components/PostRowActions";
import { PostStatusBadge } from "@/features/post/components/PostStatusBadge";
import type { Post } from "@/features/post/post.type";
import { faDate } from "@/lib/format";

const SKELETON_ROWS = 6;
const SKELETON_ROW_KEYS = Array.from(
  { length: SKELETON_ROWS },
  (_, index) => `post-row-skeleton-${index}`,
);

interface PostTableProps {
  posts: Post[];
}

export function PostTable({ posts }: PostTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableCaption className="sr-only">فهرست خبرهای ثبت‌شده</TableCaption>

        <TableHeader className="[&_th]:text-start">
          <TableRow>
            <TableHead scope="col" className="ps-4">
              خبر
            </TableHead>
            <TableHead scope="col" className="hidden md:table-cell">
              دسته‌بندی
            </TableHead>
            <TableHead scope="col" className="hidden lg:table-cell">
              نویسنده
            </TableHead>
            <TableHead scope="col">وضعیت</TableHead>
            <TableHead scope="col" className="hidden sm:table-cell">
              تاریخ انتشار
            </TableHead>
            <TableHead scope="col" className="hidden xl:table-cell">
              تاریخ ایجاد
            </TableHead>
            <TableHead scope="col" className="w-12 pe-4">
              <span className="sr-only">عملیات</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="max-w-104 ps-4">
                <div className="flex items-center gap-3">
                  <PostTableCover post={post} />

                  <div className="min-w-0">
                    <p className="line-clamp-2 font-medium">{post.title}</p>
                    <p
                      dir="ltr"
                      className="mt-1 truncate text-xs text-muted-foreground"
                    >
                      {post.slug}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <Badge variant="secondary">{post.category.name}</Badge>
              </TableCell>

              <TableCell className="hidden whitespace-nowrap lg:table-cell">
                {post.author.firstName} {post.author.lastName}
              </TableCell>

              <TableCell>
                <PostStatusBadge status={post.status} />
              </TableCell>

              <TableCell className="hidden whitespace-nowrap text-muted-foreground sm:table-cell">
                {post.publishedAt ? faDate(post.publishedAt) : "—"}
              </TableCell>

              <TableCell className="hidden whitespace-nowrap text-muted-foreground xl:table-cell">
                {faDate(post.createdAt)}
              </TableCell>

              <TableCell className="pe-4 text-end">
                <PostRowActions post={post} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function PostTableCover({ post }: { post: Post }) {
  return (
    <div className="relative size-12 shrink-0 overflow-hidden rounded-md border bg-muted">
      {post.cover ? (
        <Image
          src={post.cover.filename}
          alt=""
          fill
          sizes="48px"
          className="object-cover"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center">
          <ImageIcon
            className="size-4 text-muted-foreground/40"
            aria-hidden="true"
          />
        </span>
      )}
    </div>
  );
}

export function PostTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card" aria-busy="true">
      <span className="sr-only">در حال بارگذاری خبرها…</span>

      <div className="hidden border-b bg-muted/40 px-4 py-3 sm:block">
        <Skeleton className="h-4 w-1/3" />
      </div>

      <div className="divide-y">
        {SKELETON_ROW_KEYS.map((key) => (
          <div key={key} className="flex items-center gap-3 px-4 py-3">
            <Skeleton className="size-12 shrink-0 rounded-md" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>

            <Skeleton className="hidden h-5 w-16 rounded-full sm:block" />
            <Skeleton className="size-8 shrink-0 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
