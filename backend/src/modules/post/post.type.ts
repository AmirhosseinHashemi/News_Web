import z from "zod";
import { createPostSchema, getAllPostsQuerySchema } from "./post.schema.js";

export type CreatePostPayload = z.infer<typeof createPostSchema>;

export type CreatePostData = CreatePostPayload & {
  slug: string;
  authorId: number;
};

export type FindAllPostsData = {
  skip: number;
  take: number;
  search?: string;
};

export type FindAllPostQueris = z.infer<typeof getAllPostsQuerySchema>;
