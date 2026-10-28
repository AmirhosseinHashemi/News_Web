import { Badge } from "@/components/ui/badge";
import { Post } from "@/features/post/post.type";
import { faDate } from "@/lib/format";
import { cn } from "@/lib/utils";

interface CardMetaProps {
  data: Post;
  className?: string;
  showCategory?: boolean;
}

export function CardMeta({ data, className, showCategory = true }: CardMetaProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground",
        className,
      )}
    >
      {showCategory && data.category && <Badge>{data.category.name}</Badge>}

      {data.publishedAt && (
        <time dateTime={data.publishedAt}>{faDate(data.publishedAt)}</time>
      )}

      {/* TODO: implement reading min structure */}
      {/* {data.readingMinutes != null && (
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" />
          {faNumber(data.readingMinutes)} دقیقه
        </span>
      )} */}
    </div>
  );
}
