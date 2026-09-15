import { env } from "./env.js";

export const BCRYPT_SALT_ROUNDS = 12;

export const REFRESH_TOKEN_EXPIRES_IN =
  env.REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000;

// Pagination defaults
export const DEFAULT_PAGE = 1;
export const MIN_PAGE = 1;

export const DEFAULT_LIMIT = 10;
export const MIN_LIMIT = 5;
export const MAX_LIMIT = 100;

export const MIN_LENGTH_PHONE = 11;
export const MIN_LENGTH_NAME = 2;
export const MIN_LENGTH_PASSWORD = 4;
