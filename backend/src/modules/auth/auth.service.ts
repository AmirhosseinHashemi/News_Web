import bcrypt from "bcrypt";
import AppError from "../../errors/AppError.js";
import InvalidCredentialError from "../../errors/InvalidCredentialError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import { generateAccessToken } from "../../lib/jwt.js";
import { hashRefreshToken } from "../../utils/refreshToken.js";
import RefreshTokenRepository from "../refresh-token/refresh-token.repository.js";
import RefreshTokenService from "../refresh-token/refresh-token.service.js";
import UserRepository from "../user/user.repository.js";
import { loginPayload } from "./auth.types.js";

export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async login({ password, phone }: loginPayload) {
    const user = await this.userRepository.findByPhone(phone);
    if (!user) throw new InvalidCredentialError();
    if (!user.isActive)
      throw new AppError({ message: "User is not active", statusCode: 403 });

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw new InvalidCredentialError();

    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role.name,
    });
    const { token: refreshToken } = await this.refreshTokenService.create(
      user.id
    );

    return {
      refreshToken,
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    };
  }

  async refresh(token: string | undefined) {
    if (!token) throw new InvalidCredentialError("Invalid token");

    const hashedToken = hashRefreshToken(token);
    const storedToken =
      await this.refreshTokenRepository.findByHash(hashedToken);

    if (!storedToken) throw new InvalidCredentialError("Invalid token");

    if (storedToken.revokedAt)
      throw new InvalidCredentialError("Invalid token");

    if (storedToken.expiresAt < new Date())
      throw new InvalidCredentialError("Invalid token");

    const user = await this.userRepository.findById(storedToken.userId);

    if (!user) throw new NotFoundError("User not found");

    const { token: newRefreshToken } =
      await this.refreshTokenService.rotateRefreshToken(
        storedToken.id,
        user.id
      );
    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role.name,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
