import type { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { deleteMediaSchema } from "./media.schema.js";
import MediaService from "./media.service.js";

export default class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  upload = async (req: Request, res: Response) => {
    const result = await this.mediaService.upload(req?.file);
    sendSuccess(res, { message: "رسانه با موفقیت اپلود شد", data: result });
  };

  delete = async (req: Request, res: Response) => {
    const { publicId } = deleteMediaSchema.parse(req.body);
    await this.mediaService.delete(publicId);
    sendSuccess(res, { message: "رسانه با موفقیت حذف شد" });
  };
}
