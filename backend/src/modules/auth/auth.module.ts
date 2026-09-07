import { prisma } from "../../lib/prisma.js";
import UserRepository from "../user/user.repository.js";
import AuthController from "./auth.controller.js";
import AuthService from "./auth.service.js";

const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export { authController };
