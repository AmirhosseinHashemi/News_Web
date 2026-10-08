import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  href,
  className,
}: {
  title: string;
  href?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-5 flex items-center justify-between border-b-2 border-primary pb-2",
        className,
      )}
    >
      <h2 className="text-title font-extrabold">{title}</h2>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          مشاهده همه
          <ChevronLeft className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
