import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "عنوان را وارد کنید.")
    .max(200, "عنوان حداکثر ۲۰۰ کاراکتر است."),
  excerpt: z
    .string()
    .trim()
    .max(500, "خلاصه حداکثر ۵۰۰ کاراکتر است.")
    .optional(),
  content: z.string().trim().min(1, "محتوای خبر را وارد کنید."),
  typeId: z.number({ error: "نوع خبر را انتخاب کنید." }).int().positive(),
  categoryId: z.number({ error: "دسته‌بندی را انتخاب کنید." }).int().positive(),
  locationId: z.number({ error: "موقعیت را انتخاب کنید." }).int().positive(),
  coverId: z.number().int().positive().optional(),
  metaTitle: z
    .string()
    .trim()
    .max(200, "عنوان متا حداکثر ۲۰۰ کاراکتر است.")
    .optional(),
  metaDescription: z
    .string()
    .trim()
    .max(500, "توضیحات متا حداکثر ۵۰۰ کاراکتر است.")
    .optional(),
  expiresAt: z.date().nullable().optional(),
});

export type CreatePostFormInput = z.input<typeof createPostSchema>;

export type CreatePostFormValues = z.output<typeof createPostSchema>;
