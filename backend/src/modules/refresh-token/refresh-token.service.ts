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
}
