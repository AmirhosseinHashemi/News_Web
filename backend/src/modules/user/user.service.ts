import ConflictError from "../../errors/ConflictError.js";
import ForbiddenError from "../../errors/ForbiddenError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import ValidationError from "../../errors/ValidationError.js";
import { hashPassword } from "../../lib/bcrypt.js";
import {
  getPagination,
  getPaginationMeta,
} from "../../utils/paginationHelpers.js";
import UserRepository from "./user.repository.js";
import {
  CreateUserPayload,
  FindAllSeriviceParams,
  UpdateUserPayload,
  UpdateUserRepositoryParams,
  UpdateUserStatusPayload,
} from "./user.type.js";

export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll({ page, limit }: FindAllSeriviceParams) {
    const { skip, take } = getPagination(page, limit);

    const [users, totalItems] = await this.userRepository.findAll({
      skip,
      take,
    });

    const paginationMeta = getPaginationMeta({ page, limit, totalItems });

    return { users, paginationMeta };
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundError("User not found");

    return user;
  }

  async create(payload: CreateUserPayload) {
    const isExistUser = await this.userRepository.findByPhone(payload.phone);

    if (isExistUser)
      throw new ConflictError({
        message: "User with this phone number already exist",
      });

    const passwordHash = await hashPassword(payload.password);

    return this.userRepository.create({
      ...payload,
      password: passwordHash,
    });
  }

  async update(userId: number, data: UpdateUserPayload) {
    if (Object.entries(data).length === 0)
      throw new ValidationError({ message: "There is nothing to update" });

    const { password, ...dataWithoutPassword } = data;

    const updateData: UpdateUserRepositoryParams = {
      ...dataWithoutPassword,
      ...(password && {
        passwordHash: await hashPassword(password),
      }),
    };

    return this.userRepository.update(userId, updateData);
  }

  async updateStatus(
    userToUpdateId: number,
    userId: number,
    payload: UpdateUserStatusPayload
  ) {
    if (userToUpdateId === userId) throw new ForbiddenError();

    const user = await this.userRepository.findById(userToUpdateId);

    if (!user) throw new NotFoundError("User not found");

    if (payload.isActive === true)
      return await this.userRepository.activateUser(userToUpdateId);

    if (payload.isActive === false)
      return this.userRepository.deactivateUser(userToUpdateId);
  }
}
