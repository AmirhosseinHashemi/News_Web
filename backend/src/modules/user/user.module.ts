import { prisma } from "../../lib/prisma.js";
import UserController from "./user.controller.js";
import UserRepository from "./user.repository.js";
import UserService from "./user.service.js";

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export { userController, userRepository, userService };
