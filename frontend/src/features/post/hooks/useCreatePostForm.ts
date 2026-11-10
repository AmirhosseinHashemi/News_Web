import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "@/components/ui/toast";
import { ROUTES } from "@/config/routes";
import { useCreatePostMutation } from "@/features/post/hooks/useCreatePostMutation";
import {
  type CreatePostFormInput,
  type CreatePostFormValues,
  createPostSchema,
} from "@/features/post/post.schema";
import type { CreatePostPayload } from "@/features/post/post.type";
import { getErrorNameLabel } from "@/lib/error";

function emptyToUndefined(value?: string) {
  return value && value.trim() !== "" ? value : undefined;
}

function toCreatePostPayload(values: CreatePostFormValues): CreatePostPayload {
  return {
    ...values,
    excerpt: emptyToUndefined(values.excerpt),
    metaTitle: emptyToUndefined(values.metaTitle),
    metaDescription: emptyToUndefined(values.metaDescription),
  };
}

export function useCreatePostForm() {
  const router = useRouter();
  const [resetKey, setResetKey] = useState(0);
  const { mutate: createPost, isPending } = useCreatePostMutation();

  const form = useForm<CreatePostFormInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      typeId: undefined,
      categoryId: undefined,
      locationId: undefined,
      coverId: undefined,
      metaTitle: "",
      metaDescription: "",
      expiresAt: undefined,
    },
  });

  function onSubmit(values: CreatePostFormValues) {
    createPost(toCreatePostPayload(values), {
      onSuccess: (res) => {
        if (!res.success) {
          const fieldNames = Object.keys(createPostSchema.shape) as Array<
            keyof CreatePostFormInput
          >;

          res.errors.forEach(({ field, message }) => {
            if (fieldNames.includes(field as keyof CreatePostFormInput)) {
              form.setError(field as keyof CreatePostFormInput, {
                type: "server",
                message,
              });
            }
          });

          toast.add({
            type: "error",
            title: getErrorNameLabel(res.errorName),
            description: res.message,
          });
          return;
        }

        toast.add({ type: "success", description: res.message });
        form.reset();
        setResetKey((key) => key + 1);
        router.push(ROUTES.posts);
      },
      onError: (error) => {
        toast.add({ type: "error", description: error.message });
      },
    });
  }

  return {
    form,
    errors: form.formState.errors,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: isPending,
    resetKey,
  };
}
