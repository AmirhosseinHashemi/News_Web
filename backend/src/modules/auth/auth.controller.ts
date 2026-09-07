import type { Request, Response } from "express";
import AuthService from "./auth.service.js";
import { loginPayload } from "./auth.types.js";
import { sendSuccess } from "../../utils/response.js";

export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const userData = req.body as loginPayload;
    const result = await this.authService.login(userData);

    sendSuccess(res, { message: "Login successfully", data: result });
  };
}
