import type { LoginFormValues } from "@/features/auth/auth.schema";
import type { LoginResponse } from "@/features/auth/auth.type";
import { http } from "@/lib/http";

export function postLoginReq(values: LoginFormValues) {
  return http<LoginResponse>("/auth/login", {
    method: "POST",
    body: values,
  });
}
