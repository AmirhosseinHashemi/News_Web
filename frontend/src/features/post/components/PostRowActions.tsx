"use client";

import { EyeOff, MoreHorizontal, Pencil, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Post } from "@/features/post/post.type";

interface PostRowActionsProps {
  post: Post;
}

export function PostRowActions({ post }: PostRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`عملیات خبر «${post.title}»`}
          >
            <MoreHorizontal aria-hidden="true" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Pencil aria-hidden="true" />
            ویرایش
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Upload aria-hidden="true" />
            انتشار
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EyeOff aria-hidden="true" />
            برداشتن از انتشار
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash2 aria-hidden="true" />
            حذف
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
