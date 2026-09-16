import { PrismaClient } from "../../generated/prisma/internal/class.js";
import { execute } from "../../utils/queryExecuter.js";
import {
  CreateUserPayload,
  FindAllRepositoryParams,
  UpdateUserRepositoryParams,
} from "./user.type.js";

export default class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll({ skip, take }: FindAllRepositoryParams) {
    return execute(() =>
      this.prisma.$transaction([
        this.prisma.user.findMany({
          skip,
          take,
          omit: { passwordHash: true },
          include: { role: true },
        }),
        this.prisma.user.count(),
      ])
    );
  }

  async findById(id: number) {
    return execute(() =>
      this.prisma.user.findUnique({
        where: { id },
        omit: {
          passwordHash: true,
        },
        include: {
          role: true,
        },
      })
    );
  }

  async findByPhone(phone: string) {
    return execute(() =>
      this.prisma.user.findUnique({ where: { phone }, include: { role: true } })
    );
  }

  async create({
    name,
    email,
    phone,
    password,
    isActive,
    roleId,
  }: CreateUserPayload) {
    return execute(() =>
      this.prisma.user.create({
        data: {
          name,
          email,
          phone,
          isActive,
          passwordHash: password,
          roleId,
        },
        omit: {
          passwordHash: true,
        },
      })
    );
  }

  async update(userId: number, data: UpdateUserRepositoryParams) {
    return execute(() =>
      this.prisma.user.update({
        where: {
          id: userId,
        },
        data,
        omit: {
          passwordHash: true,
        },
      })
    );
  }
}
