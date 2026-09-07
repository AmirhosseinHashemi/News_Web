import type { Request, Response } from "express";
import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../lib/prisma.js";
import { sendSuccess } from "../utils/response.js";

const healthRouter = express.Router();

healthRouter.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    await prisma.$queryRaw`SELECT 1`;
    sendSuccess(res, { message: "Database is connected" });
  })
);

export default healthRouter;
