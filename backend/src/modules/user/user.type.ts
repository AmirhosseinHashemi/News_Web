import z from "zod";
import { createUserSchema } from "./users.schema.js";

export type FindAllSeriviceParams = {
  page: number;
  limit: number;
};

export type FindAllRepositoryParams = {
  skip: number;
  take: number;
};

export type CreateUserPayload = z.infer<typeof createUserSchema>;
