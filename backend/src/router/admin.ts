import express from "express";
import authenticateMiddleware from "../middlewares/authenticate.middleware.js";
import { adminCategoryRouter } from "../modules/category/category.route.js";
import { adminMediaRouter } from "../modules/media/media.route.js";
import { adminPostRouter } from "../modules/post/post.route.js";
import { adminUserRouter } from "../modules/user/user.route.js";

const adminRouter = express.Router();

adminRouter.use(authenticateMiddleware);

adminRouter.use("/users", adminUserRouter);
adminRouter.use("/categories", adminCategoryRouter);
adminRouter.use("/posts", adminPostRouter);
adminRouter.use("/media", adminMediaRouter);

export default adminRouter;
