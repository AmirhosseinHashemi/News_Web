import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

type Payload = {
  userId: number;
};

export function generateAccessToken({ userId }: Payload) {
  return jwt.sign({ userId }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  });
}
