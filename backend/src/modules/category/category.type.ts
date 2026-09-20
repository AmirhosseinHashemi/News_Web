import z from "zod";
import {
  createCategorySchema,
  getAllCategoriesQuerySchema,
} from "./category.schema.js";

export type CreateCategoryRepositoryData = {
  name: string;
  slug: string;
  description?: string;
};

export type CreateCategoryPayload = z.infer<typeof createCategorySchema>;

export type FindAllCategoriesRepositoryParams = {
  skip: number;
  take: number;
  search?: string;
};

export type FindAllCategoriesServiceParams = z.infer<
  typeof getAllCategoriesQuerySchema
>;
