import express from "express";
import validateMiddleware from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { categoryController } from "./category.module.js";
import { createCategorySchema } from "./category.schema.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  validateMiddleware({ body: createCategorySchema }),
  asyncHandler(categoryController.create)
);

export default categoryRouter;
