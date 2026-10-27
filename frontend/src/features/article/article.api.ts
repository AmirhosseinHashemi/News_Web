import type {
  Article,
  GetArticlesParams,
} from "@/features/article/article.type";
import { http } from "@/lib/http";

export const ARTICLES_PAGE_SIZE = 9;

export function getArticlesReq({
  page = 1,
  limit = ARTICLES_PAGE_SIZE,
  search,
  categoryId,
  typeId,
  locationId,
}: GetArticlesParams = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const trimmedSearch = search?.trim();
  if (trimmedSearch) params.set("search", trimmedSearch);
  if (categoryId) params.set("categoryId", String(categoryId));
  if (typeId) params.set("typeId", String(typeId));
  if (locationId) params.set("locationId", String(locationId));

  return http<Article[]>(`/admin/posts?${params.toString()}`);
}
