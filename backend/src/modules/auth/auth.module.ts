import {
  refreshTokenRepository,
  refreshTokenService,
} from "../refresh-token/refresh-token.module.js";
import { userRepository } from "../user/user.module.js";
import AuthController from "./auth.controller.js";
import AuthService from "./auth.service.js";

const authService = new AuthService(
  userRepository,
  refreshTokenService,
  refreshTokenRepository
);
const authController = new AuthController(authService);

export { authController };

