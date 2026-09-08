import type { Response } from "express";
import { env } from "../config/env.js";
import { REFRESH_TOKEN_EXPIRES_IN } from "../config/constants.js";

export function setRefreshTokenCookie(res: Response, refreshToken: string) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/auth/refresh",
    maxAge: REFRESH_TOKEN_EXPIRES_IN,
  });
}

export function clearRefreshTokenCookie(res: Response) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/auth/refresh",
  });
}
