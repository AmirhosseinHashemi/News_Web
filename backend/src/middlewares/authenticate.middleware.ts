import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { verifyAccessToken } from "../lib/jwt.js";

export default function authenticateMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError();
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new UnauthorizedError();
  }

  const payload = verifyAccessToken(token);

  req.user = {
    id: payload.userId,
    role: payload.role,
  };

  next();
}
