import { AdminNav } from "@/components/admin/AdminNav";
import { UserMenu, UserMenuSkeleton } from "@/components/admin/UserMenu";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PROJECT_BUSUINESS_NAME } from "@/config/constants";
import { Menu, XIcon } from "lucide-react";
import { Suspense, type ReactNode } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh bg-muted/30">
      <aside className="sticky top-0 hidden h-svh w-60 shrink-0 flex-col border-e bg-card lg:flex">
        <SidebarBrand />
        <AdminNav />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* نوار بالا — موبایل */}
        <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b bg-background/90 px-3 backdrop-blur lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="باز کردن منو">
                  <Menu />
                </Button>
              }
            />

            <SheetContent
              showCloseButton={false}
              side="right"
              className="w-60 p-0"
            >
              <SheetHeader className="py-0 pr-0">
                <SheetTitle className="sr-only">منوی پنل مدیریت</SheetTitle>
                <div className="w-full flex justify-between items-center">
                  <SidebarBrand />
                  <SheetClose
                    render={
                      <Button variant="ghost" size="icon-sm">
                        <XIcon />
                      </Button>
                    }
                  />
                </div>
              </SheetHeader>
              <AdminNav />
            </SheetContent>
          </Sheet>
          <div className="flex items-center ms-auto">
            <ThemeToggle />
            <Suspense fallback={<UserMenuSkeleton />}>
              <UserMenu />
            </Suspense>
          </div>
        </header>

        {/* نوار بالا — دسکتاپ */}
        <header className="sticky top-0 z-40 hidden h-14 items-center border-b bg-background/90 px-6 backdrop-blur lg:flex">
          <div className="ms-auto flex items-center gap-1">
            <ThemeToggle />
            <Suspense fallback={<UserMenuSkeleton />}>
              <UserMenu />
            </Suspense>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

function SidebarBrand() {
  return (
    <div className="flex h-14 items-center gap-2 px-4">
      <span className="text-xl font-black text-primary">
        {PROJECT_BUSUINESS_NAME}
      </span>
      <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
        پنل مدیریت
      </span>
    </div>
  );
}
