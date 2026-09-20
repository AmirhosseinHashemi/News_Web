import z from "zod";
import { paginationQuerySchema } from "../../common/schema.js";

export const createCategorySchema = z.object({
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().max(500).optional(),
});

export const getAllCategoriesQuerySchema = paginationQuerySchema.extend({
  search: z.string().trim().optional(),
});
