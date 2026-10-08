import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MediaPlaceholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-linear-to-bl from-muted via-secondary/60 to-muted",
        className,
      )}
    >
      <ImageIcon className="size-7 text-muted-foreground/40" />
    </div>
  );
}
