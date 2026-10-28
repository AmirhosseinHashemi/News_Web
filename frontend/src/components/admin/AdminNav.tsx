"use client";

import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { FolderTree, LayoutDashboard, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
}

export const ADMIN_NAV: NavItem[] = [
  { title: "داشبورد", href: ROUTES.admin, icon: LayoutDashboard, exact: true },
  { title: "خبرها", href: ROUTES.posts, icon: Newspaper },
  { title: "دسته‌بندی‌ها", href: ROUTES.categories, icon: FolderTree },
];

export function AdminNav() {
  const pathname = usePathname();
  const items = ADMIN_NAV;

  return (
    <nav className="flex flex-col gap-1 p-3">
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="size-4.5" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
