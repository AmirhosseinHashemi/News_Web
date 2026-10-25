import { CreateCategoryFormValues } from "@/features/category/category.schema";

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCategoryPayload = CreateCategoryFormValues;

export type GetCategoriesParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export type CategoriesPageSearchParams = {
  page?: string;
  limit?: string;
  search?: string;
};
