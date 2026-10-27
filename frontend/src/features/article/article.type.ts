import { Category } from "@/features/category/category.type";

export type ArticleStatus = "DRAFT" | "PUBLISHED";

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverId: number | null;
  typeId: number;
  locationId: number | null;
  status: ArticleStatus;
  publishedAt: string | null;
  expiresAt: string | null;
  deletedAt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  category: Pick<Category, "id" | "name">;
};

export type GetArticlesParams = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  typeId?: number;
  locationId?: number;
};

export type ArticlesPageSearchParams = {
  page?: string;
  limit?: string;
  search?: string;
};
