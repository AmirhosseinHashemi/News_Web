"use client";

import { useMutation } from "@tanstack/react-query";

import { createPostAction } from "@/features/post/post.action";

export function useCreatePostMutation() {
  return useMutation({
    mutationFn: createPostAction,
  });
}
