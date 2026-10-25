"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { toast } from "@/components/ui/toast";
import { createCategoryAction } from "@/features/category/category.action";
import {
  type CreateCategoryFormValues,
  createCategorySchema,
} from "@/features/category/category.schema";
import { getErrorNameLabel } from "@/lib/error";

type UseCreateCategoryOptions = {
  onCreated?: () => void;
};

export function useCreateCategory({
  onCreated,
}: UseCreateCategoryOptions = {}) {
  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createCategoryAction,

    onSuccess: (response) => {
      if (!response.success) {
        response.errors.forEach(({ field, message }) => {
          form.setError(field as keyof CreateCategoryFormValues, {
            type: "server",
            message,
          });
        });

        toast.add({
          type: "error",
          title: getErrorNameLabel(response.errorName),
          description: response.message,
        });

        return;
      }

      toast.add({
        type: "success",
        description: response.message,
      });

      form.reset();
      onCreated?.();
    },

    onError: () => {
      toast.add({
        type: "error",
        title: "خطا در ایجاد دسته‌بندی",
        description: "ارتباط با سرور برقرار نشد. دوباره تلاش کنید.",
      });
    },
  });

  function onSubmit(values: CreateCategoryFormValues) {
    mutation.mutate(values);
  }

  function reset() {
    form.reset();
    mutation.reset();
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: mutation.isPending,
    reset,
  };
}
