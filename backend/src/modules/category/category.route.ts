import express from "express";
import validateMiddleware from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { categoryController } from "./category.module.js";
import {
  createCategorySchema,
  getAllCategoriesQuerySchema,
} from "./category.schema.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  validateMiddleware({ body: createCategorySchema }),
  asyncHandler(categoryController.create)
);

categoryRouter.get(
  "/",
  validateMiddleware({ query: getAllCategoriesQuerySchema }),
  asyncHandler(categoryController.getAll)
);

export default categoryRouter;
