import "dotenv/config";
import { SignOptions } from "jsonwebtoken";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(3000),

  DATABASE_URL: z.string().min(1),

  ADMIN_NAME: z.string(),
  ADMIN_EMAIL: z.string(),
  ADMIN_PHONE: z.string(),
  ADMIN_PASSWORD: z.string(),

  JWT_ACCESS_SECRET: z.string(),
  JWT_ACCESS_EXPIRES_IN: z
    .string()
    .transform((value) => value as SignOptions["expiresIn"]),

  REFRESH_TOKEN_EXPIRES_IN_DAYS: z.coerce.number().default(7),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsedEnv.error.flatten().fieldErrors);

  process.exit(1);
}

export const env = parsedEnv.data;
