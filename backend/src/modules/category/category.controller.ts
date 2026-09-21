import type { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import {
  createCategorySchema,
  getAllCategoriesQuerySchema,
} from "./category.schema.js";
import CategoryService from "./category.service.js";
import { idParamsSchema } from "../../common/schema.js";

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

  getAll = async (req: Request, res: Response) => {
    const query = getAllCategoriesQuerySchema.parse(req.query);
    const { categories, paginationMeta } =
      await this.categoryService.findAll(query);

    sendSuccess(res, {
      message: "All categories",
      data: categories,
      meta: paginationMeta,
    });
  };

  findById = async (req: Request, res: Response) => {
    const { id } = idParamsSchema.parse(req.params);
    const category = await this.categoryService.findById(id);

    sendSuccess(res, { message: `Category ${id}`, data: category });
  };
}
