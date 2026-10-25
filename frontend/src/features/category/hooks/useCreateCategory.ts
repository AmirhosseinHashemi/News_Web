"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "@/components/ui/toast";
import {
  type CreateCategoryFormValues,
  createCategorySchema,
} from "@/features/category/category.schema";
import { useCreateCategoryMutation } from "@/features/category/hooks/useCreateCategoryMutation";
import { getErrorNameLabel } from "@/lib/error";
import { useState } from "react";

type UseCreateCategoryOptions = {
  onCreated?: () => void;
};

export function useCreateCategory({
  onCreated,
}: UseCreateCategoryOptions = {}) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const mutation = useCreateCategoryMutation();

  function onSubmit(values: CreateCategoryFormValues) {
    mutation.mutate(values, {
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
    });
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      reset();
    }
    setOpen(nextOpen);
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
    open,
    handleOpenChange,
  };
}
