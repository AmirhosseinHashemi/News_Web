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

  async rotateRefreshToken(
    oldTokenDbId: number,
    newTokenData: CreateRefreshTokenData
  ) {
    const [_, refreshToken] = await execute(() =>
      this.prisma.$transaction([
        this.prisma.refreshToken.update({
          where: { id: oldTokenDbId },
          data: { revokedAt: new Date() },
        }),
        this.prisma.refreshToken.create({
          data: {
            tokenHash: newTokenData.tokenHash,
            userId: newTokenData.userId,
            expiresAt: newTokenData.expiresAt,
          },
        }),
      ])
    );

    return refreshToken;
  }

  async revokeRefreshToken(tokenHash: string) {
    return execute(() =>
      this.prisma.refreshToken.update({
        where: {
          tokenHash,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      })
    );
  }
}
