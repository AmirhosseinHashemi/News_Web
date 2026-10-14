import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .min(11, "شماره همرا باید 11 رقم باشد.")
    .trim()
    .regex(/^09\d{9}$/, "شماره همراه معتبر نیست."),

  password: z.string().min(4, "رمز عبور باید حداقل 4 کاراکتر باشد."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
