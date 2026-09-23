import type { Request, Response } from "express";
import { idParamsSchema } from "../../common/schema.js";
import { sendSuccess } from "../../utils/response.js";
import {
  createCategorySchema,
  getAllCategoriesQuerySchema,
  updateCategorySchema,
} from "./category.schema.js";
import CategoryService from "./category.service.js";

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

  update = async (req: Request, res: Response) => {
    const { id } = idParamsSchema.parse(req.params);
    const payload = updateCategorySchema.parse(req.body);

    const updeatedCategory = await this.categoryService.update(id, payload);
    sendSuccess(res, {
      message: `category with id ${id} updated successully`,
      data: updeatedCategory,
    });
  };
}
