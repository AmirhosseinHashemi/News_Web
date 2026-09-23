import z from "zod";
import { createPostSchema } from "./post.schema.js";

export type CreatePostPayload = z.infer<typeof createPostSchema>;

export type CreatePostData = CreatePostPayload & {
  slug: string;
  authorId: number;
};
