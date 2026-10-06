import {
    generateImageFilename,
    processImage,
} from "../../common/image/image.service.js";
import {
    deleteFile,
    getFileStorageUrl,
    saveFile,
} from "../../common/storage/storage.local.js";
import BadRequestError from "../../errors/BadRequestError.js";
import { MediaType } from "../../generated/prisma/enums.js";
import MediaRepository from "./media.repository.js";

export default class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async upload(file?: Express.Multer.File) {
    if (!file) throw new BadRequestError("فایل اجباریست");

    const processedBuffer = await processImage(file.buffer);
    const imageName = generateImageFilename();

    const { filename, path } = await saveFile(processedBuffer, imageName);

    try {
      const media = await this.mediaRepository.create({
        filename,
        mimeType: "image/webp",
        size: processedBuffer.length,
        type: MediaType.IMAGE,
      });

      return {
        id: media.id,
        url: getFileStorageUrl(media.filename),
      };
    } catch (error) {
      await deleteFile(path);
      throw error;
    }
  }
}
