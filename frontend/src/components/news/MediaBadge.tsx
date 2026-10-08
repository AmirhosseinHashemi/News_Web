import { faDuration, faNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Camera, Images, Play, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type MediaType = "video" | "photo" | "gallery";

export interface MediaInfo {
  type: MediaType;
  totalSeconds?: number;
  count?: number;
}

const META: Record<MediaType, { icon: LucideIcon; label: string }> = {
  video: { icon: Play, label: "ویدیو" },
  photo: { icon: Camera, label: "عکس" },
  gallery: { icon: Images, label: "گالری" },
};

interface Props extends MediaInfo {
  className?: string;
}

export function MediaBadge({ type, totalSeconds, count, className }: Props) {
  const { icon: Icon, label } = META[type];

  let content: ReactNode = label;

  if (type === "video" && totalSeconds) {
    content = `${faDuration(totalSeconds)}`;
  }
  if (type === "gallery" && count) {
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
