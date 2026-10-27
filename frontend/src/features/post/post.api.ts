import type { GetPostsParams, Post } from "@/features/post/post.type";
import { http } from "@/lib/http";

export const POST_PAGE_SIZE = 9;

export function getPostsReq({
  page = 1,
  limit = POST_PAGE_SIZE,
  search,
  categoryId,
  typeId,
  locationId,
}: GetPostsParams = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const trimmedSearch = search?.trim();
  if (trimmedSearch) params.set("search", trimmedSearch);
  if (categoryId) params.set("categoryId", String(categoryId));
  if (typeId) params.set("typeId", String(typeId));
  if (locationId) params.set("locationId", String(locationId));

  return http<Post[]>(`/admin/posts?${params.toString()}`);
}
