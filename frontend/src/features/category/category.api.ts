import type {
  Category,
  GetCategoriesParams,
} from "@/features/category/category.type";
import { http } from "@/lib/http";

export const CATEGORIES_PAGE_SIZE = 5;

export function getCategoriesReq({
  page = 1,
  limit = CATEGORIES_PAGE_SIZE,
  search,
}: GetCategoriesParams = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const trimmedSearch = search?.trim();
  if (trimmedSearch) params.set("search", trimmedSearch);

  return http<Category[]>(`/categories?${params.toString()}`);
}
