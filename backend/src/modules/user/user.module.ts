import { prisma } from "../../lib/prisma.js";
import UserRepository from "./user.repository.js";

const userRepository = new UserRepository(prisma);

export { userRepository };
