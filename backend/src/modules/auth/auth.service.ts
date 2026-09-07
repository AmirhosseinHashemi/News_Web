import bcrypt from "bcrypt";
import { AppError } from "../../errors/AppError.js";
import InvalidCredentialError from "../../errors/InvalidCredentialError.js";
import UserRepository from "../user/user.repository.js";
import { loginPayload } from "./auth.types.js";

export default class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login({ password, phone }: loginPayload) {
    const user = await this.userRepository.findByEmail(phone);

    if (!user) throw new InvalidCredentialError();

    if (!user.isActive)
      throw new AppError({ message: "User is not active", statusCode: 403 });

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) throw new InvalidCredentialError();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };
  }
}
