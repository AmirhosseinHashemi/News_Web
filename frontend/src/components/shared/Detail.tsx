import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailProps {
  icon: LucideIcon;
  label: string;
  value: string;
  dir?: "ltr" | "rtl";
  mono?: boolean;
}

export function Detail({ icon: Icon, label, value, dir, mono }: DetailProps) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
      <dt className="shrink-0 text-muted-foreground">{label}:</dt>
      <dd
        dir={dir}
        title={value}
        className={cn(
          "min-w-0 truncate text-foreground",
          mono && "font-mono text-[11px]",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
