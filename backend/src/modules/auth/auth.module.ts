import { prisma } from "../../lib/prisma.js";
import RefreshTokenRepository from "../refresh-token/refresh-token.repository.js";
import RefreshTokenService from "../refresh-token/refresh-token.service.js";
import UserRepository from "../user/user.repository.js";
import AuthController from "./auth.controller.js";
import AuthService from "./auth.service.js";

const userRepository = new UserRepository(prisma);

const refreshTokenRepository = new RefreshTokenRepository(prisma);
const refreshTokenService = new RefreshTokenService(refreshTokenRepository);

const authService = new AuthService(
  userRepository,
  refreshTokenService,
  refreshTokenRepository
);
const authController = new AuthController(authService);

export { authController };
