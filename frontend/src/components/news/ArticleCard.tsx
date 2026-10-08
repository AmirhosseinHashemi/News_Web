import { Clock, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Byline } from "@/components/news/Byline";
import { CategoryBadge } from "@/components/news/CategoryBadge";
import { LiveBadge } from "@/components/news/LiveBadge";
import { MediaBadge, type MediaInfo } from "@/components/news/MediaBadge";
import { MediaPlaceholder } from "@/components/news/MediaPlaceholder";
import type { CategoryKey } from "@/config/categories";
import { faDate, faNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export type ArticleCardVariant =
  | "hero"
  | "default"
  | "list"
  | "compact"
  | "video";

export interface ArticleCardData {
  slug: string;
  title: string;
  summary?: string;
  category?: {
    key: CategoryKey;
    label?: string;
  };
  cover?: {
    src: string;
    alt: string;
  };
  media?: MediaInfo;
  authorName?: string;
  publishedAt?: string;
  readingMinutes?: number;
  isLive?: boolean;
}

interface ArticleCardProps {
  data: ArticleCardData;
  variant?: ArticleCardVariant;
  href?: string;
  priority?: boolean;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getArticleUrl(data: ArticleCardData, href?: string) {
  return href ?? `/news/${data.slug}`;
}

function resolveMedia(
  data: ArticleCardData,
  variant: ArticleCardVariant,
): MediaInfo | undefined {
  if (variant === "video") {
    return data.media ?? { type: "video" };
  }

  return data.media;
}

/* -------------------------------------------------------------------------- */
/* Media                                                                      */
/* -------------------------------------------------------------------------- */

interface CardMediaProps {
  cover?: ArticleCardData["cover"];
  media?: MediaInfo;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

function CardMedia({
  cover,
  media,
  sizes,
  priority,
  className,
}: CardMediaProps) {
  const isVideo = media?.type === "video";

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {cover?.src ? (
        <Image
          src={cover.src}
          alt={cover.alt}
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

      {media && (
        <MediaBadge
          type={media.type}
          totalSeconds={media.totalSeconds}
          count={media.count}
          className="absolute bottom-2 inset-e-2 z-10"
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Badges                                                                     */
/* -------------------------------------------------------------------------- */

interface CardBadgesProps {
  data: ArticleCardData;
}

function CardBadges({ data }: CardBadgesProps) {
  if (!data.isLive && !data.category) {
    return null;
  }

  return (
    <div className="absolute top-3 inset-s-3 z-20 flex items-center gap-2">
      {data.isLive && <LiveBadge />}

      {data.category && (
        <CategoryBadge
          category={data.category.key}
          label={data.category.label}
          variant="solid"
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Meta                                                                       */
/* -------------------------------------------------------------------------- */

interface CardMetaProps {
  data: ArticleCardData;
  className?: string;
  showCategory?: boolean;
}

function CardMeta({ data, className, showCategory = true }: CardMetaProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground",
        className,
      )}
    >
      {showCategory && data.category && (
        <CategoryBadge
          category={data.category.key}
          label={data.category.label}
        />
      )}

      {data.publishedAt && (
        <time dateTime={data.publishedAt}>{faDate(data.publishedAt)}</time>
      )}

      {data.readingMinutes != null && (
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" />
          {faNumber(data.readingMinutes)} دقیقه
        </span>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* StrtchedLink                                                                      */
/* -------------------------------------------------------------------------- */

interface StretchedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function StretchedLink({ href, className, children }: StretchedLinkProps) {
  return (
    <Link
      href={href}
      className={cn("after:absolute after:inset-0 after:z-10", className)}
    >
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Article Card                                                               */
/* -------------------------------------------------------------------------- */

export function ArticleCard({
  data,
  variant = "default",
  href,
  priority = false,
  className,
}: ArticleCardProps) {
  const url = getArticleUrl(data, href);
  const media = data.media;

  if (variant === "hero") {
    return (
      <article
        className={cn(
          "group relative overflow-hidden rounded-lg border bg-card",
          className,
        )}
      >
        <CardMedia
          cover={data.cover}
          media={media}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="aspect-video w-full"
        />

        <CardBadges data={data} />

        <div className="space-y-3 p-5 md:p-6">
          <h2 className="text-2xl font-bold transition-colors group-hover:text-primary md:text-display">
            <StretchedLink href={url}>{data.title}</StretchedLink>
          </h2>

          {data.summary && (
            <p className="text-lead line-clamp-2 text-muted-foreground">
              {data.summary}
            </p>
          )}

          <Byline
            name={data.authorName}
            date={data.publishedAt}
            readingMinutes={data.readingMinutes}
            className="pt-1"
          />
        </div>
      </article>
    );
  }

  if (variant === "list") {
    return (
      <article
        className={cn(
          "group relative flex gap-4 rounded-lg border bg-card p-3",
          className,
        )}
      >
        <CardMedia
          cover={data.cover}
          media={media}
          sizes="160px"
          className="aspect-square w-28 shrink-0 rounded-md sm:w-36"
        />

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-1">
          <h3 className="text-title font-bold line-clamp-2 transition-colors group-hover:text-primary">
            <StretchedLink href={url}>{data.title}</StretchedLink>
          </h3>

          <CardMeta data={data} />
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article
        className={cn(
          "group relative flex flex-col gap-1.5 border-b border-dashed pb-3",
          className,
        )}
      >
        <CardMeta data={data} />

        <h3 className="text-title font-bold line-clamp-2 transition-colors group-hover:text-primary">
          <StretchedLink href={url}>{data.title}</StretchedLink>
        </h3>
      </article>
    );
  }

  /*
   * default + video
   *
   * video فقط media را تغییر می‌دهد،
   * بنابراین layout مشترک است.
   */
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md",
        className,
      )}
    >
      <CardMedia
        cover={data.cover}
        media={media}
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        className="aspect-video"
      />

      <CardBadges data={data} />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-headline font-bold line-clamp-2 transition-colors group-hover:text-primary">
          <StretchedLink href={url}>{data.title}</StretchedLink>
        </h3>

        {data.summary && (
          <p className="line-clamp-2 text-sm leading-7 text-muted-foreground">
            {data.summary}
          </p>
        )}

        <CardMeta data={data} showCategory={false} className="mt-auto pt-2" />
      </div>
    </article>
  );
}
