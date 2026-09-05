import cors from "cors";
import express from "express";
import helmet from "helmet";
import { prisma } from "./lib/prisma.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/health", async (_req, res) => {
  const result = await prisma.$queryRaw`SELECT 1`;
  res.status(200).json({
    success: true,
    message: "Backend API is running",
    data: result,
    timestamp: new Date().toISOString(),
  });
});

export default app;
