import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { faDate, faNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Props {
  name?: string;
  date?: string;
  readingMinutes?: number;
  className?: string;
}

export function Byline({ name, date, readingMinutes, className }: Props) {
  if (!name && !date && readingMinutes === undefined) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground",
        className,
      )}
    >
      {name && (
        <span className="inline-flex items-center gap-1.5">
          <Avatar className="size-6">
            <AvatarFallback className="text-[10px]">
              {name.trim().charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground">{name}</span>
        </span>
      )}
      {name && date && <Dot />}
      {date && <time dateTime={date}>{faDate(date)}</time>}
      {readingMinutes !== undefined && (
        <>
          <Dot />
          <span>{faNumber(readingMinutes)} دقیقه مطالعه</span>
        </>
      )}
    </div>
  );
}

const Dot = () => (
  <span aria-hidden className="text-border">
    •
  </span>
);
