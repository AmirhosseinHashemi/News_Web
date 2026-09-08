import crypto from "node:crypto";
import { REFRESH_TOKEN_EXPIRES_IN } from "../config/constants.js";

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const hashRefreshToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const getRefreshTokenExpiration = () =>
  new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN);
