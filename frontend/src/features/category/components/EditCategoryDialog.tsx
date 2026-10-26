"use client";

import { Loader2, Pencil } from "lucide-react";
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
import type { Category } from "@/features/category/category.type";
import { useUpdateCategory } from "@/features/category/hooks/useUpdateCategory";

interface EditCategoryDialogProps {
  category: Category;
}

export function EditCategoryDialog({ category }: EditCategoryDialogProps) {
  const { form, onSubmit, isPending, open, handleOpenChange } =
    useUpdateCategory({
      category,
      onUpdated: () => handleOpenChange(false),
    });

  const formId = `edit-category-form-${category.id}`;
  const nameId = `edit-category-name-${category.id}`;
  const descriptionId = `edit-category-description-${category.id}`;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`ویرایش ${category.name}`}
          />
        }
      >
        <Pencil aria-hidden="true" />
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>ویرایش دسته‌بندی</DialogTitle>
          <DialogDescription>
            نام یا توضیحات دسته‌بندی را به‌روزرسانی کنید. در صورت تغییر نام، نشانی
            یکتا به‌طور خودکار ساخته می‌شود.
          </DialogDescription>
        </DialogHeader>

        <form id={formId} onSubmit={onSubmit} noValidate className="space-y-4">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor={nameId}>نام دسته‌بندی</FieldLabel>
                  <Input
                    {...field}
                    id={nameId}
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
                  <FieldLabel htmlFor={descriptionId}>
                    توضیحات{" "}
                    <span className="font-normal text-muted-foreground">
                      (اختیاری)
                    </span>
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={descriptionId}
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

          <Button type="submit" form={formId} disabled={isPending}>
            {isPending && (
              <Loader2 className="animate-spin" aria-hidden="true" />
            )}
            {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
