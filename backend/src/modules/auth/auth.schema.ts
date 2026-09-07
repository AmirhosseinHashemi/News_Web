import z from "zod";

export const loginSchema = z.object({
  phone: z.string().min(11),
  password: z.string().min(1),
});
