import express from "express";
import { validate } from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authController } from "./auth.module.js";
import { loginSchema } from "./auth.schema.js";

const authRouter = express.Router();

authRouter.post(
  "/login",
  validate({ body: loginSchema }),
  asyncHandler(authController.login)
);

export default authRouter;
