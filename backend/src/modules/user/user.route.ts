import express from "express";
import validateMiddleware from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { userController } from "./user.module.js";
import { getUsersQuerySchema } from "./users.schema.js";

const userRouter = express.Router();

userRouter.get(
  "/",
  validateMiddleware({ query: getUsersQuerySchema }),
  asyncHandler(userController.getAll)
);

export default userRouter;
