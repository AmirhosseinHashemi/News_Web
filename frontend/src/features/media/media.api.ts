import { MediaUploadResponse } from "@/features/media/media.type";
import { http } from "@/lib/http";

export async function postUploadMediaReq(file: File) {
  const body = new FormData();
  body.append("file", file);

  return http<MediaUploadResponse>("/admin/media", {
    method: "POST",
    body,
  });
}

export async function deleteMediaReq(publicId: string) {
  return http<null>("/admin/media", {
    method: "DELETE",
    body: {
      publicId,
    },
  });
}
