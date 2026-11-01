import express from "express";
import uploadMiddleware from "../../middlewares/upload.middleware.js";
import validateMiddleware from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { mediaController } from "./media.module.js";
import { deleteMediaSchema } from "./media.schema.js";

const adminMediaRouter = express.Router();

adminMediaRouter.post(
  "/",
  uploadMiddleware.single("file"),
  asyncHandler(mediaController.upload)
);

adminMediaRouter.delete(
  "/",
  validateMiddleware({
    body: deleteMediaSchema,
  }),
  asyncHandler(mediaController.delete)
);

export { adminMediaRouter };
