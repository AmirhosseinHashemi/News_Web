"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ROUTES } from "@/config/routes";
import type { Category } from "@/features/category/category.type";
import { CoverUpload } from "@/features/post/components/CoverUpload";
import { PostFormCombobox } from "@/features/post/components/PostFormCombobox";
import {
  type CreatePostFormValues,
  createPostSchema,
} from "@/features/post/post.schema";
import type {
  PostLocationOption,
  PostTypeOption,
} from "@/features/post/post.type";

interface CreatePostFormProps {
  categories: Pick<Category, "id" | "name">[];
  types: PostTypeOption[];
  locations: PostLocationOption[];
}

export function CreatePostForm({
  categories,
  types,
  locations,
}: CreatePostFormProps) {
  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      typeId: 0,
      categoryId: 0,
      locationId: 0,
      coverId: undefined,
      metaTitle: "",
      metaDescription: "",
      expiresAt: "",
    },
  });

  const { errors, isSubmitting } = form.formState;

  function onSubmit(_values: CreatePostFormValues) {
    void _values;
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>اطلاعات اصلی</CardTitle>
            <CardDescription>
              عنوان، خلاصه و متن کامل خبر را وارد کنید.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup className="gap-5">
              <Field data-invalid={!!errors.title}>
                <FieldLabel htmlFor="post-title">عنوان خبر</FieldLabel>
                <Input
                  id="post-title"
                  placeholder="عنوان خبر را وارد کنید"
                  maxLength={200}
                  aria-invalid={!!errors.title}
                  {...form.register("title")}
                />
                <FieldDescription>
                  عنوان یکتا نیست؛ نشانی خبر به‌طور خودکار ساخته می‌شود.
                </FieldDescription>
                <FieldError errors={[errors.title]} />
              </Field>

              <Field data-invalid={!!errors.excerpt}>
                <FieldLabel htmlFor="post-excerpt">
                  خلاصه خبر{" "}
                  <span className="font-normal text-muted-foreground">
                    (اختیاری)
                  </span>
                </FieldLabel>
                <Textarea
                  id="post-excerpt"
                  placeholder="خلاصه کوتاهی از خبر برای نمایش در فهرست‌ها"
                  rows={3}
                  maxLength={500}
                  aria-invalid={!!errors.excerpt}
                  {...form.register("excerpt")}
                />
                <FieldError errors={[errors.excerpt]} />
              </Field>

              <Field data-invalid={!!errors.content}>
                <FieldLabel htmlFor="post-content">متن خبر</FieldLabel>
                <Textarea
                  id="post-content"
                  placeholder="متن کامل خبر را اینجا بنویسید..."
                  rows={14}
                  className="min-h-64"
                  aria-invalid={!!errors.content}
                  {...form.register("content")}
                />
                <FieldError errors={[errors.content]} />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>سئو</CardTitle>
            <CardDescription>
              اطلاعات نمایش خبر در موتورهای جستجو.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup className="gap-5">
              <Field data-invalid={!!errors.metaTitle}>
                <FieldLabel htmlFor="post-meta-title">
                  عنوان متا{" "}
                  <span className="font-normal text-muted-foreground">
                    (اختیاری)
                  </span>
                </FieldLabel>
                <Input
                  id="post-meta-title"
                  placeholder="عنوان نمایش در نتایج جستجو"
                  maxLength={200}
                  aria-invalid={!!errors.metaTitle}
                  {...form.register("metaTitle")}
                />
                <FieldError errors={[errors.metaTitle]} />
              </Field>

              <Field data-invalid={!!errors.metaDescription}>
                <FieldLabel htmlFor="post-meta-description">
                  توضیحات متا{" "}
                  <span className="font-normal text-muted-foreground">
                    (اختیاری)
                  </span>
                </FieldLabel>
                <Textarea
                  id="post-meta-description"
                  placeholder="توضیح کوتاه خبر برای موتورهای جستجو"
                  rows={4}
                  maxLength={500}
                  aria-invalid={!!errors.metaDescription}
                  {...form.register("metaDescription")}
                />
                <FieldError errors={[errors.metaDescription]} />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>انتشار و دسته‌بندی</CardTitle>
            <CardDescription>
              جایگاه خبر و زمان انقضای آن را مشخص کنید.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup className="gap-5">
              <Controller
                name="typeId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor="post-type">نوع خبر</FieldLabel>
                    <PostFormCombobox
                      id="post-type"
                      options={types}
                      value={field.value}
                      onChange={(value) => field.onChange(value ?? 0)}
                      placeholder="نوع خبر را انتخاب کنید"
                      ariaLabel="نوع خبر"
                      invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor="post-category">دسته‌بندی</FieldLabel>
                    <PostFormCombobox
                      id="post-category"
                      options={categories}
                      value={field.value}
                      onChange={(value) => field.onChange(value ?? 0)}
                      placeholder="دسته‌بندی را انتخاب کنید"
                      ariaLabel="دسته‌بندی خبر"
                      invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="locationId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor="post-location">
                      موقعیت{" "}
                      <span className="font-normal text-muted-foreground">
                        (اختیاری)
                      </span>
                    </FieldLabel>
                    <PostFormCombobox
                      id="post-location"
                      options={locations}
                      value={field.value}
                      onChange={(value) => field.onChange(value ?? 0)}
                      placeholder="موقعیت خبر را انتخاب کنید"
                      ariaLabel="موقعیت خبر"
                      invalid={fieldState.invalid}
                      allowClear
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field data-invalid={!!errors.expiresAt}>
                <FieldLabel htmlFor="post-expires-at">
                  تاریخ انقضا{" "}
                  <span className="font-normal text-muted-foreground">
                    (اختیاری)
                  </span>
                </FieldLabel>
                <Input
                  id="post-expires-at"
                  type="datetime-local"
                  dir="ltr"
                  className="text-left"
                  aria-invalid={!!errors.expiresAt}
                  {...form.register("expiresAt")}
                />
                <FieldError errors={[errors.expiresAt]} />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>تصویر شاخص</CardTitle>
            <CardDescription>
              تصویر اصلی خبر در فهرست‌ها و صفحه خبر.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Controller
              name="coverId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <CoverUpload value={field.value} onChange={field.onChange} />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href={ROUTES.posts}
            className={buttonVariants({ variant: "outline" })}
          >
            انصراف
          </Link>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              <Save aria-hidden="true" />
            )}
            {isSubmitting ? "در حال ذخیره..." : "ذخیره پیش‌نویس"}
          </Button>
        </div>
      </div>
    </form>
  );
}
