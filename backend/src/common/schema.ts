import z from "zod";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
  MIN_LIMIT,
  MIN_PAGE,
} from "../config/constants.js";

export const paginationQuerySchema = z.object({
  page: z.coerce.number().min(MIN_PAGE).default(DEFAULT_PAGE),
  limit: z.coerce
    .number()
    .int()
    .min(MIN_LIMIT)
    .max(MAX_LIMIT)
    .default(DEFAULT_LIMIT),
});
