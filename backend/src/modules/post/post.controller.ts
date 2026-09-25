import type { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { createPostSchema, getAllPostsQuerySchema } from "./post.schema.js";
import PostService from "./post.service.js";
import { idParamsSchema } from "../../common/schema.js";

export default class PostController {
  constructor(private readonly postService: PostService) {}

  getAll = async (req: Request, res: Response) => {
    const queries = getAllPostsQuerySchema.parse(req.query);
    const posts = await this.postService.findAll(queries);

    sendSuccess(res, { message: "لیست پست ها", data: posts });
  };

  createDraft = async (req: Request, res: Response) => {
    const authorId = req.user.id;
    const payload = createPostSchema.parse(req.body);

    const newPost = await this.postService.createDraft(authorId, payload);
    sendSuccess(res, {
      message: "پست پیش نویس جدید با موفقیت ایجاد شد",
      data: newPost,
    });
  };

  findById = async (req: Request, res: Response) => {
    const { id } = idParamsSchema.parse(req.params);
    const post = await this.postService.findById(id);

    sendSuccess(res, { message: `پست شماره ${id}`, data: post });
  };
}
