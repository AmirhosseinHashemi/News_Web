import z from "zod";
import { loginSchema } from "./auth.schema.js";

export type loginPayload = z.infer<typeof loginSchema>;
