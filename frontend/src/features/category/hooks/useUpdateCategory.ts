"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "@/components/ui/toast";
import {
  type UpdateCategoryFormValues,
  updateCategorySchema,
} from "@/features/category/category.schema";
import type {
  Category,
  UpdateCategoryPayload,
} from "@/features/category/category.type";
import { useUpdateCategoryMutation } from "@/features/category/hooks/useUpdateCategoryMutation";
import { getErrorNameLabel } from "@/lib/error";

type UseUpdateCategoryOptions = {
  category: Category;
  onUpdated?: () => void;
};

export function useUpdateCategory({
  category,
  onUpdated,
}: UseUpdateCategoryOptions) {
  const [open, setOpen] = useState(false);
  const mutation = useUpdateCategoryMutation();

  const form = useForm<UpdateCategoryFormValues>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: getDefaultValues(category),
  });


  function onSubmit(values: UpdateCategoryFormValues) {
    const payload = buildPayload(values, category);

    if (Object.keys(payload).length === 0) {
      handleOpenChange(false)
      return;
    }

    mutation.mutate(
      { id: category.id, payload },
      {
        onSuccess: (response) => {
          if (!response.success) {
            response.errors.forEach(({ field, message }) => {
              form.setError(field as keyof UpdateCategoryFormValues, {
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

          onUpdated?.();
        },
      },
    );
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) reset();
    setOpen(nextOpen);
  }

  function reset() {
    form.reset(getDefaultValues(category));
    mutation.reset();
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: mutation.isPending,
    open,
    handleOpenChange,
    reset,
  };
}

function getDefaultValues(category: Category): UpdateCategoryFormValues {
  return {
    name: category.name,
    description: category.description ?? "",
  };
}

function buildPayload(
  values: UpdateCategoryFormValues,
  category: Category,
): UpdateCategoryPayload {
  const payload: UpdateCategoryPayload = {};

  if (values.name !== category.name) payload.name = values.name;

  const description = values.description ?? "";
  if (description !== (category.description ?? "")) {
    payload.description = description;
  }

  return payload;
}
