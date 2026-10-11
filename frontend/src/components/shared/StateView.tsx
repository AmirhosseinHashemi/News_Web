import type { ReactNode } from "react";
import { Inbox, ServerCrash, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StateTone = "neutral" | "primary" | "warning" | "destructive";

const TONE: Record<StateTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  warning: "bg-warning/12 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

interface StateViewProps {
  title: string;
  description?: ReactNode;
  icon: LucideIcon;
  actions?: ReactNode;
  size?: "sm" | "md";
  tone?: StateTone;
  className?: string;
}

export function StateView({
  icon: Icon,
  title,
  description,
  actions,
  size = "md",
  tone = "neutral",
  className,
}: StateViewProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        size === "sm" ? "gap-3 px-6 py-8" : "gap-4 px-6 py-14",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          TONE[tone],
          size === "sm" ? "size-11" : "size-14",
        )}
      >
        <Icon
          className={size === "sm" ? "size-5" : "size-7"}
          strokeWidth={1.75}
        />
      </div>
      <div className="space-y-1.5">
        <h2 className={cn("font-bold", size === "sm" ? "text-sm" : "text-lg")}>
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mx-auto max-w-sm leading-7 text-muted-foreground",
              size === "sm" ? "text-xs" : "text-sm",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

/* ── پریست‌های پرکاربرد ── */

export function EmptyState({
  title = "موردی یافت نشد",
  description,
  actions,
  size,
  className,
}: Omit<StateViewProps, "icon" | "tone">) {
  return (
    <StateView
      icon={Inbox}
      title={title}
      description={description}
      actions={actions}
      size={size}
      className={className}
    />
  );
}

export function ErrorState({
  title = "خطا در بارگذاری",
  description,
  actions,
  size,
  className,
}: Omit<StateViewProps, "icon" | "tone">) {
  return (
    <StateView
      icon={ServerCrash}
      tone="destructive"
      title={title}
      description={description}
      actions={actions}
      size={size}
      className={className}
    />
  );
}
