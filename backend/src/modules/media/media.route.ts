import express from "express";
import uploadMiddleware from "../../middlewares/upload.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { mediaController } from "./media.module.js";

const adminMediaRouter = express.Router();

adminMediaRouter.post(
  "/",
  uploadMiddleware.single("file"),
  asyncHandler(mediaController.upload)
);

export { adminMediaRouter };
