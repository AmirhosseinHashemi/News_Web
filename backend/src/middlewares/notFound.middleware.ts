import type { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/NotFound.js";

export default function notFoundMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  next(new NotFoundError());
}
