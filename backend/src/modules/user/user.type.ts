import z from "zod";
import {
  createUserSchema,
  updateUserBodySchema,
  updateUserStatusBodySchema
} from "./users.schema.js";

export type FindAllSeriviceParams = {
  page: number;
  limit: number;
};

export type FindAllRepositoryParams = {
  skip: number;
  take: number;
};

export type CreateUserPayload = z.infer<typeof createUserSchema>;

export type UpdateUserPayload = z.infer<typeof updateUserBodySchema>;

export type UpdateUserRepositoryParams = Omit<UpdateUserPayload, "password"> & {
  passwordHash?: string;
};

export type UpdateUserStatusPayload = z.infer<
  typeof updateUserStatusBodySchema
>;
