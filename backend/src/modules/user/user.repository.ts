import { PrismaClient } from "../../generated/prisma/internal/class.js";
import { execute } from "../../utils/queryExecuter.js";
import { FindAllRepositoryParams } from "./user.type.js";

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
}
