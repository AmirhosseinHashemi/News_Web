import type { NextFunction, Request, Response, RequestHandler } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export function asyncHandler(controller: AsyncController): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
}
