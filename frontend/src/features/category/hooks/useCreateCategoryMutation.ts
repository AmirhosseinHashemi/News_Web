"use client";

import { useMutation } from "@tanstack/react-query";

import { createCategoryAction } from "@/features/category/category.action";

export function useCreateCategoryMutation() {
  return useMutation({
    mutationFn: createCategoryAction,
  });
}
