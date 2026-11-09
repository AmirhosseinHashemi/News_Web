"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/config/routes";
import { postCreatePostReq } from "@/features/post/post.api";
import type { CreatePostPayload, Post } from "@/features/post/post.type";
import { failure, UNKNOWN_ERR_MSG } from "@/lib/error";
import type { ApiResponse } from "@/types/api.type";

export async function createPostAction(
  payload: CreatePostPayload,
): Promise<ApiResponse<Post>> {
  try {
    const response = await postCreatePostReq(payload);

    if (response.success) revalidatePath(ROUTES.posts);

    return response;
  } catch (error) {
    const msg = error instanceof Error ? error.message : UNKNOWN_ERR_MSG;
    return failure(500, "UnknownError", msg);
  }
}
