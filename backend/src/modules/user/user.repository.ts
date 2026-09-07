import { PrismaClient } from "../../generated/prisma/internal/class.js";
import { execute } from "../../utils/queryExecuter.js";

export default class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(phone: string) {
    return execute(() => this.prisma.user.findUnique({ where: { phone } }));
  }
}
