import type { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../../config/cloudinary.js";

const STORAGE_FOLDER = "news-web";

export type StoredFile = {
  filename: string;
  publicId: string;
  url: string;
};

function stripExtension(filename: string) {
  return filename.replace(/\.[^/.]+$/, "");
}

export async function saveFile(
  buffer: Buffer,
  filename: string
): Promise<StoredFile> {
  const publicId = stripExtension(filename);

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: STORAGE_FOLDER,
        public_id: publicId,
        resource_type: "image",
        overwrite: false,
      },
      (error, response) => {
        if (error) return reject(error);
        if (!response) return reject(new Error("Cloudinary upload failed"));

        resolve(response);
      }
    );

    uploadStream.end(buffer);
  });

  return {
    filename: result.public_id,
    publicId: result.public_id,
    url: result.secure_url,
  };
}

export async function deleteFile(publicId: string) {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
}

export function getFileStorageUrl(publicId: string) {
  return cloudinary.url(publicId, { secure: true });
}
