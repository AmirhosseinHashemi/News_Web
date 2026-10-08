import { Badge } from "@/components/ui/badge";
import { CATEGORIES, type CategoryKey } from "@/config/categories";
import { cn } from "@/lib/utils";

const STYLES: Record<CategoryKey, { soft: string; solid: string }> = {
  politics: {
    soft: "bg-politics/12 text-politics",
    solid: "bg-politics text-white dark:text-background",
  },
  economy: {
    soft: "bg-economy/12 text-economy",
    solid: "bg-economy text-white dark:text-background",
  },
  society: {
    soft: "bg-society/12 text-society",
    solid: "bg-society text-white dark:text-background",
  },
  world: {
    soft: "bg-world/12 text-world",
    solid: "bg-world text-white dark:text-background",
  },
  sports: {
    soft: "bg-sports/12 text-sports",
    solid: "bg-sports text-white dark:text-background",
  },
  culture: {
    soft: "bg-culture/12 text-culture",
    solid: "bg-culture text-white dark:text-background",
  },
  science: {
    soft: "bg-science/12 text-science",
    solid: "bg-science text-white dark:text-background",
  },
};

interface Props {
  category: CategoryKey;
  label?: string;
  variant?: "soft" | "solid";
  className?: string;
}

export function CategoryBadge({
  category,
  label,
  variant = "soft",
  className,
}: Props) {
  const resolved =
    label ?? CATEGORIES.find((c) => c.key === category)?.label ?? category;

  return (
    <Badge
      variant="secondary"
      className={cn(STYLES[category][variant], className)}
    >
      {resolved}
    </Badge>
  );
}
