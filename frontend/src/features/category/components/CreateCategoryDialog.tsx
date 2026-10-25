"use client";

import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCategory } from "@/features/category/hooks/useCreateCategory";

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const { form, onSubmit, isPending, reset } = useCreateCategory({
    onCreated: () => setOpen(false),
  });

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      reset();
    }
    setOpen(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button>
            <Plus aria-hidden="true" />
            ایجاد دسته‌بندی
          </Button>
        }
      />

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>ایجاد دسته‌بندی</DialogTitle>
          <DialogDescription>
            نام دسته‌بندی را وارد کنید. نشانی یکتا به‌طور خودکار ساخته می‌شود.
          </DialogDescription>
        </DialogHeader>

        <form
          id="create-category-form"
          onSubmit={onSubmit}
          noValidate
          className="space-y-4"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor="category-name">نام دسته‌بندی</FieldLabel>
                  <Input
                    {...field}
                    id="category-name"
                    placeholder="نام دسته‌بندی"
                    maxLength={100}
                    autoFocus
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor="category-description">
                    توضیحات{" "}
                    <span className="font-normal text-muted-foreground">
                      (اختیاری)
                    </span>
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="category-description"
                    placeholder="توضیح کوتاهی درباره این دسته‌بندی"
                    rows={4}
                    maxLength={500}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline" disabled={isPending}>
                انصراف
              </Button>
            }
          />

          <Button
            type="submit"
            form="create-category-form"
            disabled={isPending}
          >
            {isPending && (
              <Loader2 className="animate-spin" aria-hidden="true" />
            )}
            {isPending ? "در حال ایجاد..." : "ایجاد دسته‌بندی"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
