"use client";

import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/ui/toast";
import { createCategoryAction } from "@/features/category/category.action";

export function useCreateCategoryMutation() {
  return useMutation({
    mutationFn: createCategoryAction,

    onError: () => {
      toast.add({
        type: "error",
        title: "خطا در ایجاد دسته‌بندی",
        description: "ارتباط با سرور برقرار نشد. دوباره تلاش کنید.",
      });
    },
  });
}
