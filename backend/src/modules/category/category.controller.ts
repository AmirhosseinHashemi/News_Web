import { sendSuccess } from "../../utils/response.js";
import { createCategorySchema } from "./category.schema.js";
import CategoryService from "./category.service.js";
import type { Request, Response } from "express";

export default class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  create = async (req: Request, res: Response) => {
    const payload = createCategorySchema.parse(req.body);
    const newCategory = await this.categoryService.create(payload);

    sendSuccess(res, {
      message: "New category created successfully",
      data: newCategory,
    });
  };
}
