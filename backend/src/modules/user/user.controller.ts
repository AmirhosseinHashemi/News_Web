import type { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import UserService from "./user.service.js";
import {
  createUserSchema,
  getUserByIdParamsSchema,
  getUsersQuerySchema,
  updateUserBodySchema,
  updateUserParamsSchema,
  updateUserStatusBodySchema,
  updateUserStatusParamsSchema,
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

  update = async (req: Request, res: Response) => {
    const { id } = updateUserParamsSchema.parse(req.params);
    const payload = updateUserBodySchema.parse(req.body);

    const updatedUser = await this.userService.update(id, payload);

    sendSuccess(res, {
      message: "User updated successfully",
      data: updatedUser,
    });
  };

  updateStatus = async (req: Request, res: Response) => {
    const { id: userToUpdateId } = updateUserStatusParamsSchema.parse(
      req.params
    );
    const payload = updateUserStatusBodySchema.parse(req.body);

    const updatedUser = await this.userService.updateStatus(
      userToUpdateId,
      req.user.id,
      payload
    );

    sendSuccess(res, {
      message: "User status changed successfully",
      data: updatedUser,
    });
  };
}
