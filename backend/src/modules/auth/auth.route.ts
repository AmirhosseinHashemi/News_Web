import express from "express";
import authenticateMiddleware from "../../middlewares/authenticate.middleware.js";
import validateMiddleware from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authController } from "./auth.module.js";
import { loginSchema, logoutSchema, refreshSchema } from "./auth.schema.js";

const authRouter = express.Router();

authRouter.post(
  "/login",
  validateMiddleware({ body: loginSchema }),
  asyncHandler(authController.login)
);

authRouter.post(
  "/refresh",
  validateMiddleware({ body: refreshSchema }),
  asyncHandler(authController.refresh)
);

authRouter.post(
  "/logout",
  authenticateMiddleware,
  validateMiddleware({ body: logoutSchema }),
  asyncHandler(authController.logout)
);

authRouter.post(
  "/logout-all",
  authenticateMiddleware,
  asyncHandler(authController.logoutAll)
);

authRouter.get("/me", authenticateMiddleware, asyncHandler(authController.me));

export default authRouter;
