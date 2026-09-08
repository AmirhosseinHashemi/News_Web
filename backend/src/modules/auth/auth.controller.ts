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
}
