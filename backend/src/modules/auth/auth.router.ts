import express from "express";
import authenticateMiddleware from "../../middlewares/authenticate.middleware.js";
import validateMiddleware from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authController } from "./auth.module.js";
import { loginSchema } from "./auth.schema.js";

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

authRouter.post(
  "/logout-all",
  authenticateMiddleware,
  asyncHandler(authController.logoutAll)
);

export default authRouter;
