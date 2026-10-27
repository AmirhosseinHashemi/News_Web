import { Badge } from "@/components/ui/badge";
import { PostStatus } from "@/features/post/post.type";
import { cn } from "@/lib/utils";

const STATUS_META: Record<PostStatus, { label: string; className: string }> = {
  PUBLISHED: {
    label: "منتشرشده",
    className: "bg-success/12 text-success",
  },
  DRAFT: {
    label: "پیش‌نویس",
    className: "bg-warning/12 text-warning",
  },
};

interface PostStatusBadgeProps {
  status: PostStatus;
  className?: string;
}

export function PostStatusBadge({ status, className }: PostStatusBadgeProps) {
  const meta = STATUS_META[status];

  return (
    <Badge variant="secondary" className={cn(meta.className, className)}>
      {meta.label}
    </Badge>
  );
}
