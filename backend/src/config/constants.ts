import { env } from "./env.js";

export const BCRYPT_SALT_ROUNDS = 12;

export const REFRESH_TOKEN_EXPIRES_IN =
  env.REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 100;
