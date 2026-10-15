import type { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { logoutSchema, refreshSchema } from "./auth.schema.js";
import AuthService from "./auth.service.js";
import { loginPayload } from "./auth.types.js";

export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const userData = req.body as loginPayload;
    const data = await this.authService.login(userData);

    sendSuccess(res, {
      message: "Login successfully",
      data,
    });
  };

  refresh = async (req: Request, res: Response) => {
    const payload = refreshSchema.parse(req.body);

    const data = await this.authService.refresh(payload.refreshToken);

    sendSuccess(res, {
      message: "New token generated successfully",
      data,
    });
  };

  logout = async (req: Request, res: Response) => {
    const payload = logoutSchema.parse(req.body);
    await this.authService.logout(payload.refreshToken);

    sendSuccess(res, { message: "logout successfully" });
  };

  logoutAll = async (req: Request, res: Response) => {
    await this.authService.logoutAll(req.user.id);

    sendSuccess(res, { message: "logout all successfully" });
  };
}
