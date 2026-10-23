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
import { Skeleton } from "@/components/ui/skeleton";
import { getMeReq } from "@/features/auth/auth.api";
import { LogOut, UserRound } from "lucide-react";

export async function UserMenu() {
  const res = await getMeReq();
  const user = res.success ? res.data : null;

  if (!res.success) throw new Error(res.message);

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="h-auto gap-2 px-2 py-1.5">
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">
                {user.name.charAt(0) ?? "-"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm md:inline">{user.name ?? "-"}</span>
          </Button>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            <UserRound className="size-4 text-muted-foreground" />
            <span className="flex flex-col">
              <span className="text-sm">{user?.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {user.role.description ?? "-"}
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

export function UserMenuSkeleton() {
  return <Skeleton className="w-36 h-8" />;
}
