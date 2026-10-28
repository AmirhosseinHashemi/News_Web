import type { User } from "@/features/auth/auth.type";
import type { Category } from "@/features/category/category.type";

export type PostStatus = "DRAFT" | "PUBLISHED";

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  status: PostStatus;
  createdAt: string;
  publishedAt: string | null;
  updatedAt: string;
  deletedAt: string | null;
  author: Pick<User, "id" | "firstName" | "lastName">;
  category: Pick<Category, "id" | "name">;
  cover: Media | null;
};

export type GetPostsParams = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  typeId?: number;
  locationId?: number;
};

export type PostsPageSearchParams = {
  page?: string;
  limit?: string;
  search?: string;
  categoryId?: string;
};

export type PostCardVariant = "hero" | "default" | "list" | "compact" | "video";

export type MediaType = "IMAGE" | "VIDEO";

export type Media = {
  filename: string;
  type: MediaType;
};

export interface MediaInfo {
  type: MediaType;
  totalSeconds?: number;
  count?: number;
}
