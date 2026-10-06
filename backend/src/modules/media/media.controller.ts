import { sendSuccess } from "../../utils/response.js";
import MediaService from "./media.service.js";
import type { Request, Response } from "express";

export default class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  upload = async (req: Request, res: Response) => {
    const result = await this.mediaService.upload(req?.file);
    sendSuccess(res, { message: "رسانه با موفقیت اپلود شد", data: result });
  };
}
