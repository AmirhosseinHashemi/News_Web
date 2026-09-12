import {
  generateRefreshToken,
  getRefreshTokenExpiration,
  hashRefreshToken,
} from "../../utils/refreshToken.js";
import RefreshTokenRepository from "./refresh-token.repository.js";

export default class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async create(userId: number) {
    const token = generateRefreshToken();
    const tokenHash = hashRefreshToken(token);
    const expiresAt = getRefreshTokenExpiration();

    await this.refreshTokenRepository.create({ tokenHash, expiresAt, userId });

    return {
      token,
      expiresAt,
    };
  }

  async rotateRefreshToken(oldTokenDbId: number, userId: number) {
    const token = generateRefreshToken();
    const tokenHash = hashRefreshToken(token);
    const expiresAt = getRefreshTokenExpiration();

    await this.refreshTokenRepository.rotateRefreshToken(oldTokenDbId, {
      expiresAt,
      tokenHash,
      userId,
    });

    return {
      token,
      expiresAt,
    };
  }

  async findToken(token: string) {
    const hashedToken = hashRefreshToken(token);
    return await this.refreshTokenRepository.findByHash(hashedToken);
  }
}
