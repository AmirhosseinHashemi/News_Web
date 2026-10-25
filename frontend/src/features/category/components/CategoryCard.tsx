import { CalendarClock, CalendarPlus, Hash, Link2 } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@/features/category/category.type";
import { Detail } from "@/features/category/components/Detail";
import { faDateTime, faNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const CARD_DETAILS_COUNT = 4;

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const description =
    category.description?.trim() || "توضیحی برای این دسته‌بندی ثبت نشده است.";

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md sm:p-5",
        className,
      )}
    >
      <header className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-title font-bold">{category.name}</h2>
          <p
            dir="ltr"
            title={category.slug}
            className="mt-1 w-fit max-w-full truncate rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
          >
            /{category.slug}
          </p>
        </div>
      </header>

      <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">
        {description}
      </p>

      <dl className="mt-auto grid grid-cols-1 gap-x-4 gap-y-2 border-t pt-4 text-xs">
        <Detail icon={Hash} label="شناسه" value={faNumber(category.id)} />
        <Detail
          icon={Link2}
          label="نامک"
          value={category.slug}
          dir="ltr"
          mono
        />
        <Detail
          icon={CalendarPlus}
          label="ایجاد"
          value={faDateTime(category.createdAt)}
        />
        <Detail
          icon={CalendarClock}
          label="آخرین ویرایش"
          value={faDateTime(category.updatedAt)}
        />
      </dl>
    </article>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div
      className="flex flex-col gap-4 rounded-lg border bg-card p-4 sm:p-5"
      aria-hidden="true"
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="mt-auto grid grid-cols-1 gap-x-4 gap-y-2 border-t pt-4">
        {Array.from({ length: CARD_DETAILS_COUNT }, (_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
