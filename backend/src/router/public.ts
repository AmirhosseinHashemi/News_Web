import express from "express";
import authRouter from "../modules/auth/auth.route.js";
import { publicCategoryRouter } from "../modules/category/category.route.js";
import { publicUserRouter } from "../modules/user/user.route.js";
import healthRouter from "./health.js";

const publicRouter = express.Router();

publicRouter.use("/health", healthRouter);
publicRouter.use("/auth", authRouter);
publicRouter.use("/users", publicUserRouter);
publicRouter.use("/categories", publicCategoryRouter);

export default publicRouter;
