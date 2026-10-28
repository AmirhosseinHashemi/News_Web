import { Badge } from "@/components/ui/badge";
import { Post } from "@/features/post/post.type";

interface CardBadgesProps {
  data: Post;
}

export function CardBadges({ data }: CardBadgesProps) {
  return (
    <div className="absolute top-3 inset-s-3 z-20 flex items-center gap-2">
      {/* In future : */}
      {/* {data.isLive && <LiveBadge />} */}

      <Badge>{data.category.name}</Badge>
    </div>
  );
}
