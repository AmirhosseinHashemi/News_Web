"use server";

import { deleteMediaReq, postUploadMediaReq } from "@/features/media/media.api";
import { MediaUploadResponse } from "@/features/media/media.type";
import { failure, UNKNOWN_ERR_MSG } from "@/lib/error";
import { ApiResponse } from "@/types/api.type";

const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadMediaAction(
  file: File,
): Promise<ApiResponse<MediaUploadResponse>> {
  try {
    if (!(file instanceof File))
      return failure(400, "BadRequestError", "فایل نامعتبر ");

    if (!ACCEPTED_TYPES.includes(file.type))
      return failure(
        400,
        "BadRequestError",
        "فقط فرمت های JPEG، PNG و WEBP مجاز است",
      );

    if (file.size > MAX_SIZE)
      return failure(
        400,
        "BadRequestError",
        "حجم تصویر نباید بیشتر از 5 مگابایت باشد",
      );

    const response = await postUploadMediaReq(file);

    return response;
  } catch (error) {
    const msg = error instanceof Error ? error.message : UNKNOWN_ERR_MSG;
    return failure(500, "UnknownError", msg);
  }
}

export async function deleteMediaAction(publicId: string) {
  try {
    return deleteMediaReq(publicId);
  } catch (error) {
    const msg = error instanceof Error ? error.message : UNKNOWN_ERR_MSG;
    return failure(500, "UnknownError", msg);
  }
}
