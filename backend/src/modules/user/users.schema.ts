import z from "zod";
import { paginationQuerySchema } from "../../common/schema.js";
import {
  MIN_LENGTH_NAME,
  MIN_LENGTH_PASSWORD,
  MIN_LENGTH_PHONE,
} from "../../config/constants.js";

export const getUsersQuerySchema = paginationQuerySchema;

export const getUserByIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createUserSchema = z.object({
  name: z.string().trim().min(MIN_LENGTH_NAME),
  email: z.email(),
  phone: z.string().trim().min(MIN_LENGTH_PHONE),
  password: z.string().min(MIN_LENGTH_PASSWORD),
  roleId: z.coerce.number().int().positive(),
  isActive: z.boolean().default(true),
});
