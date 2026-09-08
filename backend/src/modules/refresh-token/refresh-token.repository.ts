import { PrismaClient } from "../../generated/prisma/internal/class.js";
import { execute } from "../../utils/queryExecuter.js";
import { CreateRefreshTokenData } from "./refresh-token.types.js";

export default class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({ tokenHash, userId, expiresAt }: CreateRefreshTokenData) {
    return execute(() =>
      this.prisma.refreshToken.create({
        data: {
          tokenHash,
          userId,
          expiresAt,
        },
      })
    );
  }

  async findByHash(tokenHash: string) {
    return execute(() =>
      this.prisma.refreshToken.findUnique({
        where: { tokenHash },
        include: { user: true },
      })
    );
  }

  async revoke(id: number) {
    return execute(() =>
      this.prisma.refreshToken.update({
        where: { id },
        data: { revokedAt: new Date() },
      })
    );
  }
}
