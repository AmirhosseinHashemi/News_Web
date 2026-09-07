import { PrismaClient } from "../../generated/prisma/internal/class.js";

export default class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(phone: string) {
    return this.prisma.user.findUnique({ where: { phone } });
  }
}
