"use client";

import { LogOut, UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSessionStore } from "@/features/auth/auth.store";
import { Skeleton } from "@/components/ui/skeleton";

export function UserMenu() {
  const session = useSessionStore((state) => state.session);
  const status = useSessionStore((state) => state.status);

  if (status === "loading") return <Skeleton className="w-36 h-8" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="h-auto gap-2 px-2 py-1.5">
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">
                {session?.userName?.charAt(0) ?? "-"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm md:inline">
              {session?.userName ?? "کاربر"}
            </span>
          </Button>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            <UserRound className="size-4 text-muted-foreground" />
            <span className="flex flex-col">
              <span className="text-sm">{session?.userName}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {session?.roleDescription ?? "-"}
              </span>
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form className="w-full">
              <button
                type="submit"
                className="flex w-full items-center gap-2 text-destructive"
              >
                <LogOut className="size-4" />
                خروج از حساب
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
