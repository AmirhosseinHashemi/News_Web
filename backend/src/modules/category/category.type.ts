import z from "zod";
import { createCategorySchema } from "./category.schema.js";

export type CreateCategoryRepositoryData = {
  name: string;
  slug: string;
  description?: string;
};

export type CreateCategoryPayload = z.infer<typeof createCategorySchema>;
