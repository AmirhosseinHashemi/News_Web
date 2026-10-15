import z from "zod";

export const loginSchema = z.object({
  phone: z.string().min(11),
  password: z.string().min(1),
});

export const refreshSchema = z.object({
  refreshToken: z.string("توکن اجباریست"),
});

export const logoutSchema = z.object({
  refreshToken: z.string("توکن اجباریست"),
});
