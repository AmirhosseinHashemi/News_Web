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

const userRouter = express.Router();

userRouter.get(
  "/",
  validateMiddleware({ query: getUsersQuerySchema }),
  asyncHandler(userController.getAll)
);

userRouter.get(
  "/:id",
  validateMiddleware({ params: getUserByIdParamsSchema }),
  asyncHandler(userController.getById)
);

userRouter.post(
  "/",
  validateMiddleware({ body: createUserSchema }),
  asyncHandler(userController.create)
);

userRouter.patch(
  "/:id",
  validateMiddleware({
    body: updateUserBodySchema,
    params: updateUserParamsSchema,
  }),
  asyncHandler(userController.update)
);

userRouter.patch(
  "/:id/status",
  validateMiddleware({
    body: updateUserStatusBodySchema,
    params: updateUserStatusParamsSchema,
  }),
  asyncHandler(userController.updateStatus)
);

export default userRouter;
