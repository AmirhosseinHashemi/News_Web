import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

type AccessTokenPayload = {
  userId: number;
  role: string;
};

export function generateAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload &
      AccessTokenPayload;
  } catch (error: unknown) {
    console.log(error);
    throw new UnauthorizedError();
  }
}
