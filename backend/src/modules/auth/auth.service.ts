import bcrypt from "bcrypt";
import ForbiddenError from "../../errors/ForbiddenError.js";
import InvalidCredentialError from "../../errors/InvalidCredentialError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import UnauthorizedError from "../../errors/UnauthorizedError.js";
import { generateAccessToken } from "../../lib/jwt.js";
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
    if (user.isActive === false) throw new ForbiddenError("کاربر فعال نیست");

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw new InvalidCredentialError();

    const accessToken = generateAccessToken({
      userId: user.id,
      userName: user.firstName,
      roleId: user.roleId,
      role: user.role.name,
      roleDescription: user.role.description || "",
      phone: user.phone,
    });
    const { token: refreshToken, expiresAt } =
      await this.refreshTokenService.create(user.id);

    return {
      accessToken,
      refreshToken,
      refreshTokenExp: expiresAt,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    };
  }

  async refresh(token: string) {
    if (!token) throw new InvalidCredentialError("توکن نامعتبر");

    const storedToken = await this.refreshTokenService.findToken(token);

    if (!storedToken) throw new InvalidCredentialError("توکن نامعتبر");

    if (storedToken.revokedAt) throw new InvalidCredentialError("توکن نامعتبر");

    if (storedToken.expiresAt < new Date())
      throw new InvalidCredentialError("توکن نامعتبر");

    const user = await this.userRepository.findById(storedToken.userId);

    if (!user) throw new NotFoundError("کاربری یافت نشد");

    if (user.isActive === false) throw new ForbiddenError("کاربر فعال نیست");

    const { token: newRefreshToken, expiresAt } =
      await this.refreshTokenService.rotateRefreshToken(
        storedToken.id,
        user.id
      );
    const accessToken = generateAccessToken({
      userId: user.id,
      userName: user.firstName,
      roleId: user.roleId,
      role: user.role.name,
      roleDescription: user.role.description || "",
      phone: user.phone,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
      refreshTokenExp: expiresAt,
    };
  }

  async logout(token: string) {
    if (!token) throw new UnauthorizedError();
    await this.refreshTokenService.revokeRefreshToken(token);
  }

  async logoutAll(userId: number) {
    await this.refreshTokenRepository.revokeAllUserToken(userId);
  }

  async me(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError(`کاربر با شناسه ${userId} یافت نشد`);
    return user;
  }
}
