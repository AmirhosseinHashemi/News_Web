import express from "express";
import validateMiddleware from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { categoryController } from "./category.module.js";
import {
  createCategorySchema,
  getAllCategoriesQuerySchema,
} from "./category.schema.js";

const publicCategoryRouter = express.Router();
const adminCategoryRouter = express.Router();

adminCategoryRouter.post(
  "/",
  validateMiddleware({ body: createCategorySchema }),
  asyncHandler(categoryController.create)
);

publicCategoryRouter.get(
  "/",
  validateMiddleware({ query: getAllCategoriesQuerySchema }),
  asyncHandler(categoryController.getAll)
);

export { publicCategoryRouter, adminCategoryRouter };
