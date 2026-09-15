import z from "zod";
import { paginationQuerySchema } from "../../common/schema.js";

export const getUsersQuerySchema = paginationQuerySchema;

export const getUserByIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
