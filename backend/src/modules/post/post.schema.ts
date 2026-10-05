import { z } from "zod";
import { paginationQuerySchema } from "../../common/schema.js";

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "عنوان را وارد کنید")
    .max(200, "عنوان حداکثر 200 کاراکتر میباشد"),

  excerpt: z
    .string()
    .trim()
    .max(500, "خلاصه حداکثر 500 کاراکتر میباشد")
    .optional(),

  content: z.string().trim().min(1, "محتو را وارد کنید"),

  coverId: z.number().int().positive().optional(),

  typeId: z.number().int().positive(),

  locationId: z.number().int().positive().optional(),

  categoryId: z.number().int().positive(),

  metaTitle: z
    .string()
    .trim()
    .max(200, "عنوان متا حداکثر 200 کاراکتر میباشد")
    .optional(),

  metaDescription: z
    .string()
    .trim()
    .max(500, "توضیحات متا حداکثر 500 کاراکتر میباشد")
    .optional(),

  expiresAt: z.coerce.date().optional(),
});

export const getAllPostsQuerySchema = paginationQuerySchema.extend({
  search: z.string().trim().optional(),
  locationId: z.coerce.number().int().positive().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  typeId: z.coerce.number().int().positive().optional(),
});

export const updatePostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "عنوان اجباری میباشد")
    .max(200, "عنوان باید حداکثر 200 کاراکتر باشد")
    .optional(),

  excerpt: z
    .string()
    .trim()
    .max(500, "خلاصه باید حداکثر 500 کاراکتر باشد")
    .nullable()
    .optional(),

  content: z.string().trim().min(1, "محتوا اجباری میباشد").optional(),

  typeId: z.coerce.number().int().positive().optional(),

  locationId: z.coerce.number().int().positive().nullable().optional(),

  categoryId: z.coerce.number().int().positive().optional(),

  metaTitle: z.string().trim().max(200).nullable().optional(),

  metaDescription: z.string().trim().max(500).nullable().optional(),

  expiresAt: z.coerce.date().nullable().optional(),
});
