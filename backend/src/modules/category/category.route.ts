import express from "express";
import { idParamsSchema } from "../../common/schema.js";
import validateMiddleware from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { categoryController } from "./category.module.js";
import {
  createCategorySchema,
  getAllCategoriesQuerySchema,
  updateCategorySchema,
} from "./category.schema.js";

const publicCategoryRouter = express.Router();
const adminCategoryRouter = express.Router();

adminCategoryRouter.post(
  "/",
  validateMiddleware({ body: createCategorySchema }),
  asyncHandler(categoryController.create)
);

adminCategoryRouter.get(
  "/:id",
  validateMiddleware({ params: idParamsSchema }),
  asyncHandler(categoryController.findById)
);

publicCategoryRouter.get(
  "/",
  validateMiddleware({ query: getAllCategoriesQuerySchema }),
  asyncHandler(categoryController.getAll)
);

adminCategoryRouter.patch(
  "/:id",
  validateMiddleware({ params: idParamsSchema, body: updateCategorySchema }),
  asyncHandler(categoryController.update)
);

export { adminCategoryRouter, publicCategoryRouter };
