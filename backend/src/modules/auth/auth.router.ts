import express from "express";
import validateMiddleware from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authController } from "./auth.module.js";
import { loginSchema } from "./auth.schema.js";
import authenticateMiddleware from "../../middlewares/authenticate.middleware.js";

const authRouter = express.Router();

authRouter.post(
  "/login",
  validateMiddleware({ body: loginSchema }),
  asyncHandler(authController.login)
);

authRouter.post("/refresh", asyncHandler(authController.refresh));

authRouter.post(
  "/logout",
  authenticateMiddleware,
  asyncHandler(authController.logout)
);

export default authRouter;
