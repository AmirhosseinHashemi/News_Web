import {
  generateImageFilename,
  processImage,
} from "../../common/image/image.service.js";
import {
  deleteFile,
  saveFile,
} from "../../common/storage/storage.cloudinary.js";
import BadRequestError from "../../errors/BadRequestError.js";
import ConflictError from "../../errors/ConflictError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import { MediaType } from "../../generated/prisma/enums.js";
import MediaRepository from "./media.repository.js";

export default class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async upload(file?: Express.Multer.File) {
    if (!file) throw new BadRequestError("فایل اجباریست");

    const processedBuffer = await processImage(file.buffer);
    const imageName = generateImageFilename();

    const uploaded = await saveFile(processedBuffer, imageName);

    try {
      const media = await this.mediaRepository.create({
        url: uploaded.url,
        publicId: uploaded.publicId,
        mimeType: "image/webp",
        size: processedBuffer.length,
        type: MediaType.IMAGE,
      });

      return {
        id: media.id,
        publicId: uploaded.publicId,
        url: uploaded.url,
      };
    } catch (error) {
      await deleteFile(uploaded.publicId);
      throw error;
    }
  }

  async delete(publicId: string) {
    const media = await this.mediaRepository.findByPublicId(publicId);

    if (!media) {
      throw new NotFoundError("مدیا پیدا نشد");
    }

    if (media.coverFor) {
      throw new ConflictError({
        message: "این مدیا به عنوان کاور یک پست استفاده شده است",
      });
    }

    await deleteFile(media.publicId!);

    await this.mediaRepository.delete(publicId);
  }
}
