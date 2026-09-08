import type { Request, Response } from "express";
import { setRefreshTokenCookie } from "../../utils/cookie.js";
import { sendSuccess } from "../../utils/response.js";
import AuthService from "./auth.service.js";
import { loginPayload } from "./auth.types.js";

export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const userData = req.body as loginPayload;
    const { accessToken, refreshToken, user } =
      await this.authService.login(userData);

    setRefreshTokenCookie(res, refreshToken);

    sendSuccess(res, {
      message: "Login successfully",
      data: { accessToken, user },
    });
  };

  refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken as string | undefined;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refresh(refreshToken);

    setRefreshTokenCookie(res, newRefreshToken);
    sendSuccess(res, {
      message: "New token generated successfully",
      data: accessToken,
    });
  };
}
