import { Badge } from "@/components/ui/badge";
import type { ArticleStatus } from "@/features/posts/post.type";
import { cn } from "@/lib/utils";

const STATUS_META: Record<ArticleStatus, { label: string; className: string }> =
  {
    PUBLISHED: {
      label: "منتشرشده",
      className: "bg-success/12 text-success",
    },
    DRAFT: {
      label: "پیش‌نویس",
      className: "bg-warning/12 text-warning",
    },
  };

interface ArticleStatusBadgeProps {
  status: ArticleStatus;
  className?: string;
}

export function ArticleStatusBadge({
  status,
  className,
}: ArticleStatusBadgeProps) {
  const meta = STATUS_META[status];

  return (
    <Badge variant="secondary" className={cn(meta.className, className)}>
      {meta.label}
    </Badge>
  );
}
