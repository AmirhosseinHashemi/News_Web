import { MediaBadge, MediaPlaceholder } from "@/components/news";
import { Post } from "@/features/post/post.type";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";

interface CardMediaProps {
  cover: Post["cover"];
  sizes?: string;
  priority?: boolean;
  className?: string;
}
 
export function CardMedia({ cover, sizes, priority, className }: CardMediaProps) {
  if (!cover) return <MediaPlaceholder />;

  const isVideo = cover.type === "VIDEO";
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <Image
        src={cover.fileName}
        alt={cover.fileName}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
      />
      {isVideo && (
        <span
          aria-hidden
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors group-hover:bg-primary">
            <Play className="size-5 fill-current" />
          </span>
        </span>
      )}

      <MediaBadge
        type={cover.type}
        className="absolute bottom-2 inset-e-2 z-10"
      />
    </div>
  );
}
