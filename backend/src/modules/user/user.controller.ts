import type { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import UserService from "./user.service.js";
import {
  createUserSchema,
  getUserByIdParamsSchema,
  getUsersQuerySchema,
} from "./users.schema.js";

export default class UserController {
  constructor(private readonly userService: UserService) {}

  getAll = async (req: Request, res: Response) => {
    const { page, limit } = getUsersQuerySchema.parse(req.query);
    const { users, paginationMeta } = await this.userService.findAll({
      page,
      limit,
    });

    sendSuccess(res, {
      message: "All users",
      data: users,
      meta: paginationMeta,
    });
  };

  getById = async (req: Request, res: Response) => {
    const { id } = getUserByIdParamsSchema.parse(req.params);
    const user = await this.userService.findById(id);

    sendSuccess(res, { message: `User ${id}`, data: user });
  };

  create = async (req: Request, res: Response) => {
    const payload = createUserSchema.parse(req.body);
    
    const newUser = await this.userService.create(payload);

    sendSuccess(res, {
      message: "New user created successfully",
      data: newUser,
    });
  };
}
