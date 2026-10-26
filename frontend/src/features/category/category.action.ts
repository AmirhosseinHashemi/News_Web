"use server";

import { refresh } from "next/cache";

import {
  createCategoryReq,
  updateCategoryReq,
} from "@/features/category/category.api";
import type { CreateCategoryFormValues } from "@/features/category/category.schema";
import type {
  Category,
  UpdateCategoryPayload,
} from "@/features/category/category.type";
import { failure, UNKNOWN_ERR_MSG } from "@/lib/error";
import type { ApiResponse } from "@/types/api.type";

export async function createCategoryAction(
  payload: CreateCategoryFormValues,
): Promise<ApiResponse<Category>> {
  try {
    const response = await createCategoryReq(payload);

    if (response.success) refresh();

    return response;
  } catch (error) {
    const msg = error instanceof Error ? error.message : UNKNOWN_ERR_MSG;
    return failure(500, "UnknownError", msg);
  }
}

export async function updateCategoryAction(
  id: number,
  payload: UpdateCategoryPayload,
): Promise<ApiResponse<Category>> {
  try {
    const response = await updateCategoryReq(id, payload);

    if (response.success) refresh();

    return response;
  } catch (error) {
    const msg = error instanceof Error ? error.message : UNKNOWN_ERR_MSG;
    return failure(500, "UnknownError", msg);
  }
}
