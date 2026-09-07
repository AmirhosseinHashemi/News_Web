import express from "express";
import healthRouter from "./health.js";
import authRouter from "../modules/auth/auth.router.js";

const router = express.Router();

router.use("/health", healthRouter);
router.use("/auth", authRouter);

export default router;
