import type { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError.js";
import { logger } from "../lib/logger.js";

export default function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // const isDevelopment = process.env.NODE_ENV === "development";

  if (error instanceof AppError) {
    logger.warn(
      `${req.method} ${req.originalUrl} ${error.statusCode} - ${error.message}`
    );

    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errorName: error.name,
      errors: error.errors,
      //   ...(isDevelopment && { stack: error.stack }),
    });
  } else {
    logger.error(`${req.method} ${req.originalUrl} - Unexpected error`, error);

    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
      name: "Unknown Error",
      errors: [],
      //   ...(isDevelopment && {
      //     stack: error instanceof Error ? error.stack : undefined,
      //   }),
    });
  }
}
