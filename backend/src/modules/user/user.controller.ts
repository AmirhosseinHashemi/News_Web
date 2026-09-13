import type { Request, Response } from "express";

import UserService from "./user.service.js";
import { sendSuccess } from "../../utils/response.js";

export default class UserController {
  constructor(private readonly userService: UserService) {}

  getAll = async (_req: Request, res: Response) => {
    const result = await this.userService.findAll();

    sendSuccess(res, { message: "All users", data: result });
  };
}
