import { Byline } from "@/features/post/components/Byline";
import { CardBadges } from "@/features/post/components/CardBadges";
import { CardMedia } from "@/features/post/components/CardMedia";
import { CardMeta } from "@/features/post/components/CardMeta";
import { StretchedLink } from "@/features/post/components/StretchedLink";
import { Post, PostCardVariant } from "@/features/post/post.type";
import { cn } from "@/lib/utils";

interface PostCardProps {
  data: Post;
  variant?: PostCardVariant;
  priority?: boolean;
  className?: string;
}

export function PostCard({
  data,
  variant = "default",
  priority = false,
  className,
}: PostCardProps) {
  const url = `/news/${data.slug}`;
  const author = `${data.author.firstName} ${data.author.lastName}`;

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
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="aspect-video w-full"
        />

        <CardBadges data={data} />

        <div className="space-y-3 p-5 md:p-6">
          <h2 className="text-2xl font-bold transition-colors group-hover:text-primary md:text-display">
            <StretchedLink href={url}>{data.title}</StretchedLink>
          </h2>

          {data.excerpt && (
            <p className="text-lead line-clamp-2 text-muted-foreground">
              {data.excerpt}
            </p>
          )}

          <Byline
            name={author}
            publishedAt={data.publishedAt}
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
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        className="aspect-video"
      />

      <CardBadges data={data} />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-headline font-bold line-clamp-2 transition-colors group-hover:text-primary">
          <StretchedLink href={url}>{data.title}</StretchedLink>
        </h3>

        {data.excerpt && (
          <p className="line-clamp-2 text-sm leading-7 text-muted-foreground">
            {data.excerpt}
          </p>
        )}

        <CardMeta data={data} showCategory={false} className="mt-auto pt-2" />
      </div>
    </article>
  );
}
