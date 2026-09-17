import express from "express";
import authenticateMiddleware from "../middlewares/authenticate.middleware.js";
import authRouter from "../modules/auth/auth.route.js";
import userRouter from "../modules/user/user.route.js";
import healthRouter from "./health.js";

const router = express.Router();

router.use("/health", healthRouter);

router.use("/auth", authRouter);

router.use("/users", authenticateMiddleware, userRouter);

export default router;
