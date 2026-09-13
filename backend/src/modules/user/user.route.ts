import express from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { userController } from "./user.module.js";

const userRouter = express.Router();

userRouter.get("/", asyncHandler(userController.getAll));

export default userRouter;
