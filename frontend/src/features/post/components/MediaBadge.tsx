import type { MediaInfo, MediaType } from "@/features/post/post.type";
import { faDuration, faNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Camera, Play, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const META: Record<MediaType, { icon: LucideIcon; label: string }> = {
  VIDEO: { icon: Play, label: "ویدیو" },
  IMAGE: { icon: Camera, label: "عکس" },
};

interface Props extends MediaInfo {
  className?: string;
}

export function MediaBadge({ type, totalSeconds, count, className }: Props) {
  const { icon: Icon, label } = META[type];

  let content: ReactNode = label;

  if (type === "VIDEO" && totalSeconds) {
    content = `${faDuration(totalSeconds)}`;
  }
  if (type === "IMAGE" && count) {
    content = `${faNumber(count)} تصویر`;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[11px] font-medium leading-none text-white backdrop-blur-sm",
        className,
      )}
    >
      <Icon className="size-3.5" />
      {content}
    </span>
  );
}
