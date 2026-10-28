import { Play } from "lucide-react";
import Image from "next/image";
import { MediaBadge } from "@/features/post/components/MediaBadge";
import { MediaPlaceholder } from "@/features/post/components/MediaPlaceholder";
import type { Post } from "@/features/post/post.type";
import { cn } from "@/lib/utils";

interface CardMediaProps {
  cover: Post["cover"];
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export function CardMedia({
  cover,
  alt = "",
  sizes,
  priority,
  className,
}: CardMediaProps) {
  const isVideo = cover?.type === "VIDEO";
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {cover ? (
        <Image
          src={cover.filename}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <MediaPlaceholder />
      )}
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

      {cover && (
        <MediaBadge
          type={cover.type}
          className="absolute bottom-2 inset-e-2 z-10"
        />
      )}
    </div>
  );
}
