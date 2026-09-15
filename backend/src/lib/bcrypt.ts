import bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "../config/constants.js";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
