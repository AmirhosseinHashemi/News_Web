import { cn } from "cn";
import Link from "next/link";
import { ReactNode } from "react";

/** لینک کشیده‌شده روی کل کارت — عنوان همچنان قابل انتخاب و سئو-پسند */
export function StretchedLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn("after:absolute after:inset-0 after:z-10", className)}
    >
      {children}
    </Link>
  );
}
