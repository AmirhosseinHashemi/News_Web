import express from "express";
import validateMiddleware from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { userController } from "./user.module.js";
import {
  createUserSchema,
  getUserByIdParamsSchema,
  getUsersQuerySchema,
  updateUserBodySchema,
  updateUserParamsSchema,
  updateUserStatusBodySchema,
  updateUserStatusParamsSchema,
} from "./users.schema.js";

const publicUserRouter = express.Router();
const adminUserRouter = express.Router();

publicUserRouter.get(
  "/",
  validateMiddleware({ query: getUsersQuerySchema }),
  asyncHandler(userController.getAll)
);

adminUserRouter.get(
  "/:id",
  validateMiddleware({ params: getUserByIdParamsSchema }),
  asyncHandler(userController.getById)
);

adminUserRouter.post(
  "/",
  validateMiddleware({ body: createUserSchema }),
  asyncHandler(userController.create)
);

adminUserRouter.patch(
  "/:id",
  validateMiddleware({
    body: updateUserBodySchema,
    params: updateUserParamsSchema,
  }),
  asyncHandler(userController.update)
);

adminUserRouter.patch(
  "/:id/status",
  validateMiddleware({
    body: updateUserStatusBodySchema,
    params: updateUserStatusParamsSchema,
  }),
  asyncHandler(userController.updateStatus)
);

export { adminUserRouter, publicUserRouter };
