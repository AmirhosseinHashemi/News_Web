import { cn } from "@/lib/utils";
import Link from "next/link";

interface StretchedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function StretchedLink({ href, className, children }: StretchedLinkProps) {
  return (
    <Link
      href={href}
      className={cn("after:absolute after:inset-0 after:z-10", className)}
    >
      {children}
    </Link>
  );
}
