"use client";

import { useMutation } from "@tanstack/react-query";

import { updateCategoryAction } from "@/features/category/category.action";
import type { UpdateCategoryPayload } from "@/features/category/category.type";

type UpdateCategoryMutationVariables = {
  id: number;
  payload: UpdateCategoryPayload;
};

export function useUpdateCategoryMutation() {
  return useMutation({
    mutationFn: ({ id, payload }: UpdateCategoryMutationVariables) =>
      updateCategoryAction(id, payload),
  });
}
