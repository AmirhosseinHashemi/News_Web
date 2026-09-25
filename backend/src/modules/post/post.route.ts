import express from "express";
import { idParamsSchema } from "../../common/schema.js";
import validateMiddleware from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { postController } from "./post.module.js";
import { createPostSchema, getAllPostsQuerySchema } from "./post.schema.js";

const adminPostRouter = express.Router();

adminPostRouter.get(
  "/",
  validateMiddleware({
    query: getAllPostsQuerySchema,
  }),
  asyncHandler(postController.getAll)
);

adminPostRouter.post(
  "/",
  validateMiddleware({
    body: createPostSchema,
  }),
  asyncHandler(postController.createDraft)
);

adminPostRouter.get(
  "/:id",
  validateMiddleware({
    params: idParamsSchema,
  }),
  asyncHandler(postController.findById)
);

export { adminPostRouter };
