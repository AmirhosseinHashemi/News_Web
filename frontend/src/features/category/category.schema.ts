import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "نام دسته‌بندی باید حداقل ۲ کاراکتر باشد.")
    .max(100, "نام دسته‌بندی نباید بیشتر از ۱۰۰ کاراکتر باشد."),
  description: z
    .string()
    .trim()
    .max(500, "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد.")
    .optional(),
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;
