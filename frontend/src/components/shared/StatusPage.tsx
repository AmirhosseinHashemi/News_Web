import { Button, buttonVariants } from "@/components/ui/button";
import { faNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Home, RotateCcw, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface StatusPageProps {
  title: string;
  description?: string;
  code: number | string;
  icon: LucideIcon;
  homeHref?: string;
  homeLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  /**
   * ⚠️ فقط در محیط کلاینت قابل استفاده است (مثل error.tsx).
   * از Server Component این prop را پاس ندهید — توابع از مرز RSC رد نمی‌شوند.
   */
  onRetry?: () => void;
  note?: string;
  embedded?: boolean;
  className?: string;
}

export function StatusPage({
  code,
  icon: Icon,
  title,
  description,
  homeHref = "/",
  homeLabel = "صفحه اصلی",
  secondaryHref,
  secondaryLabel,
  onRetry,
  note,
  embedded,
  className,
}: StatusPageProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-background px-6 py-16 text-center",
        embedded ? "min-h-105 rounded-xl border" : "min-h-svh",
        className,
      )}
    >
      <span
        aria-hidden
        dir="ltr"
        className="pointer-events-none absolute -bottom-8 select-none text-[42vmin] font-black leading-none text-primary/8"
      >
        {typeof code === "number" ? faNumber(code) : code}
      </span>

      <div className="relative flex max-w-md flex-col items-center gap-5">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-7" strokeWidth={1.75} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold">{title}</h1>
          {description && (
            <p className="text-sm leading-8 text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {onRetry && (
            <Button onClick={onRetry}>
              <RotateCcw />
              تلاش مجدد
            </Button>
          )}
          <Link
            className={buttonVariants({
              variant: `${onRetry ? "outline" : "default"}`,
            })}
            href={homeHref}
          >
            <Home />
            {homeLabel}
          </Link>
          {secondaryHref && secondaryLabel && (
            <Link
              className={buttonVariants({
                variant: "ghost",
              })}
              href={secondaryHref}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>

        {note && <p className="text-xs text-muted-foreground">{note}</p>}
      </div>
    </div>
  );
}
