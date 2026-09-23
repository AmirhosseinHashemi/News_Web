import type { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { createPostSchema } from "./post.schema.js";
import PostService from "./post.service.js";

export default class PostController {
  constructor(private readonly postService: PostService) {}

  createDraft = async (req: Request, res: Response) => {
    const authorId = req.user.id;
    const payload = createPostSchema.parse(req.body);

    const newPost = await this.postService.createDraft(authorId, payload);
    sendSuccess(res, {
      message: "پست پیش نویس جدید با موفقیت ایجاد شد",
      data: newPost,
    });
  };
}
