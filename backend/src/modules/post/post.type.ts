import z from "zod";
import {
  createPostSchema,
  getAllPostsQuerySchema,
  updatePostSchema,
} from "./post.schema.js";

export type CreatePostPayload = z.infer<typeof createPostSchema>;

export type CreatePostData = CreatePostPayload & {
  slug: string;
  authorId: number;
};

export type FindAllPostQueries = z.infer<typeof getAllPostsQuerySchema>;

export type FindAllPostsData = Omit<FindAllPostQueries, "page" | "limit"> & {
  skip: number;
  take: number;
};

export type UpdatePostPayload = z.infer<typeof updatePostSchema>;
